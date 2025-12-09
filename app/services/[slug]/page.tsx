"use client";

import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FaqItem {
    q: string;
    a: string;
}

interface ServiceDetail {
    title: string;
    subtitle: string;
    image: string;
    content: string;
    faq: FaqItem[];
}

// Mock Data for individual service content
const serviceDetails: Record<string, ServiceDetail> = {
    "sinus": {
        title: "Sinus & Nasal Care",
        subtitle: "Breathe easier with advanced treatments for chronic sinusitis.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
        content: `Chronic sinusitis affects millions of Americans, causing pain, pressure, and fatigue. At Southern Utah ENT, we specialize in identifying the root cause of your sinus issues. Whether it is allergies, structural issues like a deviated septum, or chronic inflammation, we have the tools to help.`,
        faq: [
            { q: "What is Balloon Sinuplasty?", a: "A minimally invasive procedure that uses a small balloon to gently expand sinus openings, promoting drainage without cutting tissue." },
            { q: "How long is recovery?", a: "Most patients return to normal activities within 24-48 hours." }
        ]
    },
    "hearing": {
        title: "Audiology & Hearing Protection",
        subtitle: "Reconnect with the world around you through better hearing.",
        image: "https://images.unsplash.com/photo-1590611936737-56e6aa649733?auto=format&fit=crop&q=80",
        content: `Hearing loss can be isolating. Our doctors of audiology provide comprehensive evaluations to determine the type and degree of hearing loss. We offer the latest in digital hearing aid technology, invisible-in-canal options, and custom hearing protection for musicians and shooters.`,
        faq: [
            { q: "Do I need a referral?", a: "In most cases, no. You can schedule directly with our audiologists." },
            { q: "Do you offer trial periods for hearing aids?", a: "Yes, we offer a 30-day risk-free trial on all hearing devices." }
        ]
    },
    // Fallback for others
    "default": {
        title: "Specialty ENT Services",
        subtitle: "Expert care for your ear, nose, and throat health.",
        image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80",
        content: "We offer a wide range of specialized services tailored to your needs. Contact us for more information.",
        faq: []
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const data = serviceDetails[slug] || serviceDetails["default"];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[40vh] bg-slate-900 overflow-hidden flex items-center"
            >
                <div className="absolute inset-0 w-full h-full opacity-40">
                    <Image src={data.image} alt={data.title} fill className="object-cover" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
                    <Link href="/services" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{data.title}</h1>
                    <p className="text-xl text-slate-200 max-w-2xl">{data.subtitle}</p>
                </div>
            </motion.div>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <article className="prose prose-slate prose-lg max-w-none mb-16">
                    <p className="lead">{data.content}</p>
                    <p>
                        We utilize state-of-the-art diagnostic equipment to ensure accurate results. Our team works closely with you to develop a personalized treatment plan that fits your lifestyle.
                    </p>
                </article>

                {data.faq.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-primary" /> Common Questions
                        </h3>
                        <div className="space-y-6">
                            {data.faq.map((item: FaqItem, i: number) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/50">
                                    <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
                                    <p className="text-slate-600">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 bg-slate-900 text-white rounded-3xl p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to feel better?</h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
                        Schedule your consultation today and take the first step towards relief.
                    </p>
                    <Link href="/login" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 relative z-10">
                        Request Appointment
                    </Link>
                </div>
            </main>
        </div>
    );
}
