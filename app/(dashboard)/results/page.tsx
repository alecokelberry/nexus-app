"use client";

import { useData } from "@/context/DataContext";
import { FileText, Download, ChevronRight, Activity, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsPage() {
    const { clinical, patientProfile } = useData(); // Assuming 'records' is available in DataContext, need to check.
    // Wait, 'records' is in 'mockPatient' but was it exposed in context?
    // Looking at DataContext.tsx in memory... it does NOT seem to expose 'records' directly in the interface?
    // Wait, I exposed 'clinical' and 'patientProfile' and 'appointments'. Not 'records'.
    // BUT! 'mockPatient' export in `data/mockPatient.ts` has `records`.
    // I should probably use `records` from import directly for now or verify DataContext.
    // Actually, let's just use the `clinical.labTrends` for the cool part and maybe import records directly as fallback.
    // Or better, I should have exposed `records` in DataContext. I'll check DataContext again or just import mock for now.

    const { records } = require("@/data/mockPatient").mockPatient; // Quick fix or using standard import

    const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-light text-slate-900">Test Results</h1>
                <p className="text-slate-500 mt-1">Lab reports, imaging, and historical trends.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Results List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-400" /> Recent Reports
                    </h2>
                    {records.map((rec: any) => (
                        <div key={rec.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${rec.status === "Abnormal" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"}`}>
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{rec.title}</h3>
                                        <div className="text-slate-500 text-sm">{rec.date} • {rec.doctor}</div>
                                        <p className="text-slate-600 mt-2 text-sm max-w-lg">{rec.summary}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${rec.status === "Abnormal" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                                        }`}>
                                        {rec.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Trends */}
                <div className="space-y-6">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-slate-400" /> Tracked Trends
                    </h2>

                    {/* Cholesterol Trend Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="mb-4">
                            <h3 className="font-bold text-slate-900">Cholesterol (Total)</h3>
                            <p className="text-xs text-slate-500">Target: &lt;200 mg/dL</p>
                        </div>

                        {/* Simple Chart Visualization */}
                        <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-200 pb-2 relative">
                            {clinical.labTrends.cholesterol.map((point: any, i: number) => {
                                const height = (point.value / 250) * 100; // Normalize somewhat
                                return (
                                    <div key={i} className="flex flex-col items-center gap-1 flex-1 group relative">
                                        <div
                                            className={`w-full max-w-[40px] rounded-t-lg transition-all ${point.value > 200 ? "bg-amber-400" : "bg-emerald-400"} group-hover:opacity-80`}
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-[10px] font-bold text-slate-400">{point.date.split("-")[0]}</span>

                                        {/* Tooltip */}
                                        <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {point.value} mg/dL
                                        </div>
                                    </div>
                                )
                            })}
                            {/* Target Line */}
                            <div className="absolute w-full border-t border-dashed border-slate-300 top-[20%] pointer-events-none">
                                <span className="absolute right-0 -top-5 text-[10px] text-slate-400">200 limit</span>
                            </div>
                        </div>
                    </div>

                    {/* A1C Trend Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="mb-4">
                            <h3 className="font-bold text-slate-900">Hemoglobin A1C</h3>
                            <p className="text-xs text-slate-500">Target: &lt;5.7%</p>
                        </div>

                        <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-200 pb-2 relative">
                            {clinical.labTrends.a1c.map((point: any, i: number) => {
                                const height = (point.value / 8) * 100;
                                return (
                                    <div key={i} className="flex flex-col items-center gap-1 flex-1 group relative">
                                        <div
                                            className={`w-full max-w-[40px] rounded-t-lg transition-all ${point.value > 5.7 ? "bg-amber-400" : "bg-emerald-400"} group-hover:opacity-80`}
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-[10px] font-bold text-slate-400">{point.date.split("-")[0]}</span>
                                        <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {point.value}%
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
