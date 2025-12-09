import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Info } from "lucide-react";

interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    symptoms: string[];
    icon: any; // Lucide icon type
}

interface ServiceModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
    if (!service) return null;

    const Icon = service.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal Panel - Slide Over / Center Modal Hybrid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl w-full max-w-md pointer-events-auto overflow-hidden">
                            {/* Header with Icon */}
                            <div className="relative h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md"
                                >
                                    <X className="w-5 h-5 text-foreground/70" />
                                </button>
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary">
                                    <Icon className="w-8 h-8" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">{service.category}</span>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">{service.name}</h2>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Symptoms Tag Engine */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground/80">
                                        <Info className="w-4 h-4" /> Common Symptoms
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.symptoms.map((symptom, idx) => (
                                            <span key={idx} className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full border border-secondary/50">
                                                {symptom}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2">
                                        Book Consultant <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="bg-muted hover:bg-muted/80 text-foreground py-3 px-6 rounded-xl font-semibold text-sm transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
