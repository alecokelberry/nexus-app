"use client";

import { Header } from "@/components/Header";
import { Search, Shield, Check, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const insurances = [
    { name: "SelectHealth", type: "PPO/HMO", status: "Accepted" },
    { name: "Blue Cross Blue Shield", type: "PPO", status: "Accepted" },
    { name: "UnitedHeathcare", type: "Choice Plus", status: "Accepted" },
    { name: "Cigna", type: "Open Access", status: "Accepted" },
    { name: "Aetna", type: "PPO", status: "Accepted" },
    { name: "Medicare", type: "Part B", status: "Accepted" },
    { name: "Medicaid (Utah)", type: "Select Plans", status: "Limited" },
    { name: "Tricare", type: "Standard", status: "Accepted" },
    { name: "Humana", type: "PPO", status: "Accepted" },
    { name: "Molina", type: "Marketplace", status: "Checking" },
];

export default function InsurancePage() {
    const [search, setSearch] = useState("");

    const filtered = insurances.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="max-w-4xl mx-auto px-4 py-20 pb-32">
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-light text-slate-900 mb-4">Insurance & Billing</h1>
                    <p className="text-xl text-slate-600">We work with most major providers to ensure your care is covered.</p>
                </div>

                {/* Verification Tool */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-wider uppercase mb-6">
                                Instant Verification
                            </span>
                            <h2 className="text-3xl font-serif font-medium mb-4">Check Your Coverage Now</h2>
                            <p className="text-slate-300 text-lg mb-6">
                                Enter your member details to receive an instant preliminary coverage report for our services.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Check className="w-4 h-4 text-primary" /> No cost estimate
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Check className="w-4 h-4 text-primary" /> Secure check
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-slate-800">
                            <VerificationForm />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-12">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search your insurance provider..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filtered.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                No providers found matching &quot;{search}&quot;. Please call our office to verify coverage.
                            </div>
                        ) : (
                            filtered.map((ins, i) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={i}
                                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                                            {ins.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{ins.name}</h3>
                                            <p className="text-sm text-slate-500">{ins.type}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${ins.status === "Accepted" ? "bg-green-50 text-green-700" :
                                        ins.status === "Limited" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"
                                        }`}>
                                        {ins.status === "Accepted" && <Check className="w-3 h-3" />}
                                        {ins.status}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">No Insurance? No Problem.</h3>
                        <p className="text-slate-600 mb-6">
                            We offer transparent self-pay pricing and flexible payment plans to ensure you get the care you need.
                        </p>
                        <button className="text-primary font-medium hover:underline">View Cash Pay Rates</button>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Billing Questions</h3>
                        <p className="text-slate-600 mb-6">
                            Our dedicated billing specialists are here to help you understand your statement and benefits.
                        </p>
                        <div className="flex items-center gap-2 text-slate-900 font-semibold">
                            <Phone className="w-5 h-5 text-slate-400" /> (435) 555-0123 ext. 3
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Phone({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg> }

interface CoverageResult {
    plan: string;
    copay: string;
    deductibleMet: string;
    status: string;
}

function VerificationForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [result, setResult] = useState<CoverageResult | null>(null);

    const checkCoverage = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Mock API
        setTimeout(() => {
            setStatus("success");
            setResult({
                plan: "Blue Cross Blue Shield - Gold PPO",
                copay: "$45.00",
                deductibleMet: "85%",
                status: "Active"
            });
        }, 2000);
    };

    if (status === "success" && result) {
        return (
            <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-1">Coverage Verified!</h4>
                <p className="text-sm text-slate-500 mb-6">Your plan is accepted at our clinic.</p>

                <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Plan</span>
                        <span className="font-semibold">{result.plan}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Est. Copay</span>
                        <span className="font-semibold">{result.copay}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Deductible Met</span>
                        <span className="font-semibold text-green-600">{result.deductibleMet}</span>
                    </div>
                </div>

                <button onClick={() => setStatus("idle")} className="text-sm text-primary font-bold hover:underline">
                    Check Another Plan
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={checkCoverage} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Insurance Provider</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                    <option>Select Provider</option>
                    <option>Blue Cross Blue Shield</option>
                    <option>SelectHealth</option>
                    <option>UnitedHealthcare</option>
                    <option>Aetna</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Member ID</label>
                <input
                    required
                    placeholder="XYZ123456789"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date of Birth</label>
                <input
                    required
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
            </div>
            <button
                disabled={status === "loading"}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
            >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Coverage"}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
            </button>
        </form>
    );
}
