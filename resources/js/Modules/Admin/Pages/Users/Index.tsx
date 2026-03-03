import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import users from '@/routes/admin/users';

interface User {
    id: string;
    name: string;
    email: string;
    company_name?: string | null;
    avatar_url?: string | null;
    initials: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: any;
    };
}

export default function Index({ users: usersProp }: Props) {
    return (
        <AdminLayout>
            <Head title="Equipo" />

            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Mi Equipo</h1>
                        <p className="mt-1 text-[#A0A0A0]">Gestiona los miembros de tu organización y sus permisos.</p>
                    </div>
                    <Link
                        href={users.create.url()}
                        className="rounded-full bg-[#FACC15] px-6 py-3 text-sm font-bold text-[#121212] shadow-xl shadow-[#FACC15]/10 transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                        + Nuevo Miembro
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#333333] bg-[#1a1a1a]">
                    <table className="min-w-full divide-y divide-[#333333]">
                        <thead className="bg-[#242424]">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Miembro</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Empresa / Rol</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Email</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Fecha Alta</th>
                                <th scope="col" className="relative px-6 py-4">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333333]">
                            {usersProp.data.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full overflow-hidden border border-[#333333] bg-[#242424] flex items-center justify-center">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span
                                                        className="text-xs font-bold text-white w-full h-full flex items-center justify-center"
                                                        style={{
                                                            backgroundColor: ['#FACC15', '#EAB308', '#CA8A04', '#A16207', '#333333', '#242424'][
                                                                (user.initials?.charCodeAt(0) ?? 0) % 6
                                                            ],
                                                            color: (user.initials?.charCodeAt(0) ?? 0) % 6 < 2 ? '#121212' : '#FFFFFF'
                                                        }}
                                                    >
                                                        {user.initials || 'U'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm font-bold text-white">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-[#A0A0A0]">{user.company_name || 'N/A'}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-[#A0A0A0]">{user.email}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-[#A0A0A0]">{new Date(user.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <Link
                                            href={users.edit.url({ user: user.id })}
                                            className="text-[#FACC15] hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {usersProp.data.length === 0 && (
                    <div className="text-center py-12 rounded-2xl border-2 border-dashed border-[#333333]">
                        <p className="text-[#A0A0A0]">No hay miembros en el equipo todavía.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
