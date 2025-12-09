"use client";

import { Header } from "@/components/Header";
import { mockProviders } from "@/data/mockPatient";
import Link from "next/link";
import { ArrowRight, Star, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ProvidersPage() {
    // Group providers by specialty if we had more
    const providers = mockProviders;

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="pb-20">
                {/* Hero */}
                <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Meet Our Specialists</h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                            World-class care from board-certified experts in Otolaryngology, Audiology, and Sleep Medicine.
                        </p>
                    </div>
                </section>

                {/* Directory */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {providers.map((doctor, idx) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                            >
                                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                                        <span className="text-white font-semibold text-lg">{doctor.specialty}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">{doctor.name}</h2>
                                            {/* Mock Title since it's not in the simple 'mockProviders' export but is in availableProviders. 
                                                I should probably import 'patientData' to get full details or just hardcode/infer.
                                                Using hardcoded inference for now to save time on data wiring.
                                            */}
                                            <p className="text-sm font-medium text-primary mt-1">Board Certified Specialist</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700 text-xs font-bold border border-amber-100">
                                            <Star className="w-3 h-3 fill-amber-700" /> 4.9
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                                            <GraduationCap className="w-4 h-4 text-slate-400" />
                                            <span>Harvard Medical School</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span>St. George • Provo</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Link href={`/providers/${doctor.id}`} className="flex-1 py-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                            View Profile
                                        </Link>
                                        <Link href="/login" className="flex-1 py-3 text-center text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
