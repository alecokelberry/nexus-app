"use client";

import { useData } from "@/context/DataContext";
import { format, isSameDay, startOfToday, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, X, Search, Filter, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingWizard } from "@/components/scheduling/BookingWizard";

export default function AppointmentsPage() {
    const { appointments, cancelAppointment, patientProfile, providers } = useData();
    const [filter, setFilter] = useState<"upcoming" | "past" | "cancelled">("upcoming");
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    // Sort appointments: Upcoming (asc), Past (desc)
    const sortedAppointments = [...appointments]
        .filter(appt => {
            if (filter === "cancelled") return appt.status === "Cancelled";
            if (appt.status === "Cancelled") return false;

            // Check if appt.date is valid ISO, if not try to parse or fallback
            let apptDate: Date;
            try {
                apptDate = parseISO(appt.date);
                if (isNaN(apptDate.getTime())) apptDate = new Date(appt.date);
            } catch (e) {
                apptDate = new Date(); // Fallback
            }

            const today = startOfToday();
            // Simple comparison
            const isPast = apptDate < today;

            return filter === "past" ? isPast : !isPast;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return filter === "past" ? dateB - dateA : dateA - dateB;
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Completed": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light text-slate-900">Appointments</h1>
                    <p className="text-slate-500 mt-1">Manage your visits and view history.</p>
                </div>
                <button
                    onClick={() => setIsWizardOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" /> New Appointment
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-white p-1 rounded-xl w-fit border border-slate-200 shadow-sm">
                {["upcoming", "past", "cancelled"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f
                                ? "bg-slate-900 text-white shadow-md relative z-10"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Appointments List */}
            <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                    {sortedAppointments.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200"
                        >
                            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">No {filter} appointments</h3>
                            <p className="text-slate-500">You don't have any appointments in this category.</p>
                        </motion.div>
                    ) : (
                        sortedAppointments.map((appt) => (
                            <motion.div
                                key={appt.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 relative overflow-hidden group"
                            >
                                {/* Left: DateTime */}
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-32 md:border-r border-slate-100 pr-6 shrink-0">
                                    <div className="text-center md:text-left">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{format(new Date(appt.date), "MMM")}</div>
                                        <div className="text-3xl font-light text-slate-900">{format(new Date(appt.date), "d")}</div>
                                        <div className="text-sm font-medium text-slate-500">{format(new Date(appt.date), "EEE")}</div>
                                    </div>
                                    <div className="hidden md:block w-px h-full bg-slate-100 mx-4" />
                                    <div className="bg-slate-50 px-3 py-1 rounded-lg text-sm font-semibold text-slate-700">
                                        {appt.time}
                                    </div>
                                </div>

                                {/* Middle: Details */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-2 ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">{appt.reason || "General Visit"}</h3>
                                            <p className="text-slate-500">{appt.specialty}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span className="font-medium text-slate-900">{appt.provider}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span>{appt.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex flex-row md:flex-col gap-2 justify-end items-center md:items-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
                                    {filter === "upcoming" && (
                                        <>
                                            <button className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors px-4 py-2 hover:bg-slate-50 rounded-lg w-full md:w-auto text-right">
                                                Reschedule
                                            </button>
                                            <button
                                                onClick={() => cancelAppointment(appt.id)}
                                                className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg w-full md:w-auto text-right"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {filter === "past" && (
                                        <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-4 py-2 hover:bg-primary/5 rounded-lg w-full md:w-auto text-right flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4" /> Book Again
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Wizard Modal */}
            <AnimatePresence>
                {isWizardOpen && (
                    <BookingWizard
                        onClose={() => setIsWizardOpen(false)}
                        onComplete={() => {
                            setIsWizardOpen(false);
                            // Refresh logic handled by context update
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
