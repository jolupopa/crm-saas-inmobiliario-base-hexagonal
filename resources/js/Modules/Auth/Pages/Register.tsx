import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FrontLayout from '../../../Layouts/FrontLayout';
import register from '@/routes/register';
import { login } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_name: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(register.store.url());
    };

    return (
        <FrontLayout>
            <Head title="Launch Your Agency — EstateManager" />

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 py-12 bg-[#121212]">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FACC15]/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-lg space-y-8 rounded-2xl border border-[#333333] bg-[#242424] p-10 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-[#FACC15]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Launch Your Agency
                        </h1>
                        <p className="mt-2 text-sm text-[#A0A0A0]">
                            Strategic advice for high-net-worth investments awaits
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Company */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                Nombre Comercial de la Empresa
                            </label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={e => setData('company_name', e.target.value)}
                                className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                placeholder="Inmobiliaria Premium SAC"
                                required
                            />
                            {errors.company_name && (
                                <p className="mt-1 text-xs text-red-400">{errors.company_name}</p>
                            )}
                            <p className="mt-1 text-[10px] text-[#555555] ml-1">Este será tu tenant principal.</p>
                        </div>

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Tu Nombre
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="Juan Pérez"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="juan@empresa.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Password + Confirm */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Confirmar
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 rounded border-[#333333] bg-[#1a1a1a] text-[#FACC15] focus:ring-[#FACC15]/30"
                                />
                                <span className="text-xs text-[#A0A0A0]">
                                    Acepto los{' '}
                                    <a href="#" className="text-[#FACC15] underline hover:brightness-110">
                                        términos y condiciones
                                    </a>{' '}
                                    de uso del SaaS.
                                </span>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#FACC15] py-4 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:shadow-[#FACC15]/30 active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Configurando tu agencia...' : 'Registrar Empresa y Usuario'}
                        </button>

                        <p className="text-center text-sm text-[#A0A0A0]">
                            ¿Ya tienes una empresa?{' '}
                            <Link href={login.url()} className="font-bold text-[#FACC15] hover:brightness-110 transition-all">
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
