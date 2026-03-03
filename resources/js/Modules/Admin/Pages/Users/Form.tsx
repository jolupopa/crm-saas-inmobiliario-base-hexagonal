import React, { useRef } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import users from '@/routes/admin/users';

interface User {
    id?: string;
    name: string;
    email: string;
    company_name?: string | null;
    avatar_url?: string | null;
    initials?: string;
}

interface Props {
    user?: User;
}

export default function Form({ user }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        company_name: user?.company_name || '',
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Usamos post con _method: 'PUT' si es edición para soportar envío de archivos
        if (user) {
            post(users.update.url({ user: user.id! }, { query: { _method: 'PUT' } }), {
                forceFormData: true,
            });
        } else {
            post(users.store.url());
        }
    };

    return (
        <AdminLayout>
            <Head title={user ? 'Editar Usuario' : 'Nuevo Usuario'} />

            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                    </h1>
                    <p className="mt-1 text-[#A0A0A0]">
                        {user ? 'Actualiza los datos del perfil del usuario' : 'Completa la información para invitar a un nuevo miembro'}.
                    </p>
                </div>

                <form onSubmit={submit} className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-8 space-y-8">
                    {/* Sección: Avatar */}
                    <div className="flex items-center gap-6 pb-6 border-b border-[#333333]">
                        <div className="relative group">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[#FACC15]/30 bg-[#242424] flex items-center justify-center">
                                {data.avatar ? (
                                    <img src={URL.createObjectURL(data.avatar)} className="h-full w-full object-cover" alt="Preview" />
                                ) : user?.avatar_url ? (
                                    <img src={user.avatar_url} className="h-full w-full object-cover" alt={user.name} />
                                ) : (
                                    <span className="text-xl font-bold text-[#FACC15]">{user?.initials || '?'}</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                </svg>
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                className="hidden"
                                onChange={e => setData('avatar', e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Foto de Perfil</h3>
                            <p className="text-xs text-[#A0A0A0] mt-1">Recomendado: 400x400px. Máximo 2MB.</p>
                            {errors.avatar && <p className="text-xs text-red-400 mt-1">{errors.avatar}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Nombre Completo</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="rounded-xl border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FACC15] focus:ring-[#FACC15]/20"
                                placeholder="Ej. Juan Pérez"
                                required
                            />
                            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Email de Acceso</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="rounded-xl border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FACC15] focus:ring-[#FACC15]/20"
                                placeholder="juan@agencia.com"
                                required
                            />
                            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                        </div>

                        {/* Empresa */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Nombre de Empresa / Agencia</label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={e => setData('company_name', e.target.value)}
                                className="rounded-xl border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FACC15] focus:ring-[#FACC15]/20"
                                placeholder="Ej. Estate Manager Realty"
                            />
                            {errors.company_name && <p className="text-xs text-red-400">{errors.company_name}</p>}
                        </div>

                        {!user && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Contraseña</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="rounded-xl border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FACC15] focus:ring-[#FACC15]/20"
                                        required
                                    />
                                    {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">Confirmar alta</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="rounded-xl border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FACC15] focus:ring-[#FACC15]/20"
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#333333]">
                        <Link href={users.index.url()} className="text-sm font-bold text-[#A0A0A0] hover:text-white transition-colors">
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-[#FACC15] px-10 py-3.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                        >
                            {user ? 'Guardar Cambios' : 'Generar Acceso'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
