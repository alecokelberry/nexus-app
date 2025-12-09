"use client";

import { Header } from "@/components/Header";
import { ArrowRight, Check, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";


const services = [
    {
        id: "sinus",
        title: "Sinus & Nasal",
        desc: "Advanced treatment for chronic sinusitis, nasal obstruction, and allergies.",
        features: ["Balloon Sinuplasty", "Septoplasty", "Polyp Removal", "Allergy Testing"],
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
    },
    {
        id: "hearing",
        title: "Audiology & Hearing",
        desc: "Comprehensive hearing evaluations and advanced digital hearing aid technology.",
        features: ["Diagnostic Testing", "Hearing Aid Fitting", "Tinnitus Management", "Custom Earplugs"],
        image: "https://images.unsplash.com/photo-1590611936737-56e6aa649733?auto=format&fit=crop&q=80"
    },
    {
        id: "sleep",
        title: "Sleep Medicine",
        desc: "Rest easy with our specialized care for sleep apnea and snoring issues.",
        features: ["Home Sleep Studies", "CPAP Therapy", "Inspire Implant", "Snoring Surgery"],
        image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80"
    },
    {
        id: "throat",
        title: "Throat & Voice",
        desc: "Expert care for vocal cord disorders, swallowing difficulties, and tonsillitis.",
        features: ["Voice Therapy", "Tonsillectomy", "Thyroid Surgery", "Laryngoscopy"],
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pb-20">
                <section className="bg-slate-50 py-20 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Our Services</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Comprehensive ear, nose, and throat care for the entire family. Using the latest technology to improve your quality of life.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-16 space-y-24">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`flex flex-col lg:gap-16 items-center ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                        >
                            <div className="w-full lg:w-1/2">
                                <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl relative group">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                    <Image src={service.image} alt={service.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Specialty Care</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{service.title}</h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    {service.desc}
                                </p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {service.features.map(f => (
                                        <li key={f} className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                                    View Details <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </section>

                <section className="bg-primary/5 py-20 mt-12">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                            <Activity className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Not sure what you need?</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Our team is here to help diagnose and treat your condition. Schedule a consultation today to get started on your path to wellness.
                        </p>
                        <Link href="/login" className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            Book a Consultation
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
