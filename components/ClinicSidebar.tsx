"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, MessageSquare, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Schedule", href: "/clinic/schedule", icon: Calendar },
    { name: "Messages", href: "/clinic/messages", icon: MessageSquare },
    { name: "Analytics", href: "/clinic/analytics", icon: LayoutDashboard },
    { name: "Patients", href: "/clinic/patients", icon: Users },
    { name: "Admin", href: "/clinic/admin", icon: Settings },
];

export function ClinicSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 hidden md:flex flex-col">
            <div className="p-8 pb-4">
                <div className="bg-slate-900 text-white px-3 py-1 rounded w-fit text-xs font-bold uppercase tracking-wider mb-2">Provider Portal</div>
                <h1 className="text-xl font-semibold text-slate-900">Southern Utah ENT</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 py-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-slate-300" : "text-slate-500")} />
                                {item.name}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-border bg-slate-50/50">
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </Link>
            </div>
        </aside>
    );
}
