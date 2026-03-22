import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontLayout from '@/Layouts/FrontLayout';
import LandingSearchForm from '../Components/LandingSearchForm';
import PublicPropertyCard from '../Components/PublicPropertyCard';

interface Props {
    featured: {
        data: any[];
    };
    categories: any[];
}

export default function Welcome({ featured = { data: [] }, categories = [] }: Props) {
    return (
        <FrontLayout>
            <Head title="Find Your Golden Address | CrmSaas Luxury Real Estate" />

            <div className="bg-[#121212]">
                {/* ── Hero Section ── */}
                <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                    {/* Background Hero Image with overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/hero/qatar-skyline.png"
                            className="h-full w-full object-cover"
                            alt="Luxury Qatar Skyline"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#121212]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                        <span className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-[#FACC15]">Premium Real Estate</span>
                        <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                            Find Your <span className="italic text-[#FACC15]">Golden Address</span> <br /> In Trujillo
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-[#D1D1D1]">
                            Experience the pinnacle of luxury living. Discover exclusive penthouses, waterfront villas, and elite investment opportunities in the heart of Doha.
                        </p>

                        {/* Search Bar Component */}
                        <div className="mt-12 w-full max-w-4xl">
                            <LandingSearchForm categories={categories} />
                        </div>
                    </div>
                </div>

                {/* ── Featured Projects Section ── */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-[#FACC15]">Curated Selection</span>
                            <h2 className="mt-2 text-4xl font-black tracking-tight text-white">Featured Luxury Estates</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#333333] hover:border-[#FACC15] transition-all text-[#A0A0A0] hover:text-[#FACC15]">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#333333] hover:border-[#FACC15] transition-all text-[#A0A0A0] hover:text-[#FACC15]">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featured.data?.map((property) => (
                            <PublicPropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>

                {/* ── Excellence Section ── */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-3xl overflow-hidden aspect-square border border-[#333333]">
                            <img
                                src="/images/placeholder-property.jpg"
                                className="h-full w-full object-cover grayscale-[0.2]"
                                alt="Modern Office"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-[#FACC15]">Our Legacy</span>
                            <h2 className="mt-2 text-5xl font-black tracking-tight text-white leading-tight">Excellence in Every Transaction</h2>
                            <p className="mt-6 text-lg text-[#A0A0A0] leading-relaxed">
                                CrmSaas is more than a real estate agency, we are your strategic partner in the Middle Eastern luxury market. For over a decade, we've bridged the gap between extraordinary architecture and discerning buyers.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mt-12 mb-12">
                                <div>
                                    <p className="text-4xl font-black text-[#FACC15]">500+</p>
                                    <p className="text-xs uppercase tracking-widest text-[#555555] font-bold mt-1">Premium Assets</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black text-[#FACC15]">12+</p>
                                    <p className="text-xs uppercase tracking-widest text-[#555555] font-bold mt-1">Years Exp.</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black text-[#FACC15]">2.4B</p>
                                    <p className="text-xs uppercase tracking-widest text-[#555555] font-bold mt-1">Sales Volume</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black text-[#FACC15]">100%</p>
                                    <p className="text-xs uppercase tracking-widest text-[#555555] font-bold mt-1">Client Trust</p>
                                </div>
                            </div>

                            <Link
                                href="/sobre-nosotros"
                                className="inline-flex items-center justify-center rounded-full bg-[#FACC15] px-8 py-4 text-sm font-black text-[#121212] transition-all hover:brightness-110 active:scale-95"
                            >
                                Discover Our Story
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Services Section ── */}
                <div className="bg-[#1a1a1a] py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-[#FACC15]">Holistic Excellence</span>
                        <h2 className="mt-3 text-4xl font-black text-white">Our Bespoke Services</h2>
                        <p className="mt-4 text-[#A0A0A0]">Tailored solutions for High-net-worth investors and luxury homeowners.</p>
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Residential Sales', desc: 'Exclusive access to off-market listings and premium waterfront properties across Doha.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                                { title: 'Investment Advisory', desc: 'Strategic market analysis to maximize ROI on luxury real estate portfolios in Lusail and beyond.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                                { title: 'Asset Management', desc: 'End-to-end management services ensuring your property maintains its premium value and status.', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                { title: 'Valuation Services', desc: 'Accurate, market-driven property appraisals conducted by certified industry experts.', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' }
                            ].map((service) => (
                                <div key={service.title} className="bg-[#121212] p-8 rounded-2xl border border-[#333333] hover:border-[#FACC15]/30 transition-all group">
                                    <div className="h-12 w-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center mb-6 group-hover:bg-[#FACC15] transition-all">
                                        <svg className="h-6 w-6 text-[#FACC15] group-hover:text-black transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-black text-white mb-3">{service.title}</h3>
                                    <p className="text-sm text-[#A0A0A0] leading-relaxed">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Testimonial Section ── */}
                <div className="py-24 sm:py-32 bg-[#121212] overflow-hidden relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-[#FACC15]/5 pointer-events-none select-none">"</div>
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
                        <svg className="h-12 w-12 text-[#FACC15] mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 1H17.017C18.1216 1 19.017 1.89543 19.017 3V5C20.1216 5 21.017 5.89543 21.017 7V15C21.017 17.2091 19.2261 19 17.017 19H14.017V21ZM5.017 21V19H2.017C0.912383 19 -0.0783511 17.2091 -0.0783511 15V7C-0.0783511 5.89543 0.817066 5 1.92165 5H4.92165V3C4.92165 1.89543 5.81707 1 6.92165 1H9.92165V3L9.92165 6C9.92165 7.10457 9.02622 8 7.92165 8H4.92165C4.36937 8 3.92165 8.44772 3.92165 9V15C3.92165 15.5523 4.36937 16 4.92165 16H7.92165C9.02622 16 9.92165 16.8954 9.92165 18V21H6.92165C5.81707 21 4.92165 20.1046 4.92165 19L5.017 21Z" /></svg>
                        <blockquote className="text-3xl font-black text-white italic leading-tight">
                            "The level of professionalism and attention to detail provided by CrmSaas is unparalleled. They didn't just find me a house; they secured an architectural masterpiece that perfectly aligned with my vision."
                        </blockquote>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="h-16 w-16 rounded-full border-2 border-[#FACC15] overflow-hidden">
                                <img src="/images/placeholder-property.jpg" className="h-full w-full object-cover" alt="Mohammed Al-Thani" />
                            </div>
                            <div>
                                <p className="text-lg font-black text-white">Mohammed Al-Thani</p>
                                <p className="text-xs uppercase tracking-widest text-[#FACC15] font-bold">CEO, Global Investments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
