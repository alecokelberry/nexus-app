"use client";

import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Patient since 2021",
        content: "Dr. Anderson was incredibly thorough and kind. After years of sinus issues, I finally have relief. The entire staff made me feel welcome and cared for.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Surgery Patient",
        content: "The surgical center was state-of-the-art and the recovery process was exactly as described. I appreciated the clear communication and follow-up calls.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Parent",
        content: "They were wonderful with my 5-year-old son's ear tube procedure. He wasn't scared at all thanks to their gentle approach. Highly recommend for families!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        id: 4,
        name: "David Miller",
        role: "Sleep Apnea Patient",
        content: "Getting my sleep study done here changed my life. I'm finally sleeping through the night. The digital portal makes booking appointments so easy.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
];

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mb-20" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Patient Stories</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4">What Our Patients Say</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
                        <button onClick={prev} className="p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-primary hover:scale-110 transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
                        <button onClick={next} className="p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-primary hover:scale-110 transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative text-center"
                            >
                                <Quote className="w-12 h-12 text-primary/20 absolute top-8 left-8" />

                                <div className="mb-8 relative z-10">
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl text-slate-700 italic font-light leading-relaxed">
                                        &quot;{testimonials[current].content}&quot;
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src={testimonials[current].image}
                                            alt={testimonials[current].name}
                                            fill
                                            className="rounded-full object-cover border-4 border-slate-50 shadow-md"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">{testimonials[current].name}</h4>
                                        <p className="text-primary text-sm font-semibold">{testimonials[current].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
