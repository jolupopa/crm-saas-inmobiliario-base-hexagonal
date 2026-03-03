import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import FrontLayout from '@/Layouts/FrontLayout';
import twoFactor from '@/routes/two-factor';

export default function TwoFactorChallenge() {
    const [usingRecovery, setUsingRecovery] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(twoFactor.login.url());
    };

    return (
        <FrontLayout>
            <Head title="Verificación en Dos Pasos — EstateManager" />

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-[#121212]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FACC15]/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-md space-y-8 rounded-2xl border border-[#333333] bg-[#242424] p-10 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Verificación 2FA
                        </h1>
                        <p className="mt-2 text-sm text-[#A0A0A0]">
                            {usingRecovery
                                ? 'Ingresa uno de tus códigos de recuperación'
                                : 'Ingresa el código de tu aplicación de autenticación'
                            }
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {!usingRecovery ? (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Código de Autenticación
                                </label>
                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-center text-xl font-mono tracking-widest text-white transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="000000"
                                    maxLength={6}
                                    autoFocus
                                    autoComplete="one-time-code"
                                />
                                {errors.code && <p className="mt-1 text-xs text-red-400">{errors.code}</p>}
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">
                                    Código de Recuperación
                                </label>
                                <input
                                    id="recovery_code"
                                    type="text"
                                    value={data.recovery_code}
                                    onChange={e => setData('recovery_code', e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm font-mono text-white transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    placeholder="xxxx-xxxx-xxxx"
                                    autoComplete="off"
                                />
                                {errors.recovery_code && <p className="mt-1 text-xs text-red-400">{errors.recovery_code}</p>}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#FACC15] py-3.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Verificando...' : 'Confirmar Acceso'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setUsingRecovery(!usingRecovery)}
                            className="w-full text-center text-sm text-[#A0A0A0] hover:text-[#FACC15] transition-colors"
                        >
                            {usingRecovery
                                ? '← Usar código de autenticación'
                                : 'Usar código de recuperación'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
