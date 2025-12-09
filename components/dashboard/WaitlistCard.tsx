"use client";

import { useScheduling } from "@/context/SchedulingContext";
import { Clock, User, XCircle, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WaitlistCard() {
    const { waitlist, removeFromWaitlist, visitTypes, familyMembers } = useScheduling();

    if (waitlist.length === 0) return null;

    return (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 h-full">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <BellRing className="w-5 h-5" /> Waitlist Status
            </h3>

            <div className="space-y-3">
                <AnimatePresence>
                    {waitlist.map(entry => {
                        const patientName = familyMembers.find(f => f.id === entry.patientId)?.name || "Unknown";
                        const visitLabel = visitTypes.find(v => v.type === entry.visitType)?.label || "Visit";

                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm relative group"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="pr-6">
                                        <div className="font-bold text-slate-900 text-sm mb-1">{visitLabel}</div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                            <User className="w-3 h-3" /> {patientName}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="w-3 h-3" /> Pref: {entry.preferredDays.join(", ")} ({entry.timeRange})
                                        </div>
                                    </div>
                                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                        {entry.status}
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeFromWaitlist(entry.id)}
                                    className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all"
                                    title="Cancel Request"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="mt-4 text-xs text-amber-700/80 text-center">
                We&apos;ll notify you automatically when a slot opens up.
            </div>
        </div>
    );
}
