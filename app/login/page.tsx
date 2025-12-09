"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<"patient" | "clinic" | null>(null);

    const handleDemoLogin = (selectedRole: "patient" | "clinic") => {
        // Simple mock auth - just redirect
        if (selectedRole === "patient") {
            router.push("/dashboard");
        } else {
            router.push("/clinic");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side: Brand & Visuals */}
                <div className="md:w-1/2 bg-primary p-12 flex flex-col justify-between text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-white transition-colors mb-8 group">
                            <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-light tracking-tight mb-2">Southern Utah ENT</h1>
                        <p className="text-primary-foreground/80 text-sm tracking-widest uppercase">Unified Patient Hub</p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl font-serif font-medium leading-tight">
                            Excellence in <br /> Ear, Nose & Throat Care.
                        </h2>
                        <p className="text-lg opacity-90 max-w-sm">
                            Experience a seamless connection between patient comfort and clinical precision.
                        </p>
                    </div>

                    <div className="relative z-10 text-xs opacity-60">
                        © 2025 Southern Utah ENT. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Login Actions */}
                <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white/50 backdrop-blur-3xl">
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h3>
                        <p className="text-muted-foreground">Please select your portal to continue.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Patient Option */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(124, 154, 146, 0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDemoLogin("patient")}
                            className="w-full text-left p-6 rounded-2xl border border-border hover:border-primary/50 transition-all flex items-center group bg-white shadow-sm"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <User className="w-6 h-6" />
                            </div>
                            <div className="ml-5 flex-1">
                                <h4 className="font-semibold text-lg text-foreground">Patient Portal</h4>
                                <p className="text-sm text-muted-foreground">Access medical records, appointments & billing.</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </motion.button>

                        {/* Clinic Option */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(124, 154, 146, 0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDemoLogin("clinic")}
                            className="w-full text-left p-6 rounded-2xl border border-border hover:border-primary/50 transition-all flex items-center group bg-white shadow-sm"
                        >
                            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className="ml-5 flex-1">
                                <h4 className="font-semibold text-lg text-foreground">Provider Access</h4>
                                <p className="text-sm text-muted-foreground">For clinicians and staff members only.</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                    </div>

                    <div className="mt-10 text-center text-xs text-muted-foreground">
                        <p>Protected by industry standard encryption.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
