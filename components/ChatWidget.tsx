"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-100 mb-4 overflow-hidden pointer-events-auto"
                    >
                        <div className="bg-primary p-4 flex justify-between items-center text-white">
                            <div>
                                <h3 className="font-bold">Chat with Us</h3>
                                <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online
                                </p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="h-80 bg-slate-50 p-4 overflow-y-auto space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    SU
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                                    Hello! How can we help you today?
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    SU
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                                    Feel free to ask about our services, insurance, or appointment availability.
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Type a message..."
                                />
                                <button className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 transition-all pointer-events-auto"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
}
