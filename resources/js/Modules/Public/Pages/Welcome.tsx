import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontLayout from '@/Layouts/FrontLayout';

const features = [
    {
        name: 'Multitenancy Real',
        desc: 'Gestiona múltiples agencias con total aislamiento de datos y control granular de permisos.',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
        name: 'IA Integrada',
        desc: 'Calificación automática de prospectos con modelos de lenguaje avanzados. Cierra más rápido.',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
        name: 'Pipeline Premium',
        desc: 'Gestión visual de deals con métricas en tiempo real. 500+ Premium Assets bajo control.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
];

const stats = [
    { value: '500+', label: 'Premium Assets' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '3x', label: 'Sales Velocity' },
];

export default function Welcome() {
    return (
        <FrontLayout>
            <Head title="Elevate Your Real Estate Performance — EstateManager" />

            <div className="relative isolate overflow-hidden bg-[#121212]">

                {/* Background glow effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#FACC15]/5 blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#FACC15]/3 blur-3xl" />
                </div>

                {/* ── Hero ── */}
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-40 lg:flex lg:px-8 lg:pt-40 relative">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        {/* Badge */}
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <a href="#" className="inline-flex items-center gap-3">
                                <span className="rounded-full bg-[#FACC15]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FACC15] ring-1 ring-inset ring-[#FACC15]/20">
                                    Novedad v2.0
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A0A0A0] transition-colors hover:text-[#FACC15]">
                                    <span>Discover the new features</span>
                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </a>
                        </div>

                        {/* Headline */}
                        <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
                            Elevate Your Real Estate Performance with{' '}
                            <span className="text-[#FACC15]">AI-Powered Precision</span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-[#A0A0A0]">
                            The bespoke platform for high-net-worth agencies. Automate your sales pipeline, qualify leads with AI, and manage your curated property portfolio — all in one exclusive workspace.
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                href="/register"
                                className="rounded-full bg-[#FACC15] px-8 py-4 text-sm font-bold text-[#121212] shadow-2xl shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:scale-[1.02] hover:shadow-[#FACC15]/30 active:scale-[0.98]"
                            >
                                Boost Your Sales Velocity
                            </Link>
                            <Link
                                href="/precios"
                                className="text-sm font-bold leading-6 text-[#A0A0A0] hover:text-[#FACC15] transition-colors"
                            >
                                Ver planes <span aria-hidden="true">→</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-14 flex items-center gap-10 border-t border-[#333333] pt-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl font-extrabold text-[#FACC15]">{stat.value}</p>
                                    <p className="text-xs text-[#A0A0A0] mt-0.5 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <div className="rounded-2xl bg-[#1a1a1a] p-3 ring-1 ring-inset ring-[#333333] lg:-m-4 lg:rounded-3xl lg:p-4 shadow-2xl shadow-black/60 overflow-hidden">
                                {/* Mock dashboard UI */}
                                <div className="h-[400px] w-[580px] bg-[#121212] rounded-xl p-5 flex flex-col gap-4 overflow-hidden">
                                    {/* Top bar */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="h-3 w-3 rounded-full bg-[#333333]" />
                                            <div className="h-3 w-3 rounded-full bg-[#333333]" />
                                            <div className="h-3 w-3 rounded-full bg-[#333333]" />
                                        </div>
                                        <div className="h-4 w-32 rounded-full bg-[#242424]" />
                                        <div className="h-6 w-6 rounded-full bg-[#FACC15]/20" />
                                    </div>
                                    {/* Stat cards row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'Pipeline', value: '$2.4M', up: true },
                                            { label: 'Leads', value: '147', up: true },
                                            { label: 'Cierre', value: '34%', up: false },
                                        ].map((card) => (
                                            <div key={card.label} className="rounded-xl bg-[#242424] border border-[#333333] p-3">
                                                <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest">{card.label}</p>
                                                <p className="text-lg font-extrabold text-white mt-1">{card.value}</p>
                                                <p className={`text-[10px] mt-0.5 font-semibold ${card.up ? 'text-[#10B981]' : 'text-[#FACC15]'}`}>
                                                    {card.up ? '↑ +12%' : '→ stable'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Chart area */}
                                    <div className="flex-1 rounded-xl bg-[#242424] border border-[#333333] p-4 flex flex-col justify-between">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">Sales Velocity</p>
                                            <span className="rounded-full bg-[#FACC15]/10 px-2 py-0.5 text-[10px] font-bold text-[#FACC15]">Live</span>
                                        </div>
                                        {/* Fake bars */}
                                        <div className="flex items-end justify-between gap-2 h-24">
                                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-sm transition-all"
                                                    style={{
                                                        height: `${h}%`,
                                                        backgroundColor: i === 11 ? '#FACC15' : '#333333',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Table rows */}
                                    <div className="space-y-2">
                                        {['Penthouse 12A — Lima Centro', 'Villa Premium — La Molina'].map((item) => (
                                            <div key={item} className="flex items-center justify-between rounded-lg bg-[#1a1a1a] border border-[#333333] px-3 py-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-5 w-5 rounded bg-[#FACC15]/10 flex items-center justify-center">
                                                        <div className="h-2 w-2 rounded-sm bg-[#FACC15]" />
                                                    </div>
                                                    <p className="text-[11px] text-[#A0A0A0]">{item}</p>
                                                </div>
                                                <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                                                    Activo
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Features ── */}
                <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8 pb-32 relative">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#FACC15]">
                            Performance Suite
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Everything a high-net-worth agency needs
                        </h2>
                        <p className="mt-4 text-base text-[#A0A0A0]">
                            A curated selection of tools designed for excellence and precision in real estate management.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mx-auto">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="flex flex-col rounded-2xl border border-[#333333] bg-[#242424] p-8 transition-all duration-300 hover:border-[#FACC15]/30 hover:shadow-lg hover:shadow-[#FACC15]/5 group"
                                >
                                    <dt className="flex items-center gap-x-3 text-lg font-bold text-white">
                                        <div className="h-9 w-9 rounded-xl bg-[#FACC15]/10 flex items-center justify-center group-hover:bg-[#FACC15]/20 transition-colors">
                                            <svg className="h-5 w-5 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                                            </svg>
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-[#A0A0A0]">
                                        <p className="flex-auto">{feature.desc}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-24 text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-10 py-4 text-sm font-bold text-[#121212] shadow-2xl shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Discover Our Story
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <p className="mt-4 text-sm text-[#A0A0A0]">Sin tarjeta de crédito requerida. Setup en 60 segundos.</p>
                    </div>
                </div>

            </div>
        </FrontLayout>
    );
}
