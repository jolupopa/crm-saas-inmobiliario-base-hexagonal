import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Property {
    id: string;
    title: string;
    price_formatted: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area_total: number;
    status: string;
}

interface Props {
    properties: {
        data: Property[];
        links: any;
    };
}

const statusConfig: Record<string, { label: string; color: string }> = {
    published: { label: 'Publicado', color: 'bg-[#10B981]/10 text-[#10B981]' },
    draft: { label: 'Borrador', color: 'bg-[#A0A0A0]/10 text-[#A0A0A0]' },
};

export default function Index({ properties }: Props) {
    return (
        <AdminLayout>
            <Head title="Propiedades — EstateManager" />

            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">My Properties</h1>
                        <p className="mt-1 text-[#A0A0A0] text-sm">Manage and publish your curated property portfolio.</p>
                    </div>
                    <Link
                        href="/propiedades/crear"
                        className="rounded-full bg-[#FACC15] px-6 py-2.5 text-sm font-bold text-[#121212] shadow-lg shadow-[#FACC15]/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        + Nueva Propiedad
                    </Link>
                </div>

                {/* Properties Grid */}
                {properties.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#333333] bg-[#1a1a1a] py-24 text-center">
                        <div className="h-14 w-14 rounded-2xl bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15] mb-4">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">No properties yet</h3>
                        <p className="mt-2 text-sm text-[#A0A0A0]">Add your first premium property to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {properties.data.map((property) => {
                            const badge = statusConfig[property.status] ?? { label: property.status, color: 'bg-[#333333] text-[#A0A0A0]' };
                            return (
                                <div
                                    key={property.id}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#333333] bg-[#242424] transition-all hover:border-[#FACC15]/30 hover:shadow-xl hover:shadow-[#FACC15]/5"
                                >
                                    {/* Image placeholder */}
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#1a1a1a] relative">
                                        <div className="flex h-full items-center justify-center text-[#333333]">
                                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        {/* Status badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${badge.color}`}>
                                                {badge.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="text-base font-bold text-white line-clamp-1">{property.title}</h3>
                                        <p className="mt-1 text-xs text-[#A0A0A0] line-clamp-1">{property.address}</p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xl font-extrabold text-[#FACC15]">{property.price_formatted}</span>
                                        </div>

                                        <div className="mt-4 flex gap-4 border-t border-[#333333] pt-4">
                                            <span className="text-xs text-[#A0A0A0] font-semibold">
                                                {property.bedrooms} <span className="font-normal">Hab.</span>
                                            </span>
                                            <span className="text-xs text-[#A0A0A0] font-semibold">
                                                {property.bathrooms} <span className="font-normal">Baños</span>
                                            </span>
                                            <span className="text-xs text-[#A0A0A0] font-semibold">
                                                {property.area_total} <span className="font-normal">m²</span>
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/propiedades/${property.id}`} className="absolute inset-0 z-10" />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
