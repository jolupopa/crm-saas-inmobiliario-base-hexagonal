import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FrontLayout from '../../../Layouts/FrontLayout';
import password from '@/routes/password';
import { login } from '@/routes';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(password.email.url());
    };

    return (
        <FrontLayout>
            <Head title="Reset Your Access — EstateManager" />

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-[#121212]">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FACC15]/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-md space-y-8 rounded-2xl border border-[#333333] bg-[#242424] p-10 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Reset Your Access
                        </h1>
                        <p className="mt-2 text-sm text-[#A0A0A0]">
                            Enter your email and we'll send you a secure reset link
                        </p>
                    </div>

                    {/* Success message */}
                    {status && (
                        <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-3">
                            <p className="text-sm text-[#10B981] font-medium">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-5">
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
                                autoFocus
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#FACC15] py-3.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:shadow-[#FACC15]/30 active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Enviando enlace...' : 'Send Reset Link'}
                        </button>

                        <p className="text-center text-sm text-[#A0A0A0]">
                            ¿Recordaste tu contraseña?{' '}
                            <Link href={login.url()} className="font-bold text-[#FACC15] hover:brightness-110 transition-all">
                                Volver al login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
