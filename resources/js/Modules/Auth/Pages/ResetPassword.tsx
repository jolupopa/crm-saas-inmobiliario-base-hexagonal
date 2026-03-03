import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import FrontLayout from '@/Layouts/FrontLayout';
import password from '@/routes/password';

interface Props {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(password.update.url());
    };

    return (
        <FrontLayout>
            <Head title="Restablecer Contraseña — EstateManager" />

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-[#121212]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FACC15]/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-md space-y-8 rounded-2xl border border-[#333333] bg-[#242424] p-10 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Nueva Contraseña
                        </h1>
                        <p className="mt-2 text-sm text-[#A0A0A0]">
                            Crea una contraseña segura para tu cuenta
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Email (readonly) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        {/* New password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                placeholder="Mínimo 8 caracteres"
                                autoComplete="new-password"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                placeholder="Repite la contraseña"
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#FACC15] py-3.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:shadow-[#FACC15]/30 active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Restableciendo...' : 'Restablecer Contraseña'}
                        </button>
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
