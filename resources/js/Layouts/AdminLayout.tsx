import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { logout, dashboard } from '@/routes';
import admin from '@/routes/admin';
import profile from '@/routes/profile';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth, flash } = usePage().props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setNotification({ message: flash.success, type: 'success' });
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
        if (flash?.error) {
            setNotification({ message: flash.error, type: 'error' });
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const can = (permission?: string) => {
        if (!permission) return true;
        const user = auth.user;
        if (user?.email === 'superusuario@demo.com' || user?.roles?.includes('admin')) {
            return true;
        }
        return user?.permissions?.includes(permission);
    };

    const navItems = [
        {
            name: 'Dashboard',
            href: dashboard.url(),
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            permission: 'dashboard.view'
        },
        {
            name: 'Propiedades',
            href: '/propiedades',
            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            permission: 'properties.manage'
        },
        {
            name: 'Proyectos',
            href: '/proyectos',
            icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
            permission: 'properties.manage'
        },
        {
            name: 'Pipeline (CRM)',
            href: '/crm/pipeline',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
            permission: 'properties.manage'
        },
        {
            name: 'Usuarios',
            href: admin.users.index.url(),
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            permission: 'users.manage'
        },
        {
            name: 'Seguridad / ACL',
            href: admin.acl.index.url(),
            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
            permission: 'users.manage'
        },
        {
            name: 'Categorías',
            href: admin.categories.index.url(),
            icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
            permission: 'users.manage'
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#121212] font-sans text-white">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col h-screen sticky top-0 border-r border-[#333333] bg-[#1a1a1a] transition-all duration-300 ease-in-out`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center px-5 border-b border-[#333333]">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-[#FACC15] shadow-md shadow-[#FACC15]/20 flex items-center justify-center">
                            <svg className="h-5 w-5 text-[#121212]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                            </svg>
                        </div>
                        {isSidebarOpen && (
                            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                                Estate<span className="text-[#FACC15]">Manager</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation - Scrollable */}
                <nav className="mt-4 flex-1 space-y-1 px-3 overflow-y-auto custom-scrollbar">
                    {navItems.filter(item => can(item.permission)).map((item) => {
                        const isActive = usePage().url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${isActive
                                    ? 'bg-[#FACC15]/10 text-[#FACC15]'
                                    : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <svg
                                    className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#FACC15]' : 'text-[#A0A0A0] group-hover:text-white'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-[#333333] p-4 space-y-2">
                    <Link
                        href={profile.show.url()}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group ${usePage().url === '/profile'
                            ? 'bg-[#FACC15]/10 text-[#FACC15]'
                            : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {isSidebarOpen && <span>Mi Perfil</span>}
                    </Link>

                    <Link
                        href={logout.url()}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#A0A0A0] transition-all hover:bg-red-500/10 hover:text-red-400"
                    >
                        <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {isSidebarOpen && <span>Cerrar Sesión</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-[#333333] bg-[#1a1a1a] px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-[#A0A0A0] hover:text-white focus:outline-none transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-white">{auth?.user?.name}</p>
                            <p className="text-xs text-[#A0A0A0]">{auth?.user?.email}</p>
                        </div>

                        {/* User Menu Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="group relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-[#FACC15]/30 hover:ring-[#FACC15]/70 transition-all focus:outline-none"
                            >
                                {auth?.user?.avatar_url ? (
                                    <img
                                        src={auth.user.avatar_url}
                                        alt={auth.user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="h-full w-full flex items-center justify-center text-sm font-bold text-white"
                                        style={{
                                            backgroundColor: ['#FACC15', '#EAB308', '#CA8A04', '#A16207', '#333333', '#242424'][
                                                (auth?.user?.initials?.charCodeAt(0) ?? 0) % 6
                                            ],
                                            color: (auth?.user?.initials?.charCodeAt(0) ?? 0) % 6 < 2 ? '#121212' : '#FFFFFF'
                                        }}
                                    >
                                        {auth?.user?.initials ?? 'U'}
                                    </div>
                                )}
                            </button>

                            {isProfileMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#333333] bg-[#1a1a1a] p-2 shadow-2xl z-20">
                                        <Link
                                            href={profile.show.url()}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#A0A0A0] hover:bg-white/5 hover:text-white transition-all"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mi Perfil
                                        </Link>
                                        <hr className="my-1 border-[#333333]" />
                                        <Link
                                            href={logout.url()}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>


                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#121212] relative">
                    {/* Notification Toast */}
                    {notification && (
                        <div className="fixed top-20 right-8 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className={`flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 shadow-2xl backdrop-blur-md ${notification.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={notification.type === 'success' ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                                </svg>
                                <span className="text-sm font-medium">{notification.message}</span>
                                <button onClick={() => setNotification(null)} className="ml-2 hover:text-white transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
