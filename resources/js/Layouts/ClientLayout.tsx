import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    Search,
    GitBranch,
    Bell,
    User,
    LogOut,
    Menu,
    X,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useEffect } from 'react';
import admin from '@/routes/admin';
import * as baseRoutes from '@/routes/index';

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    active?: boolean;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        const saved = localStorage.getItem('client_sidebar_collapsed');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('client_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    }, [isSidebarCollapsed]);

    const navItems: NavItem[] = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
            active: url.startsWith('/dashboard')
        },
        {
            name: 'Propiedades',
            href: '/propiedades',
            icon: <Building2 className="h-5 w-5" />,
            active: url.startsWith('/propiedades') && !url.includes('gestion')
        },
        {
            name: 'Proyectos',
            href: '/proyectos',
            icon: <Briefcase className="h-5 w-5" />,
            active: url.startsWith('/proyectos')
        },
        {
            name: 'Leads',
            href: '/leads',
            icon: <Users className="h-5 w-5" />,
            active: url.startsWith('/leads')
        },
        {
            name: 'Listing',
            href: '/listing',
            icon: <Search className="h-5 w-5" />,
            active: url.startsWith('/listing')
        },
        {
            name: 'Pipeline',
            href: '/crm/pipeline',
            icon: <GitBranch className="h-5 w-5" />,
            active: url.startsWith('/crm/pipeline')
        },
    ];

    return (
        <div className="min-h-screen bg-[#121212] text-white selection:bg-[#FACC15]/30">
            {/* Sidebar Desktop */}
            <aside 
                className={`fixed inset-y-0 left-0 hidden flex-col border-r border-[#242424] bg-[#1a1a1a] transition-all duration-300 ease-in-out lg:flex z-50 ${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                <div className="flex h-20 items-center px-6 overflow-hidden">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FACC15] to-[#EAB308] shadow-lg shadow-[#FACC15]/20">
                            <Building2 className="h-6 w-6 text-black" />
                        </div>
                        {!isSidebarCollapsed && (
                            <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap animate-in fade-in duration-500">
                                Crm<span className="text-[#FACC15]">Saas</span>
                            </span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={isSidebarCollapsed ? item.name : ''}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all group ${
                                item.active
                                    ? 'bg-[#FACC15] text-black shadow-lg shadow-[#FACC15]/10'
                                    : 'text-[#A0A0A0] hover:bg-[#242424] hover:text-white'
                            }`}
                        >
                            <div className={`flex-shrink-0 transition-colors ${item.active ? 'text-black' : 'group-hover:text-[#FACC15]'}`}>
                                {item.icon}
                            </div>
                            {!isSidebarCollapsed && (
                                <span className="truncate animate-in fade-in duration-500">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

            </aside>

            {/* Header Mobile */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#242424] bg-[#1a1a1a]/80 px-4 backdrop-blur-md lg:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FACC15]">
                        <Building2 className="h-5 w-5 text-black" />
                    </div>
                    <span className="font-bold">Crm<span className="text-[#FACC15]">Saas</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6 text-white" />
                </button>
            </header>

            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                    isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
                }`}
            >
                {/* Desktop Header */}
                <header className="sticky top-0 z-40 hidden h-20 border-b border-[#242424] bg-[#1a1a1a]/80 backdrop-blur-md lg:flex items-center justify-between px-8">
                    {/* Toggle Left */}
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#242424] border border-[#333333] text-[#A0A0A0] hover:text-[#FACC15] transition-all"
                    >
                        {isSidebarCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </button>

                    {/* Profile Right */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center gap-3 p-1 rounded-2xl hover:bg-white/5 transition-all outline-none"
                        >
                            <div className="h-10 w-10 rounded-xl overflow-hidden ring-2 ring-[#FACC15]/20 bg-[#242424] flex items-center justify-center border border-[#333333]">
                                <span className="text-sm font-bold text-[#FACC15]">{auth.user.name.charAt(0)}</span>
                            </div>
                            <div className="hidden lg:block text-left pr-2">
                                <p className="text-xs font-black text-white truncate max-w-[120px]">{auth.user.name}</p>
                                <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-tighter">
                                    Agente
                                </p>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-[#A0A0A0] transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-[#333333] bg-[#1a1a1a] p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-4 border-b border-[#333333] mb-1">
                                    <p className="text-sm font-bold text-white truncate">{auth.user.name}</p>
                                    <p className="text-xs text-[#A0A0A0] truncate mt-0.5">{auth.user.email}</p>
                                </div>
                                <div className="py-1">
                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#A0A0A0] hover:bg-white/5 hover:text-white rounded-xl transition-all">
                                        <User className="h-4 w-4" /> Ver Perfil
                                    </Link>
                                </div>
                                <div className="pt-1 mt-1 border-t border-[#333333]">
                                    <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left">
                                        <LogOut className="h-4 w-4" /> Cerrar Sesión
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main className="min-h-screen pt-4">
                    <div className="mx-auto max-w-7xl p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Content */}
            <div className={`fixed inset-y-0 right-0 z-50 w-72 transform bg-[#1a1a1a] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-[#242424]">
                    <span className="font-bold uppercase tracking-widest text-[#A0A0A0]">Navegación</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-4 text-sm font-medium transition-all ${item.active ? 'bg-[#FACC15] text-black shadow-lg shadow-[#FACC15]/10' : 'text-[#A0A0A0] hover:bg-[#242424] hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-[#242424] p-6 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#333333] text-lg font-bold text-[#FACC15]">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-base font-bold text-white">{auth.user.name}</p>
                            <p className="truncate text-sm text-[#A0A0A0]">{auth.user.email}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Link 
                            href="/profile" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl bg-[#242424] px-4 py-4 text-sm font-medium text-white"
                        >
                            <User className="h-5 w-5 text-[#A0A0A0]" /> Gestión de Perfil
                        </Link>
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-4 text-sm font-medium text-red-400"
                        >
                            <LogOut className="h-5 w-5" /> Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
