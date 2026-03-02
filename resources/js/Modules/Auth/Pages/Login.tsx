import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FrontLayout from '../../../Layouts/FrontLayout';
import login from '@/routes/login';
import password from '@/routes/password';
import { register } from '@/routes';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(login.store.url());
    };

    return (
        <FrontLayout>
            <Head title="Access Your Portfolio — EstateManager" />

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-[#121212]">
                {/* Subtle background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FACC15]/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-md space-y-8 rounded-2xl border border-[#333333] bg-[#242424] p-10 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-[#FACC15]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Access Your Portfolio
                        </h1>
                        <p className="mt-2 text-sm text-[#A0A0A0]">
                            Strategic access for high-performance professionals
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                placeholder="tu@empresa.com"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
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

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-[#333333] bg-[#1a1a1a] text-[#FACC15] focus:ring-[#FACC15]/30"
                                />
                                <span className="text-sm text-[#A0A0A0]">Recordarme</span>
                            </label>
                            <Link
                                href={password.email.url()}
                                className="text-sm font-medium text-[#FACC15] hover:brightness-110 transition-all"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#FACC15] py-3.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:shadow-[#FACC15]/30 active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Verificando acceso...' : 'Acceder al CRM'}
                        </button>

                        <p className="text-center text-sm text-[#A0A0A0]">
                            ¿Sin cuenta aún?{' '}
                            <Link href={register.url()} className="font-bold text-[#FACC15] hover:brightness-110 transition-all">
                                Registra tu agencia
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
