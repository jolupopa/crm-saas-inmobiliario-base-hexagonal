import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Ubigeo {
    id: string;
    district: string;
    province: string;
}

interface Amenity {
    id: string;
    name: string;
}

interface Props {
    ubigeos: Ubigeo[];
    amenities: Amenity[];
}

const inputClass = "w-full rounded-xl border border-[#333333] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-[#A0A0A0] mb-2";
const sectionClass = "rounded-2xl border border-[#333333] bg-[#242424] p-7";

export default function Create({ ubigeos, amenities }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: 'apartment',
        operation: 'sale',
        price: '',
        currency: 'USD',
        area_total: '',
        bedrooms: 0,
        bathrooms: 0,
        parking_spots: 0,
        address: '',
        ubigeo_id: '',
        amenityIds: [] as string[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/propiedades');
    };

    const toggleAmenity = (id: string) => {
        const current = [...data.amenityIds];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setData('amenityIds', current);
    };

    return (
        <AdminLayout>
            <Head title="Nueva Propiedad — EstateManager" />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/propiedades"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#333333] bg-[#1a1a1a] text-[#A0A0A0] transition-all hover:border-[#FACC15]/30 hover:text-[#FACC15]"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">List a Property</h1>
                        <p className="text-sm text-[#A0A0A0] mt-0.5">Add a premium asset to your portfolio.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Section 1: Basic Info */}
                    <div className={sectionClass}>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#FACC15] mb-6">
                            Información General
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Título de la Publicación</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={inputClass}
                                    placeholder="Ej: Penthouse con vista al mar en Miraflores"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>Descripción</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    className={inputClass}
                                    placeholder="Describe las características premium de la propiedad..."
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Tipo de Propiedad</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="apartment">Departamento</option>
                                    <option value="house">Casa</option>
                                    <option value="office">Oficina</option>
                                    <option value="land">Terreno</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Operación</label>
                                <select
                                    value={data.operation}
                                    onChange={e => setData('operation', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="sale">Venta</option>
                                    <option value="rent">Alquiler</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Precio</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className={inputClass}
                                        placeholder="450000"
                                        required
                                    />
                                    {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Moneda</label>
                                    <select
                                        value={data.currency}
                                        onChange={e => setData('currency', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="PEN">PEN</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Área Total (m²)</label>
                                <input
                                    type="number"
                                    value={data.area_total}
                                    onChange={e => setData('area_total', e.target.value)}
                                    className={inputClass}
                                    placeholder="120"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Location */}
                    <div className={sectionClass}>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#FACC15] mb-6">
                            Ubicación
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Dirección Exacta</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className={inputClass}
                                    placeholder="Calle, Número, Urbanización"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Distrito / Provincia (Ubigeo Perú)</label>
                                <select
                                    value={data.ubigeo_id}
                                    onChange={e => setData('ubigeo_id', e.target.value)}
                                    className={inputClass}
                                    required
                                >
                                    <option value="">Selecciona una ubicación...</option>
                                    {ubigeos.map(u => (
                                        <option key={u.id} value={u.id}>{u.district} — {u.province}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Amenities */}
                    {amenities.length > 0 && (
                        <div className={sectionClass}>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#FACC15] mb-6">
                                Amenidades Premium
                            </h2>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {amenities.map(amenity => {
                                    const selected = data.amenityIds.includes(amenity.id);
                                    return (
                                        <button
                                            key={amenity.id}
                                            type="button"
                                            onClick={() => toggleAmenity(amenity.id)}
                                            className={`flex items-center justify-center rounded-xl border px-4 py-3 text-xs font-bold transition-all ${selected
                                                    ? 'border-[#FACC15] bg-[#FACC15]/10 text-[#FACC15] shadow-md shadow-[#FACC15]/10'
                                                    : 'border-[#333333] bg-[#1a1a1a] text-[#A0A0A0] hover:border-[#FACC15]/30 hover:text-white'
                                                }`}
                                        >
                                            {selected && <span className="mr-1.5">✓</span>}
                                            {amenity.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="flex justify-end gap-4 pt-2">
                        <Link
                            href="/propiedades"
                            className="rounded-full border border-[#333333] px-8 py-3 text-sm font-bold text-[#A0A0A0] transition-all hover:border-[#FACC15]/30 hover:text-white"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-[#FACC15] px-12 py-3 text-sm font-bold text-[#121212] shadow-xl shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? 'Publicando...' : 'Publicar Propiedad'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
