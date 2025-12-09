"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { motion } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-50/50">
            {/* Desktop Sidebar - Hidden on Mobile */}
            <div className="hidden md:block fixed top-0 left-0 h-full z-30">
                <Sidebar
                    isCollapsed={isCollapsed}
                    onToggle={() => setIsCollapsed(!isCollapsed)}
                />
            </div>

            {/* Main Content Area */}
            <motion.main
                layout
                className="min-h-screen"
                animate={{
                    marginLeft: isCollapsed ? 80 : 256,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ marginLeft: 0 }}
            >
                {/* Mobile: No margin, extra bottom padding for Nav */}
                <div className="md:ml-0 p-4 pb-24 md:p-8 lg:p-12 max-w-7xl mx-auto h-full">
                    {children}
                </div>
            </motion.main>

            {/* Mobile Bottom Nav - Visible only on Mobile */}
            <MobileNav />

            {/* CSS Override for Motion Margin on Mobile */}
            <style jsx global>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
        </div>
    );
}
