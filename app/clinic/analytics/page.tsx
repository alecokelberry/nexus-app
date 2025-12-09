"use client";

import { clinicData } from "@/data/mockClinic";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, CalendarCheck } from "lucide-react";

export default function AnalyticsPage() {
    const { analytics } = clinicData;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900">Practice Analytics</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Revenue Recovered", value: `$${analytics.revenueRecovered.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
                    { label: "No-Show Rate", value: `${analytics.noShowRate}%`, icon: Users, color: "text-red-500 bg-red-50" },
                    { label: "Online Booking", value: `${analytics.onlineBooking}%`, icon: CalendarCheck, color: "text-blue-600 bg-blue-50" },
                    { label: "Monthly Growth", value: "+12%", icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm">{stat.label}</h3>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart (Mock) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Recovery Trend</h3>
                    <div className="h-64 flex items-end gap-4 justify-between px-4">
                        {analytics.revenueRec.map((bar) => (
                            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="relative w-full max-w-[60px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(bar.value / 70000) * 100}%` }}
                                        className="w-full bg-slate-900 group-hover:bg-primary transition-colors"
                                    />
                                </div>
                                <span className="text-xs font-bold text-slate-400">{bar.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Patient Sources</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Online Search", val: 45, col: "bg-blue-500" },
                            { label: "Referrals", val: 30, col: "bg-purple-500" },
                            { label: "Social", val: 15, col: "bg-pink-500" },
                            { label: "Insurance", val: 10, col: "bg-slate-500" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm font-medium mb-1">
                                    <span className="text-slate-600">{item.label}</span>
                                    <span className="text-slate-900">{item.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.col} rounded-full`} style={{ width: `${item.val}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
