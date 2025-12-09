"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    FileText,
    CreditCard,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Appts", href: "/appointments", icon: Calendar },
    { name: "Records", href: "/records", icon: FileText },
    { name: "Pay", href: "/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-white/50 pb-safe md:hidden">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                                isActive ? "text-primary" : "text-muted-foreground/60 hover:text-primary/70"
                            )}
                        >
                            {isActive && (
                                <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full shadow-[0_2px_8px_rgba(124,154,146,0.5)]" />
                            )}
                            <item.icon className={cn("w-6 h-6", isActive && "animate-pulse-slow")} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
