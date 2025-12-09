"use client";

import { Users, Calendar, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClinicDashboardPage() {
    return (
        <div className="min-h-screen bg-zinc-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-border">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-semibold text-foreground">Clinic Dashboard</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-8">Dr. Marcus Thorne • Otolaryngology</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                            Status: Online
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-foreground">12</span>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Patients Today</h3>
                        <p className="text-xs text-green-600 mt-1">+2 from yesterday</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-foreground">4</span>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Pending Requests</h3>
                        <p className="text-xs text-muted-foreground mt-1">Review needed</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-foreground">98%</span>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Patient Satisfaction</h3>
                        <p className="text-xs text-green-600 mt-1">Top 5% in Region</p>
                    </div>
                </div>

                {/* Today's Schedule (Simplified) */}
                <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="font-semibold text-foreground">Today&apos;s Schedule</h3>
                    </div>
                    <div className="divide-y divide-border">
                        {[
                            { time: "09:00 AM", patient: "Sarah Jenkins", type: "Follow-up", status: "Checked In" },
                            { time: "10:30 AM", patient: "Michael Ross", type: "New Patient", status: "On Time" },
                            { time: "01:00 PM", patient: "Emma Watson", type: "Consultation", status: "Late" },
                        ].map((appt, idx) => (
                            <div key={idx} className="p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-medium text-muted-foreground w-20">{appt.time}</span>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{appt.patient}</h4>
                                        <p className="text-xs text-muted-foreground">{appt.type}</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${appt.status === "Checked In" ? "bg-green-50 text-green-700 border-green-200" :
                                    appt.status === "Late" ? "bg-red-50 text-red-700 border-red-200" :
                                        "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}>
                                    {appt.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
