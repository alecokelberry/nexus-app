"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div className="hidden md:block">
                            <span className="block text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                                Southern Utah ENT
                            </span>
                            <span className="block text-xs uppercase tracking-widest text-primary font-medium">
                                Unified Patient Hub
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/services" className={cn("text-sm font-medium transition-colors hover:text-primary", isActive("/services") ? "text-primary font-semibold" : "text-slate-600")}>
                            Services
                        </Link>
                        <Link href="/providers" className={cn("text-sm font-medium transition-colors hover:text-primary", isActive("/providers") ? "text-primary font-semibold" : "text-slate-600")}>
                            Our Providers
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                                Resources <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute top-full right-0 w-48 py-2 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/insurance" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                                    Insurance Accepted
                                </Link>
                                <Link href="/forms" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                                    Patient Forms
                                </Link>
                                <Link href="/blog" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                                    Health News
                                </Link>
                            </div>
                        </div>
                        <Link href="/contact" className={cn("text-sm font-medium transition-colors hover:text-primary", isActive("/contact") ? "text-primary font-semibold" : "text-slate-600")}>
                            Contact
                        </Link>

                        <div className="h-6 w-px bg-slate-200 mx-2" />

                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                            Patient Portal
                        </Link>
                        <Link
                            href="/login"
                            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                        >
                            Request Appointment
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-primary p-2 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        <Link href="/services" className="block text-base font-medium text-slate-600 hover:text-primary bg-slate-50 p-3 rounded-lg">Services</Link>
                        <Link href="/providers" className="block text-base font-medium text-slate-600 hover:text-primary bg-slate-50 p-3 rounded-lg">Our Providers</Link>
                        <Link href="/insurance" className="block text-base font-medium text-slate-600 hover:text-primary bg-slate-50 p-3 rounded-lg">Insurance</Link>
                        <Link href="/forms" className="block text-base font-medium text-slate-600 hover:text-primary bg-slate-50 p-3 rounded-lg">Forms</Link>
                        <Link href="/contact" className="block text-base font-medium text-slate-600 hover:text-primary bg-slate-50 p-3 rounded-lg">Contact</Link>
                        <div className="border-t border-slate-100 pt-4 mt-2">
                            <Link href="/login" className="block text-base font-medium text-center text-primary border border-primary/20 bg-primary/5 p-3 rounded-lg mb-3">Patient Portal</Link>
                            <Link href="/login" className="block text-base font-medium text-center text-white bg-primary p-3 rounded-lg shadow-lg shadow-primary/20">Request Appointment</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
