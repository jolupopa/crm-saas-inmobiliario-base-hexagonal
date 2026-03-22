import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontLayout from '@/Layouts/FrontLayout';
import PublicPropertyCard from '../Components/PublicPropertyCard';
import PublicSearchSidebar from '../Components/PublicSearchSidebar';

interface Props {
    properties: {
        data: any[];
        meta: any;
    };
    filters: any;
    categories: any[];
    amenities: any[];
}

export default function PropertySearch({ properties, filters, categories, amenities }: Props) {
    return (
        <FrontLayout>
            <Head title="Luxury Real Estate for Sale and Rent | CrmSaas" />

            <div className="bg-[#121212] min-h-screen">
                {/* ── Sub-header / Breadcrumbs ── */}
                <div className="border-b border-[#333333] bg-[#1a1a1a]/50 py-4">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <nav className="flex text-[10px] font-bold uppercase tracking-widest text-[#555555] gap-2">
                            <Link href="/" className="hover:text-[#FACC15]">Home</Link>
                            <span>/</span>
                            <span className="text-[#A0A0A0]">Luxury Estates</span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* ── Sidebar Filters ── */}
                        <PublicSearchSidebar
                            filters={filters}
                            categories={categories}
                            amenities={amenities}
                        />

                        {/* ── Main Content ── */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-white tracking-tight">
                                        Luxury Estates <span className="text-[#FACC15]">in Trujillo</span>
                                    </h1>
                                    <p className="mt-1 text-sm text-[#A0A0A0]">
                                        {properties.meta.total} properties found matching your criteria
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333333]">
                                        <button className="p-2 bg-[#FACC15] text-[#121212] rounded-md shadow-sm">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                        </button>
                                        <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                        </button>
                                    </div>
                                    <select className="bg-[#1a1a1a] border-[#333333] text-sm text-[#A0A0A0] rounded-xl focus:ring-[#FACC15] focus:border-[#FACC15] px-4 py-2 appearance-none cursor-pointer">
                                        <option>Price: High to Low</option>
                                        <option>Price: Low to High</option>
                                        <option>Newest First</option>
                                    </select>
                                </div>
                            </div>

                            {/* Property Grid */}
                            {properties.data.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {properties.data.map((property) => (
                                        <PublicPropertyCard key={property.id} property={property} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 text-center border border-dashed border-[#333333] rounded-3xl bg-[#1a1a1a]/30">
                                    <svg className="h-16 w-16 text-[#333333] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-white mb-2">No properties matched your criteria</h3>
                                    <p className="text-[#A0A0A0] text-sm">Try adjusting your filters or search terms.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {properties.meta.last_page > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {properties.meta.links.map((link: any, i: number) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3 text-sm font-bold transition-all ${link.active
                                                    ? 'bg-[#FACC15] text-[#121212]'
                                                    : 'bg-[#1a1a1a] text-[#A0A0A0] hover:bg-[#242424] hover:text-white'
                                                    }`}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3 text-sm font-bold bg-[#1a1a1a] text-[#333333] cursor-not-allowed"
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
