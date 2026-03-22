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

                <div className="border-t border-[#242424] p-4">
                    <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="group flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#242424] overflow-hidden"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#333333] text-sm font-bold text-white transition-colors group-hover:bg-[#444444]">
                            {auth.user.name.charAt(0)}
                        </div>
                        {!isSidebarCollapsed && (
                            <>
                                <div className="flex-1 text-left overflow-hidden animate-in fade-in duration-500">
                                    <p className="truncate text-sm font-bold text-white">{auth.user.name}</p>
                                    <p className="truncate text-xs text-[#A0A0A0]">{auth.user.email}</p>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-[#A0A0A0] transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </>
                        )}
                    </button>

                    {isProfileDropdownOpen && !isSidebarCollapsed && (
                        <div className="mt-2 space-y-1 animate-in fade-in slide-in-from-top-2">
                            <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#A0A0A0] hover:bg-[#242424] hover:text-white">
                                <User className="h-3 w-3" /> Ver Perfil
                            </Link>
                            <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-400/10">
                                <LogOut className="h-3 w-3" /> Cerrar Sesión
                            </Link>
                        </div>
                    )}
                </div>

                {/* Sidebar Toggle Button */}
                <div className="p-4 border-t border-[#242424]">
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-xl border border-[#242424] hover:border-[#FACC15] transition-all text-[#A0A0A0] hover:text-[#FACC15]"
                    >
                        {isSidebarCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </button>
                </div>
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

            <main 
                className={`min-h-screen pt-4 transition-all duration-300 ${
                    isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
                }`}
            >
                <div className="mx-auto max-w-7xl p-4 lg:p-8">
                    {children}
                </div>
            </main>

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
            </div>
        </div>
    );
}
