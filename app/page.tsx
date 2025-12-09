"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Clock, Phone, Ear, Star, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import Image from "next/image";

// Components for Section Icons
const EarIcon = () => <Ear className="w-8 h-8 text-primary" />;
const NoseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
    >
        <path d="M18 13c0 5-3.5 7.5-6 7.5S6 18 6 13c0-3.5 2.5-6 6-6s6 2.5 6 6z" />
        <path d="M12 7V3" />
        <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
);
// Fallback custom icons for specific medical needs if Lucide is limited
const ThroatIcon = () => <ActivityIcon className="w-8 h-8 text-primary" />;
const ActivityIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);


export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-32 lg:pb-40">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                        <div className="lg:col-span-6 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wider uppercase mb-6">
                                    Serving St. George & Beyond
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-serif font-medium text-slate-900 leading-tight mb-6">
                                    Highest Quality <span className="text-primary italic">ENT Care</span> in Southern Utah.
                                </h1>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    From allergies to audiology, we provide compassionate, world-class treatment for your family’s ear, nose, and throat needs.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link href="/login" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                                        Book Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link href="/services" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all">
                                        Explore Services
                                    </Link>
                                </div>
                                <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Board Certified
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> 20+ Years Exp.
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-6 mt-12 lg:mt-0 relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200/40 rounded-full blur-3xl" />
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="https://images.unsplash.com/photo-1549497558-86c5269b56eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"
                                    alt="Southern Utah Landscape"
                                    width={1280}
                                    height={800}
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                    <p className="text-white font-medium">Breathtaking Red Rocks of Southern Utah</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-medium text-slate-900 mb-4">Comprehensive Care</h2>
                        <p className="text-slate-600 text-lg">Specialized treatments tailored to improve your quality of life.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Ear & Hearing", desc: "Expert audiology services, hearing aids, and treatment for ear infections.", icon: EarIcon, href: "/services/hearing" },
                            { title: "Nose & Sinus", desc: "Relief from chronic sinusitis, allergies, and nasal obstruction.", icon: NoseIcon, href: "/services/sinus" },
                            { title: "Throat & Neck", desc: "Diagnosis and care for throat disorders, thyroid issues, and voice problems.", icon: ThroatIcon, href: "/services/throat" },
                            { title: "Allergy Center", desc: "Comprehensive testing and immunotherapy for lasting relief.", icon: Star, href: "/services/allergy" },
                            { title: "Sleep Medicine", desc: "Solutions for sleep apnea and snoring to help you rest better.", icon: Clock, href: "/services/sleep" },
                            { title: "Facial Plastics", desc: "Cosmetic and reconstructive procedures for the face and neck.", icon: Smile, href: "/services/plastics" },
                        ].map((service, idx) => (
                            <Link href={service.href} key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20 block">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {/* Render Icon */}
                                    <service.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                                <span className="inline-flex items-center text-primary font-medium hover:underline">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <TestimonialsSection />

            {/* Info / Location Bar */}
            <section id="location" className="bg-slate-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif mb-6">Visit Our Clinic</h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Conveniently located in St. George, serving patients from across Southern Utah and Nevada.
                            </p>

                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-lg">St. George Office</h4>
                                            <p className="text-slate-400">1490 E Foremaster Dr, Suite 320<br />St. George, UT 84790</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Call Us</h4>
                                            <p className="text-slate-400">(435) 555-0123</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" /> Office Hours
                                    </h3>
                                    <ul className="space-y-2 text-slate-300 text-sm">
                                        <li className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Monday - Thursday</span>
                                            <span>8:30 AM - 5:00 PM</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Friday</span>
                                            <span>8:30 AM - 2:00 PM</span>
                                        </li>
                                        <li className="flex justify-between text-slate-500">
                                            <span>Saturday - Sunday</span>
                                            <span>Closed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.660689977054!2d-113.5684742236357!3d37.10398697217036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca4526df7affff%3A0x6d3663a8635848e6!2s1490%20E%20Foremaster%20Dr%20%23320%2C%20St.%20George%2C%20UT%2084790!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="group-hover:filter-none transition-all duration-700"
                            ></iframe>
                            <div className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg pointer-events-none">
                                Southern Utah ENT
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <span className="text-white font-bold text-lg">Southern Utah ENT</span>
                        <p className="text-sm mt-1">Excellence in Ear, Nose & Throat Care.</p>
                    </div>
                    <div className="flex gap-8 text-sm">
                        <Link href="/login" className="hover:text-white transition-colors">Patient Portal</Link>
                        <Link href="/billing" className="hover:text-white transition-colors">Bill Pay</Link>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                    <div className="text-xs text-slate-600">
                        © 2025 Southern Utah ENT. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
