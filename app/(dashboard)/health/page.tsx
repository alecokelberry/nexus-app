"use client";

import { useData } from "@/context/DataContext";
import { Activity, AlertTriangle, Shield, Thermometer } from "lucide-react";

export default function HealthProfilePage() {
    const { clinical } = useData();

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-light text-slate-900">Health Profile</h1>
                <p className="text-slate-500 mt-1">Summary of your active conditions, allergies, and immunizations.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Active Problems / Conditions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Active Problems</h2>
                    </div>
                    <div className="space-y-4">
                        {clinical.conditions.map(condition => (
                            <div key={condition.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <div className="font-bold text-slate-900">{condition.name}</div>
                                    <div className="text-sm text-slate-500">Onset: {condition.onset}</div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${condition.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                                    }`}>
                                    {condition.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Allergies */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-amber-100 p-2 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Allergies</h2>
                    </div>
                    <div className="space-y-4">
                        {clinical.allergies.map(allergy => (
                            <div key={allergy.id} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-slate-900">{allergy.substance}</div>
                                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{allergy.severity}</span>
                                </div>
                                <div className="text-sm text-amber-800">Reaction: {allergy.reaction}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Immunizations */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Immunizations</h2>
                    </div>
                    <div className="space-y-4">
                        {clinical.immunizations.map(imm => (
                            <div key={imm.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <div className="font-bold text-slate-900">{imm.name}</div>
                                </div>
                                <div className="text-sm text-slate-500 text-right">
                                    <div className="font-medium text-slate-900">{imm.date}</div>
                                    <div className="text-xs">{imm.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vitals Snapshot */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-rose-100 p-2 rounded-lg">
                            <Thermometer className="w-6 h-6 text-rose-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Latest Vitals</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Group vitals by type and show latest */}
                        {Array.from(new Set(clinical.vitals.map(v => v.type))).map(type => {
                            const latest = clinical.vitals.filter(v => v.type === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                            return (
                                <div key={type} className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 text-center">
                                    <div className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-1">{type}</div>
                                    <div className="text-2xl font-light text-slate-900">{latest.value} <span className="text-sm text-slate-500 font-normal">{latest.unit}</span></div>
                                    <div className="text-xs text-slate-400 mt-1">{latest.date}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
