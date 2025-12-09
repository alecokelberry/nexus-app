"use client";

import { useData } from "@/context/DataContext";
import { Pill, RefreshCw, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MedicationsPage() {
    const { clinical } = useData();
    const [refillRequest, setRefillRequest] = useState<string | null>(null);

    const handleRefill = (medId: string) => {
        setRefillRequest(medId);
        // Simulate API call
        setTimeout(() => {
            setRefillRequest(null);
            alert("Refill request sent to pharmacy!");
        }, 1500);
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light text-slate-900">Medications</h1>
                    <p className="text-slate-500 mt-1">Manage prescriptions and request refills.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4" /> Default Pharmacy: CVS #1234 (St. George)
                </div>
            </div>

            <div className="grid gap-4">
                {clinical.medications.map((med) => (
                    <div key={med.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-xl shrink-0">
                                <Pill className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
                                <div className="text-slate-500 font-medium">{med.dosage} • {med.frequency}</div>
                                <div className="flex items-center gap-3 mt-2 text-sm">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${med.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"
                                        }`}>
                                        {med.status}
                                    </span>
                                    {med.status === "Active" && (
                                        <span className={`flex items-center gap-1 ${med.refillsRemaining > 0 ? "text-slate-600" : "text-amber-600 font-bold"}`}>
                                            <RefreshCw className="w-3 h-3" /> {med.refillsRemaining} refills remaining
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Last Filled: {med.lastFilled}</div>
                            </div>
                        </div>

                        {med.status === "Active" && (
                            <div className="w-full md:w-auto">
                                <button
                                    onClick={() => handleRefill(med.id)}
                                    disabled={med.refillsRemaining === 0 || refillRequest === med.id}
                                    className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${refillRequest === med.id
                                        ? "bg-slate-100 text-slate-400 cursor-wait"
                                        : med.refillsRemaining > 0
                                            ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        }`}
                                >
                                    {refillRequest === med.id ? (
                                        "Processing..."
                                    ) : med.refillsRemaining > 0 ? (
                                        <>Request Refill</>
                                    ) : (
                                        <>Refills Expired</>
                                    )}
                                </button>
                                {med.refillsRemaining === 0 && (
                                    <p className="text-xs text-center md:text-right text-amber-600 mt-2 font-medium">
                                        Visit required for renewal
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
