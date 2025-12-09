"use client";

import { Header } from "@/components/Header";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Keeping Link if we decide to use it, but linter said unused.
// Actually line 63 uses <a> and import had Link. I should switch <a> to Link or remove import.
// Switching to Link is better for Next.js.

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Health & Wellness Journal</h1>
                    <p className="text-xl text-slate-600">Expert advice, clinic news, and healthy living tips from Southern Utah ENT.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "5 Signs You Might Have Sleep Apnea",
                            excerpt: "Snoring isn't just annoying—it could be a sign of a serious health condition. Here's what to look for.",
                            date: "Dec 01, 2025",
                            author: "Dr. Marcus Thorne",
                            image: "https://images.unsplash.com/photo-1541781777621-3914296d36e3?auto=format&fit=crop&q=80"
                        },
                        {
                            title: "Managing Seasonal Allergies in St. George",
                            excerpt: "The red rocks are beautiful, but the pollen can be brutal. Learn how to stay symptom-free this spring.",
                            date: "Nov 24, 2025",
                            author: "Nurse Practitioner Sarah",
                            image: "https://images.unsplash.com/photo-1466047248358-052449b291cc?auto=format&fit=crop&q=80"
                        },
                        {
                            title: "The Impact of Hearing Loss on Cognitive Health",
                            excerpt: "New studies show a strong link between untreated hearing loss and cognitive decline in older adults.",
                            date: "Nov 10, 2025",
                            author: "Dr. Elena Vance",
                            image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80"
                        },
                        {
                            title: "Balloon Sinuplasty: Is It Right for You?",
                            excerpt: "Explore the benefits of this minimally invasive procedure for chronic sinusitis sufferers.",
                            date: "Oct 28, 2025",
                            author: "Dr. Marcus Thorne",
                            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
                        }
                    ].map((post, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group h-full">
                            <div className="aspect-video overflow-hidden relative">
                                <Image src={post.image} fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-slate-800">
                                    Wellness
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-4">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                                <Link href="#" className="inline-flex items-center text-primary font-semibold text-sm hover:underline mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
