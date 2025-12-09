"use client";

import { useState } from "react";
import { X, Megaphone, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Broadcast {
    id: string;
    type: string;
    title: string;
    message: string;
    active: boolean;
    dismissable: boolean;
}

export function BroadcastAlert({ broadcasts }: { broadcasts: Broadcast[] }) {
    const [visibleBroadcasts, setVisibleBroadcasts] = useState(broadcasts.filter(b => b.active));

    const handleDismiss = (id: string) => {
        setVisibleBroadcasts(prev => prev.filter(b => b.id !== id));
    };

    if (visibleBroadcasts.length === 0) return null;

    return (
        <div className="space-y-4 mb-8">
            <AnimatePresence>
                {visibleBroadcasts.map(broadcast => (
                    <motion.div
                        key={broadcast.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`relative rounded-xl p-4 border flex items-start gap-4 overflow-hidden ${broadcast.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-900" :
                            broadcast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
                                "bg-blue-50 border-blue-200 text-blue-900"
                            }`}
                    >
                        <div className={`p-2 rounded-lg shrink-0 ${broadcast.type === "warning" ? "bg-amber-100 text-amber-600" :
                            broadcast.type === "success" ? "bg-emerald-100 text-emerald-600" :
                                "bg-blue-100 text-blue-600"
                            }`}>
                            {broadcast.type === "warning" ? <AlertTriangle className="w-5 h-5" /> :
                                broadcast.type === "success" ? <CheckCircle className="w-5 h-5" /> :
                                    <Megaphone className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 pt-1">
                            <h4 className="font-bold text-sm mb-1">{broadcast.title}</h4>
                            <p className="text-sm opacity-90">{broadcast.message}</p>
                        </div>

                        {broadcast.dismissable && (
                            <button
                                onClick={() => handleDismiss(broadcast.id)}
                                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 opacity-50" />
                            </button>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
