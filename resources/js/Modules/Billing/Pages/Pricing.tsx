import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
}

interface Props {
    plans: { data: Plan[] };
}

export default function Pricing({ plans }: Props) {
    // El plan Premium se pre-selecciona por defecto si existe
    const defaultSelected = plans.data.find(p => p.name.toLowerCase().includes('premium'))?.id
        ?? plans.data[0]?.id
        ?? null;
    const [selectedId, setSelectedId] = useState<string | null>(defaultSelected);

    return (
        <AdminLayout>
            <Head title="Planes Premium — EstateManager" />

            <div className="mx-auto max-w-5xl py-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FACC15] mb-3">Billing</p>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Scale Your Real Estate Performance
                    </h1>
                    <p className="mt-4 text-base text-[#A0A0A0] max-w-xl mx-auto">
                        Bespoke plans designed for agencies seeking excellence and high-net-worth performance.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                    {plans.data.map((plan) => {
                        const isSelected = selectedId === plan.id;
                        const isPremium = plan.name.toLowerCase().includes('premium');

                        return (
                            <button
                                key={plan.id}
                                type="button"
                                onClick={() => setSelectedId(plan.id)}
                                className={`relative flex flex-col rounded-2xl border p-8 text-left transition-all duration-200 hover:scale-[1.01] focus:outline-none ${isSelected
                                        ? 'border-[#FACC15]/60 bg-[#FACC15]/5 shadow-xl shadow-[#FACC15]/10 ring-1 ring-[#FACC15]/30'
                                        : 'border-[#333333] bg-[#242424] hover:border-[#FACC15]/20'
                                    }`}
                            >
                                {/* Selected indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#FACC15]">
                                        <svg className="h-3.5 w-3.5 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}

                                {/* Recommended badge */}
                                {isPremium && (
                                    <div className={`absolute -top-4 right-8 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest shadow-lg ${isSelected
                                            ? 'bg-[#FACC15] text-[#121212] shadow-[#FACC15]/30'
                                            : 'bg-[#333333] text-[#A0A0A0]'
                                        }`}>
                                        RECOMENDADO
                                    </div>
                                )}

                                {/* Plan icon */}
                                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isSelected ? 'bg-[#FACC15]/20' : 'bg-[#1a1a1a]'
                                    }`}>
                                    <svg
                                        className={`h-5 w-5 transition-colors ${isSelected ? 'text-[#FACC15]' : 'text-[#A0A0A0]'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>

                                {/* Plan name & description */}
                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold transition-colors ${isSelected ? 'text-white' : 'text-[#A0A0A0]'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-[#A0A0A0]">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className={`text-5xl font-extrabold transition-colors ${isSelected ? 'text-[#FACC15]' : 'text-white'}`}>
                                        ${plan.price}
                                    </span>
                                    <span className="text-sm font-bold text-[#A0A0A0]">/ mes</span>
                                </div>

                                {/* Features */}
                                <ul className="mb-10 flex-1 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm">
                                            {/* Check icon */}
                                            <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors ${isSelected ? 'bg-[#FACC15]/15' : 'bg-[#333333]'
                                                }`}>
                                                <svg
                                                    className={`h-3 w-3 transition-colors ${isSelected ? 'text-[#FACC15]' : 'text-white'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`transition-colors ${isSelected ? 'text-[#A0A0A0]' : 'text-[#555555]'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className={`w-full rounded-full py-4 text-center text-sm font-bold transition-all ${isSelected
                                        ? 'bg-[#FACC15] text-[#121212] shadow-xl shadow-[#FACC15]/20'
                                        : 'bg-[#1a1a1a] text-[#555555] border border-[#333333]'
                                    }`}>
                                    {isSelected
                                        ? (isPremium ? 'Boost Your Sales Velocity' : 'Get Started')
                                        : 'Seleccionar Plan'
                                    }
                                </div>
                            </button>
                        );
                    })}
                </div>

                <p className="mt-10 text-center text-sm text-[#A0A0A0]">
                    Sin tarjeta de crédito requerida · Cancela cuando quieras · Soporte Premium incluido
                </p>
            </div>
        </AdminLayout>
    );
}
