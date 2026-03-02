import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Stage {
    id: string;
    name: string;
    order: number;
}

interface Lead {
    id: string;
    client_name: string;
    score: number;
    stage_id: string;
}

interface Props {
    stages: Stage[];
    leads: { data: Lead[] };
}

const stageColors: Record<number, string> = {
    0: 'border-[#333333]',
    1: 'border-[#FACC15]/30',
    2: 'border-[#10B981]/30',
    3: 'border-blue-500/30',
};

export default function Pipeline({ stages, leads }: Props) {
    return (
        <AdminLayout>
            <Head title="Sales Pipeline — EstateManager" />

            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Sales Pipeline</h1>
                        <p className="mt-1 text-sm text-[#A0A0A0]">Manage your prospects and qualify them with AI precision.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="rounded-full border border-[#333333] bg-[#1a1a1a] px-4 py-2 text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">
                            {leads.data.length} Leads
                        </span>
                        <button className="rounded-full bg-[#FACC15] px-5 py-2 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 active:scale-[0.98]">
                            + Nuevo Lead
                        </button>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex gap-5 overflow-x-auto pb-6">
                    {stages.map((stage, idx) => {
                        const stageLeads = leads.data.filter(l => l.stage_id === stage.id);
                        return (
                            <div key={stage.id} className="w-72 flex-shrink-0">
                                {/* Column Header */}
                                <div className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-3 bg-[#1a1a1a] ${stageColors[idx] ?? 'border-[#333333]'}`}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">
                                        {stage.name}
                                    </h3>
                                    <span className="rounded-full bg-[#FACC15]/10 px-2 py-0.5 text-[10px] font-bold text-[#FACC15]">
                                        {stageLeads.length}
                                    </span>
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-3 rounded-2xl bg-[#1a1a1a] border border-[#333333] p-3 min-h-[500px]">
                                    {stageLeads.length === 0 ? (
                                        <div className="flex flex-1 items-center justify-center py-10">
                                            <p className="text-xs text-[#555555]">No leads in this stage</p>
                                        </div>
                                    ) : (
                                        stageLeads.map(lead => (
                                            <div
                                                key={lead.id}
                                                className="group relative rounded-xl border border-[#333333] bg-[#242424] p-4 transition-all hover:border-[#FACC15]/30 hover:shadow-lg hover:shadow-[#FACC15]/5 active:scale-[0.98] cursor-pointer"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-sm font-bold text-white">{lead.client_name}</h4>
                                                    {lead.score > 70 && (
                                                        <span className="flex items-center gap-1 rounded-full bg-[#FACC15]/10 px-2 py-0.5 text-[9px] font-bold text-[#FACC15] flex-shrink-0">
                                                            <span className="h-1 w-1 rounded-full bg-[#FACC15] animate-pulse" />
                                                            HOT
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Score bar */}
                                                <div className="mt-4 flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 rounded-full bg-[#333333]">
                                                        <div
                                                            className={`h-1.5 rounded-full transition-all ${lead.score > 70 ? 'bg-[#FACC15]' : lead.score > 40 ? 'bg-[#10B981]' : 'bg-[#555555]'}`}
                                                            style={{ width: `${lead.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[#A0A0A0] w-7 text-right">{lead.score}</span>
                                                </div>

                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-[10px] uppercase tracking-widest text-[#555555] font-bold">AI Score</span>
                                                    <div className="h-6 w-6 rounded-full bg-[#333333] border border-[#FACC15]/20 flex items-center justify-center">
                                                        <span className="text-[8px] font-bold text-[#FACC15]">
                                                            {lead.client_name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
