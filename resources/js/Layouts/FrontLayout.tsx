import React, { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { home, register, dashboard, login, logout } from '@/routes';

export default function FrontLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-[#121212] font-sans text-white">
            {/* Header / Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-[#333333] bg-[#121212]/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href={home.url()} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-[#FACC15] shadow-lg shadow-[#FACC15]/20 flex items-center justify-center">
                            <svg className="h-5 w-5 text-[#121212]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Estate<span className="text-[#FACC15]">Manager</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href={home.url()} className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-[#FACC15]">
                            Inicio
                        </Link>
                        <Link href="/propiedades" className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-[#FACC15]">
                            Propiedades
                        </Link>
                        <Link href="/precios" className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-[#FACC15]">
                            Precios
                        </Link>
                    </div>

                    {/* CTA Actions — condicional según auth */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            // ── Usuario AUTENTICADO ──────────────────────────
                            <>
                                <Link
                                    href={dashboard.url()}
                                    className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-white"
                                >
                                    Dashboard
                                </Link>
                                {/* Avatar + nombre */}
                                <div className="flex items-center gap-2 rounded-full border border-[#333333] bg-[#1a1a1a] px-3 py-1.5">
                                    <div className="h-6 w-6 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/30 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-[#FACC15]">
                                            {user.name?.charAt(0)?.toUpperCase() ?? 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-white hidden sm:block">
                                        {user.name?.split(' ')[0]}
                                    </span>
                                </div>
                                {/* Logout */}
                                <Link
                                    href={logout.url()}
                                    method="post"
                                    as="button"
                                    className="rounded-full border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10 hover:border-red-400/50 active:scale-95"
                                >
                                    Cerrar Sesión
                                </Link>
                            </>
                        ) : (
                            // ── Usuario INVITADO ─────────────────────────────
                            <>
                                <Link
                                    href={login.url()}
                                    className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-white"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={register.url()}
                                    className="rounded-full bg-[#FACC15] px-5 py-2 text-sm font-bold text-[#121212] transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[#FACC15]/20 active:scale-95"
                                >
                                    Comenzar Gratis
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#333333] bg-[#121212] py-12 mt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <Link href={home.url()} className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-[#FACC15] flex items-center justify-center">
                                <svg className="h-4 w-4 text-[#121212]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">
                                Estate<span className="text-[#FACC15]">Manager</span>
                            </span>
                        </Link>
                        <p className="text-sm text-[#A0A0A0]">
                            © 2026 EstateManager. Premium Real Estate CRM Platform.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[#A0A0A0] transition-colors hover:text-[#FACC15]">Twitter</a>
                            <a href="#" className="text-[#A0A0A0] transition-colors hover:text-[#FACC15]">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
