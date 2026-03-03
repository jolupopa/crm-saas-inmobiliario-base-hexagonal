import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import admin from '@/routes/admin';
import api from '@/routes/api';

interface Category {
    id: string;
    name: string;
    slug: string;
    type: 'property' | 'project';
}

interface Props {
    categories: {
        data: Category[];
    };
    type: string;
}

export default function CategoryIndex({ categories: { data: categories }, type: initialType }: Props) {
    const [currentType, setCurrentType] = useState(initialType);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const form = useForm({
        name: '',
        type: currentType as 'property' | 'project'
    });

    const handleTypeChange = (newType: string) => {
        setCurrentType(newType);
        router.get(admin.categories.index.url(), { type: newType }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingCategory(null);
        form.setData({ name: '', type: currentType as 'property' | 'project' });
        form.clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        form.setData({ name: category.name, type: category.type });
        form.clearErrors();
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            form.put(api.categories.update.url(editingCategory.id), {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            form.post(api.categories.store.url(), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!categoryToDelete) return;

        setIsDeleting(true);
        router.delete(api.categories.destroy.url(categoryToDelete.id), {
            data: { type: currentType },
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setCategoryToDelete(null);
            },
            onFinish: () => {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Gestión de Categorías" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Gestión de Categorías</h1>
                        <p className="text-[#A0A0A0]">Administra las categorías para propiedades y proyectos.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="rounded-xl bg-[#FACC15] px-5 py-2.5 text-sm font-bold text-[#121212] transition-all hover:bg-[#EAB308] shadow-lg shadow-[#FACC15]/20"
                    >
                        Nueva Categoría
                    </button>
                </div>

                <div className="flex gap-2 p-1 bg-[#1a1a1a] rounded-xl border border-[#333333] w-fit">
                    <button
                        onClick={() => handleTypeChange('property')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentType === 'property'
                            ? 'bg-[#FACC15] text-[#121212]'
                            : 'text-[#A0A0A0] hover:text-white'
                            }`}
                    >
                        Propiedades
                    </button>
                    <button
                        onClick={() => handleTypeChange('project')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentType === 'project'
                            ? 'bg-[#FACC15] text-[#121212]'
                            : 'text-[#A0A0A0] hover:text-white'
                            }`}
                    >
                        Proyectos
                    </button>
                </div>

                <div className="rounded-2xl border border-[#333333] bg-[#1a1a1a] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#333333] bg-white/5">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Nombre</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Slug</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Tipo</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#A0A0A0] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333333]">
                            {categories.map((category) => (
                                <tr key={category.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-white">{category.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-[#A0A0A0]">{category.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${category.type === 'property' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                            {category.type === 'property' ? 'Propiedad' : 'Proyecto'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className="p-2 text-[#A0A0A0] hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-lg transition-all"
                                                disabled={form.processing}
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="p-2 text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                                                disabled={form.processing}
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-[#A0A0A0]">
                                        No se encontraron categorías.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-[#333333] bg-[#1a1a1a] p-6 shadow-2xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                            </h2>
                            <p className="text-sm text-[#A0A0A0]">Complete los detalles de la categoría.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Nombre</label>
                                <input
                                    type="text"
                                    required
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    className={`w-full rounded-xl border ${form.errors.name ? 'border-red-500' : 'border-[#333333]'} bg-[#121212] px-4 py-2.5 text-white placeholder-[#555555] focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all`}
                                    placeholder="Ej. Departamento"
                                />
                                {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Tipo</label>
                                <select
                                    value={form.data.type}
                                    onChange={(e) => form.setData('type', e.target.value as any)}
                                    className="w-full rounded-xl border border-[#333333] bg-[#121212] px-4 py-2.5 text-white focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all"
                                >
                                    <option value="property">Propiedad</option>
                                    <option value="project">Proyecto</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-xl px-4 py-2 text-sm font-medium text-[#A0A0A0] hover:bg-white/5 hover:text-white transition-all disabled:opacity-50"
                                    disabled={form.processing}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded-xl bg-[#FACC15] px-6 py-2 text-sm font-bold text-[#121212] transition-all hover:bg-[#EAB308] disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center"
                                >
                                    {form.processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#121212]" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#1a1a1a] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Eliminar Categoría</h3>
                            <p className="text-sm text-[#A0A0A0] mb-6">
                                ¿Estás seguro de que deseas eliminar la categoría <span className="text-white font-medium">"{categoryToDelete?.name}"</span>? Esta acción no se puede deshacer.
                            </p>
                            <div className="flex w-full gap-3">
                                <button
                                    className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-[#A0A0A0] hover:bg-white/5 hover:text-white transition-all shadow-sm disabled:opacity-50"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    disabled={isDeleting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-600 shadow-lg shadow-red-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
