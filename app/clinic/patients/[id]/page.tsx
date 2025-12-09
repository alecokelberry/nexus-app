"use client";

import { useData } from "@/context/DataContext";
import { User, Calendar, FileText, ChevronLeft, Clock, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PatientDetailPage() {
    const { patientProfile, appointments } = useData();
    const params = useParams();
    // In a real app, we'd fetch patient by ID. 
    // For demo, we just show the "active" demo patient or a mock one if ID differs.
    // If ID matches demo, show context state (so we can see live updates e.g. new appts).

    // We'll just display the shared context data for "Demo Patient" for this walkthrough.
    const patientStr = patientProfile.id === "pat_demo_001" || true ? patientProfile : null;

    if (!patientStr) return <div>Patient not found</div>;

    const activeAppointments = appointments.filter(a => a.status !== "Cancelled");

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/clinic/patients" className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{patientProfile.name}</h1>
                    <p className="text-slate-500 text-sm">Patient ID: {patientProfile.id} • DOB: {patientProfile.dob}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Col: Vitals & Info (Mock) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden">
                                <img src={patientProfile.avatarUrl} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <span className="block font-medium text-slate-900">Vitals (Latest)</span>
                                <span className="text-xs text-slate-500">Recorded Today</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-slate-500 text-sm">Blood Pressure</span>
                                <span className="font-semibold text-slate-900">120/80</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-slate-500 text-sm">Heart Rate</span>
                                <span className="font-semibold text-slate-900">72 bpm</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-slate-500 text-sm">Weight</span>
                                <span className="font-semibold text-slate-900">165 lbs</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" /> Allergies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">Penicillin</span>
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">Peanuts</span>
                        </div>
                    </div>
                </div>

                {/* Right Col: Tabs / History */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Appointments Tab */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" /> Upcoming Appointments
                            </h3>
                            <button className="text-sm text-primary font-medium hover:underline">+ Schedule</button>
                        </div>

                        <div className="space-y-4">
                            {activeAppointments.map(appt => (
                                <div key={appt.id} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex-col flex items-center justify-center w-14 h-14 bg-white rounded-lg shadow-sm border border-slate-200 text-center">
                                        <span className="text-xs font-bold text-slate-500 uppercase">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-lg font-bold text-slate-900">{new Date(appt.date).getDate()}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-semibold text-slate-900">{appt.reason}</h4>
                                            <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-slate-200">{appt.status}</span>
                                        </div>
                                        <p className="text-sm text-slate-500">{appt.provider} • {appt.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Records Tab */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" /> Recent Records
                            </h3>
                            <button className="text-sm text-primary font-medium hover:underline">View All</button>
                        </div>
                        <div className="space-y-3">
                            {/* Mock Records List from mock data structure if available, or static fallback for demo consistency */}
                            {[
                                { title: "Audiogram Result", date: "Aug 22, 2025", type: "Test Result" },
                                { title: "Lab: Allergy Panel", date: "May 12, 2025", type: "Lab Report" }
                            ].map((rec, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-slate-700">{rec.title}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">{rec.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
