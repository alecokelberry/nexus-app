"use client";

import { Header } from "@/components/Header";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="pb-20">
                {/* Header */}
                <div className="bg-slate-900 py-20 text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-light mb-6">Get In Touch</h1>
                    <p className="text-slate-300 text-xl max-w-2xl mx-auto px-4">
                        We're here to answer your questions and help you schedule your visit.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Info Cards */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Call Us</h3>
                            <p className="text-slate-500 mb-6">Mon-Fri from 8am to 5pm</p>
                            <a href="tel:4355550123" className="text-2xl font-bold text-primary hover:underline">(435) 555-0123</a>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Visit Us</h3>
                            <p className="text-slate-500 mb-6">St. George & Provo</p>
                            <a href="#map" className="text-lg font-medium text-primary hover:underline">Get Directions</a>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Email Us</h3>
                            <p className="text-slate-500 mb-6">For general inquiries</p>
                            <a href="mailto:info@suent.com" className="text-lg font-medium text-primary hover:underline">info@suent.com</a>
                        </div>
                    </div>

                    <div className="mt-16 grid lg:grid-cols-2 gap-16">
                        {/* Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                                        <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                                        <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                                    <input type="email" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                                    <textarea rows={5} className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="How can we help you?" />
                                </div>
                                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                    Send Message <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div id="map" className="h-[600px] bg-slate-200 rounded-3xl overflow-hidden shadow-inner relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12903.66601234567!2d-113.568!3d37.096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA1JzQ1LjYiTiAxMTPCsDM0JzA0LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>

                            <div className="absolute bottom-8 left-8 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg max-w-xs">
                                <h4 className="font-bold text-slate-900 mb-2">St. George Clinic</h4>
                                <p className="text-sm text-slate-600 mb-4">1490 E Foremaster Dr, Suite 320<br />St. George, UT 84790</p>
                                <a href="https://maps.google.com" target="_blank" className="text-xs font-bold text-primary uppercase tracking-wider hover:underline">Get Directions</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
