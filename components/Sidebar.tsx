"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    FileText,
    CreditCard,
    Settings,
    Menu,
    ChevronLeft,
    Activity,
    Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Telehealth", href: "/telehealth", icon: Video },
    { name: "Medical Records", href: "/records", icon: FileText },
    { name: "Bill Pay", href: "/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-screen bg-white border-r border-border flex flex-col fixed left-0 top-0 z-40 text-foreground shadow-sm"
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm tracking-tight text-primary">
                            SOUTHERN UTAH ENT
                        </span>
                    </motion.div>
                )}
                <button
                    onClick={onToggle}
                    className={cn(
                        "p-2 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground",
                        isCollapsed && "mx-auto"
                    )}
                >
                    {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="font-medium text-sm whitespace-nowrap overflow-hidden"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Active Indicator for collapsed state */}
                            {isActive && isCollapsed && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet (Bottom) */}
            <div className="p-4 border-t border-border">
                <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <span className="text-xs font-bold">JD</span>
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">Jane Doe</p>
                            <p className="text-xs text-muted-foreground truncate">Patient ID: #8392</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
