"use client";

import { mockPatient } from "@/data/mockPatient";
import { Download, FileText, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function MedicalRecordsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light text-foreground mb-2">Medical Records</h1>
                    <p className="text-muted-foreground">All your results and clinical documents in one place.</p>
                </div>
                <div className="relative group w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {mockPatient.recentResults.map((record, index) => (
                    <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all duration-300 hover:border-primary/20"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-semibold text-lg text-foreground">{record.title}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${record.status === "Ready" || record.status === "Normal"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-blue-50 text-blue-700 border-blue-200"}`
                                    }>
                                        {record.status}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Date: <span className="text-foreground">{record.date}</span> • Doctor: <span className="text-foreground">Dr. Anderson</span>
                                </p>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-zinc-50 hover:bg-white hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </motion.div>
                ))}

                {/* Placeholder mock records to fill the page */}
                {[1, 2].map((_, i) => (
                    <motion.div
                        key={`mock-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="group bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all duration-300 hover:border-primary/20 opacity-60"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-foreground">Annual Physical Report {2023 - i}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Date: <span className="text-foreground">Dec 12, {2023 - i}</span> • Doctor: <span className="text-foreground">Dr. Thorne</span>
                                </p>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-zinc-50 hover:bg-white hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
