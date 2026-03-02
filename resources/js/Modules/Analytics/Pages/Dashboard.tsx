import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Stats {
    total_properties: number;
    total_leads: number;
    avg_lead_score: number;
    recent_properties: any[];
}

interface Props {
    stats: Stats;
}

export default function Dashboard({ stats }: Props) {
    return (
        <AdminLayout>
            <Head title="Panel de Control — EstateManager" />

            <div className="space-y-8">
                {/* Page Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Welcome Back 👋
                    </h1>
                    <p className="text-[#A0A0A0]">
                        Here's your portfolio performance overview.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Propiedades */}
                    <div className="group rounded-2xl border border-[#333333] bg-[#242424] p-7 transition-all hover:border-[#FACC15]/30 hover:shadow-lg hover:shadow-[#FACC15]/5 hover:-translate-y-0.5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FACC15]/10 text-[#FACC15] transition-colors group-hover:bg-[#FACC15]/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Propiedades</p>
                                <h3 className="text-3xl font-extrabold text-white">{stats.total_properties}</h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-[#10B981] font-semibold">↑ +12% este mes</p>
                    </div>

                    {/* Leads */}
                    <div className="group rounded-2xl border border-[#333333] bg-[#242424] p-7 transition-all hover:border-[#FACC15]/30 hover:shadow-lg hover:shadow-[#FACC15]/5 hover:-translate-y-0.5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FACC15]/10 text-[#FACC15] transition-colors group-hover:bg-[#FACC15]/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Leads Activos</p>
                                <h3 className="text-3xl font-extrabold text-white">{stats.total_leads}</h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-[#10B981] font-semibold">↑ +8% este mes</p>
                    </div>

                    {/* Score */}
                    <div className="group rounded-2xl border border-[#333333] bg-[#242424] p-7 transition-all hover:border-[#FACC15]/30 hover:shadow-lg hover:shadow-[#FACC15]/5 hover:-translate-y-0.5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FACC15]/10 text-[#FACC15] transition-colors group-hover:bg-[#FACC15]/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Score Promedio</p>
                                <h3 className="text-3xl font-extrabold text-white">
                                    {stats.avg_lead_score}
                                    <span className="text-sm text-[#A0A0A0] ml-1">/ 100</span>
                                </h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-[#FACC15] font-semibold">→ Performance stable</p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Properties */}
                    <div className="rounded-2xl border border-[#333333] bg-[#242424] p-7">
                        <h3 className="text-base font-bold text-white uppercase tracking-widest mb-6">
                            Recent Properties
                        </h3>
                        <div className="space-y-3">
                            {stats.recent_properties.length > 0 ? (
                                stats.recent_properties.map(p => (
                                    <div key={p.id} className="flex items-center gap-4 rounded-xl p-2.5 hover:bg-white/5 transition-colors">
                                        <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-[#1a1a1a] border border-[#333333] flex items-center justify-center">
                                            <svg className="h-5 w-5 text-[#555555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{p.title}</p>
                                            <p className="text-xs text-[#A0A0A0] truncate">{p.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-extrabold text-[#FACC15]">${p.price}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-[#A0A0A0] text-center py-8">No hay propiedades aún.</p>
                            )}
                        </div>
                    </div>

                    {/* AI CTA Card */}
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FACC15]/30 bg-[#FACC15]/5 p-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15] mb-5">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Activate AI Scoring</h3>
                        <p className="mt-2 text-sm text-[#A0A0A0] max-w-xs mb-6">
                            Use Google Gemini to automatically qualify your leads with high-net-worth precision.
                        </p>
                        <button className="rounded-full bg-[#FACC15] px-7 py-3 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 active:scale-[0.98]">
                            Configure AI Engine
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
