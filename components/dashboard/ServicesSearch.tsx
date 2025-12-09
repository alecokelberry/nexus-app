"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { mockServices } from "@/data/mockServices";
import { ServiceModal } from "./ServiceModal";
import { AnimatePresence, motion } from "framer-motion";

export function ServicesSearch() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const filteredServices = query.length > 0
        ? mockServices.filter(s =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const handleSelect = (id: string) => {
        setSelectedServiceId(id);
        setQuery(""); // clear search on select
        setIsOpen(false);
    };

    const selectedService = mockServices.find(s => s.id === selectedServiceId) || null;

    return (
        <>
            <div className="relative w-full max-w-2xl mx-auto mb-8 z-20">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 flex items-center px-4 py-3 transition-all focus-within:ring-2 focus-within:ring-primary/20">
                        <Search className="w-5 h-5 text-muted-foreground mr-3" />
                        <input
                            type="text"
                            placeholder="Search for symptoms or services (e.g., 'Sinus', 'Hearing')..."
                            className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/70 focus:outline-none w-full text-sm font-medium"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay for click handling
                        />
                        <Sparkles className="w-4 h-4 text-primary/40 animate-pulse" />
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && filteredServices.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-xl border border-white/50 shadow-xl overflow-hidden py-1 z-30"
                        >
                            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                                Suggestions
                            </div>
                            {filteredServices.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleSelect(service.id)}
                                    className="w-full text-left px-4 py-3 hover:bg-primary/5 flex items-center gap-3 transition-colors group"
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-primary/70 group-hover:text-primary transition-colors">
                                        { /* Instantiate the icon component */}
                                        <service.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                                        <p className="text-xs text-muted-foreground">{service.category}</p>
                                    </div>
                                    <span className="text-xs text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal is hosted here but controlled effectively by the search select interaction */}
            <ServiceModal
                service={selectedService}
                isOpen={selectedServiceId !== null}
                onClose={() => setSelectedServiceId(null)}
            />
        </>
    );
}
