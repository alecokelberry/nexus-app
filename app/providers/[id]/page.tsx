"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, Star, GraduationCap, MapPin, Award, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { mockProviders } from "@/data/mockPatient"; // We will use this to lookup

export default function ProviderDetailPage() {
    const params = useParams();
    const providerId = params.id as string;

    // Lookup provider from mock data (or shared context if we moved it there fully, but mockProviders is simpler for public pages)
    const provider = mockProviders.find(p => p.id === providerId);

    if (!provider) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">Provider Not Found</h1>
                    <Link href="/providers" className="text-primary hover:underline mt-4 inline-block">Back to Directory</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Header />

            <main className="pb-20">
                {/* Profile Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                        <Link href="/providers" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Providers
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                            <div className="w-full md:w-1/3 max-w-sm flex-shrink-0">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 relative">
                                    <Image src={provider.image} alt={provider.name} fill className="object-cover" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {provider.specialty}
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                        <Star className="w-4 h-4 fill-amber-500" /> 4.9 (120+ Reviews)
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{provider.name}</h1>

                                <div className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                                    Board-certified otolaryngologist dedicated to providing comprehensive, patient-centered care for complex ENT conditions.
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <GraduationCap className="w-6 h-6 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Education</p>
                                            <p className="font-medium text-slate-900">Johns Hopkins University</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <Award className="w-6 h-6 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Experience</p>
                                            <p className="font-medium text-slate-900">15+ Years Practice</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/login" className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all text-center">
                                        Book Appointment
                                    </Link>
                                    <div className="flex gap-4">
                                        <button className="p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors">
                                            <Phone className="w-6 h-6" />
                                        </button>
                                        <button className="p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors">
                                            <Mail className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About & Schedule */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">About Dr. Thorne</h2>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Dr. Marcus Thorne is a renowned specialist in the field of otolaryngology, with a particular focus on sinus disorders and sleep apnea. After completing his residency at Mayo Clinic, he returned to Southern Utah to bring advanced surgical techniques to the community.
                                    </p>
                                    <p>
                                        He believes in a conservative approach to treatment, prioritizing medical management before considering surgical intervention. Dr. Thorne is passionate about patient education and takes the time to ensure every patient understands their condition and treatment options.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Reviews</h2>
                                <div className="grid gap-6">
                                    {[1, 2].map((_, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-1 text-amber-400 mb-3">
                                                <Star className="w-4 h-4 fill-current" />
                                                <Star className="w-4 h-4 fill-current" />
                                                <Star className="w-4 h-4 fill-current" />
                                                <Star className="w-4 h-4 fill-current" />
                                                <Star className="w-4 h-4 fill-current" />
                                            </div>
                                            <p className="text-slate-700 italic mb-4">&quot;Dr. Thorne actually listened to me. I&apos;ve been struggling with sinus issues for years and he finally found the root cause. Highly recommended!&quot;</p>
                                            <p className="text-sm font-semibold text-slate-900">— Sarah J., verified patient</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" /> Clinic Locations
                                </h3>
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l-2 border-slate-100">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                                        <h4 className="font-semibold text-slate-900">St. George Main Clinic</h4>
                                        <p className="text-sm text-slate-500 mt-1">Mon, Wed, Fri</p>
                                        <p className="text-sm text-slate-500">8:00 AM - 5:00 PM</p>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-slate-100">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-300" />
                                        <h4 className="font-semibold text-slate-900">Provo Satellite Office</h4>
                                        <p className="text-sm text-slate-500 mt-1">Tue, Thu</p>
                                        <p className="text-sm text-slate-500">9:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Accepted Insurance</h3>
                                <p className="text-sm text-slate-600 mb-6">Dr. Thorne accepts most major insurance plans including SelectHealth, BCBS, and UHC.</p>
                                <Link href="/insurance" className="text-primary font-semibold text-sm hover:underline">Check your coverage &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
