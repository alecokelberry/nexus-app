"use client";

import { useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { LOCATIONS, VisitType, LocationId, TimeSlot } from "@/types/scheduling";
import { mockProviders } from "@/data/mockPatient";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock, User, ChevronRight, Check, AlertCircle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingWizardProps {
    onClose: () => void;
    onComplete: () => void;
}

export function BookingWizard({ onClose, onComplete }: BookingWizardProps) {
    const { familyMembers, activePatientId, setActivePatientId, visitTypes, generateSlots, scheduleAppointment, addToWaitlist } = useScheduling();

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedVisitType, setSelectedVisitType] = useState<VisitType | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<LocationId>("st_george");
    const [selectedProvider, setSelectedProvider] = useState<string>(mockProviders[0].id);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filtered providers based on requirement
    // In a real app, providers would have linked locations. Mocking assuming all providers at all locations.

    const slots = selectedVisitType ? generateSlots(selectedDate, selectedVisitType, selectedLocation, selectedProvider) : [];

    const handleConfirm = async () => {
        if (!selectedSlot || !selectedVisitType) return;
        setIsSubmitting(true);
        await scheduleAppointment(selectedSlot, selectedVisitType, activePatientId);
        setIsSubmitting(false);
        onComplete();
    };

    const handleWaitlist = () => {
        if (!selectedVisitType) return;
        addToWaitlist({
            patientId: activePatientId,
            visitType: selectedVisitType,
            preferredDays: ["Mon", "Wed"], // mock
            timeRange: "Any"
        });
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold">Schedule Appointment</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                            <span className={step >= 1 ? "text-primary font-bold" : ""}>1. Patient</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className={step >= 2 ? "text-primary font-bold" : ""}>2. Reason</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className={step >= 3 ? "text-primary font-bold" : ""}>3. Time</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className={step >= 4 ? "text-primary font-bold" : ""}>4. Confirm</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Check className="w-5 h-5 rotate-45" /></button> {/* X icon hack */}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: SELECT PATIENT */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-primary" /> Who is this appointment for?
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {familyMembers.map(member => (
                                        <button
                                            key={member.id}
                                            onClick={() => {
                                                setActivePatientId(member.id);
                                                setStep(2);
                                            }}
                                            className={`p-6 rounded-2xl border text-left flex items-center gap-4 transition-all ${activePatientId === member.id
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                    : "border-slate-200 bg-white hover:border-primary/50"
                                                }`}
                                        >
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg">{member.name}</h4>
                                                <p className="text-sm text-slate-500">{member.relation} • {member.dob}</p>
                                            </div>
                                        </button>
                                    ))}
                                    <button className="p-6 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center gap-2 text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all min-h-[100px]">
                                        + Add Family Member
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: REASON & LOCATION */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">Reason for Visit</h3>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {visitTypes.map(v => (
                                                <button
                                                    key={v.type}
                                                    onClick={() => setSelectedVisitType(v.type)}
                                                    className={`p-4 rounded-xl border text-left transition-all ${selectedVisitType === v.type
                                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                            : "bg-white border-slate-200 hover:border-primary/50 text-slate-700"
                                                        }`}
                                                >
                                                    <div className="font-bold mb-1">{v.label}</div>
                                                    <div className={`text-xs ${selectedVisitType === v.type ? "text-primary-foreground/80" : "text-slate-500"}`}>
                                                        {v.durationMinutes} min • {v.description}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">Preferred Location</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {LOCATIONS.map(loc => (
                                                <button
                                                    key={loc.id}
                                                    onClick={() => setSelectedLocation(loc.id)}
                                                    className={`p-4 rounded-xl border flex items-start gap-3 text-left transition-all ${selectedLocation === loc.id
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                            : "bg-white border-slate-200 hover:border-primary/50"
                                                        }`}
                                                >
                                                    <MapPin className={`w-5 h-5 mt-1 ${selectedLocation === loc.id ? "text-primary" : "text-slate-400"}`} />
                                                    <div>
                                                        <div className="font-bold text-slate-900">{loc.name}</div>
                                                        <div className="text-sm text-slate-500">{loc.address}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            disabled={!selectedVisitType}
                                            onClick={() => setStep(3)}
                                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            Next Step <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: DATE & TIME */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="w-full lg:w-1/3">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Provider</label>
                                        <div className="space-y-2 mb-6">
                                            {mockProviders.map(p => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => setSelectedProvider(p.id)}
                                                    className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all ${selectedProvider === p.id
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                            : "bg-white border-slate-200 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <img src={p.image} className="w-10 h-10 rounded-full object-cover" />
                                                    <div className="text-left">
                                                        <div className="font-bold text-sm text-slate-900">{p.name}</div>
                                                        <div className="text-xs text-slate-500">{p.specialty}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {[0, 1, 2, 3, 4].map(d => {
                                                const date = addDays(new Date(), d);
                                                const isSel = date.toDateString() === selectedDate.toDateString();
                                                return (
                                                    <button
                                                        key={d}
                                                        onClick={() => setSelectedDate(date)}
                                                        className={`flex-shrink-0 w-16 h-20 rounded-xl border flex flex-col items-center justify-center transition-all ${isSel ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:border-primary"
                                                            }`}
                                                    >
                                                        <span className="text-xs uppercase font-bold opacity-60">{format(date, "EEE")}</span>
                                                        <span className="text-xl font-bold">{format(date, "d")}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                                            <span>Available Times</span>
                                            <span className="text-sm font-normal text-slate-500">{format(selectedDate, "EEEE, MMMM do")}</span>
                                        </h3>

                                        {slots.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {slots.map((slot, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`p-3 rounded-xl border text-center transition-all ${selectedSlot === slot
                                                                ? "bg-primary text-white border-primary shadow-md"
                                                                : "bg-white border-slate-200 hover:border-primary text-slate-700"
                                                            }`}
                                                    >
                                                        <span className="font-bold">{format(new Date(slot.start), "h:mm a")}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                                                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                                                <h4 className="font-bold text-amber-900 mb-2">No Appointments Available</h4>
                                                <p className="text-amber-700 text-sm mb-4">
                                                    There are no open slots for this provider on this day.
                                                </p>
                                                <button onClick={handleWaitlist} className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-bold hover:bg-amber-200 transition-colors">
                                                    Join Waitlist
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8">
                                    <button
                                        disabled={!selectedSlot}
                                        onClick={() => setStep(4)}
                                        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        Review details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: CONFIRM */}
                        {step === 4 && selectedSlot && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="max-w-md mx-auto">
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Appointment Summary</h3>

                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Patient</span>
                                                <span className="font-semibold text-slate-900">{familyMembers.find(f => f.id === activePatientId)?.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Visit Type</span>
                                                <span className="font-semibold text-slate-900">{visitTypes.find(v => v.type === selectedVisitType)?.label}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Provider</span>
                                                <span className="font-semibold text-slate-900">{mockProviders.find(p => p.id === selectedProvider)?.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Date & Time</span>
                                                <span className="font-semibold text-slate-900 text-right">
                                                    {format(new Date(selectedSlot.start), "PPP")}<br />
                                                    {format(new Date(selectedSlot.start), "h:mm a")}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Location</span>
                                                <span className="font-semibold text-slate-900 text-right">{LOCATIONS.find(l => l.id === selectedLocation)?.name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleConfirm}
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 disabled:opacity-70 transition-all flex justify-center items-center gap-2"
                                    >
                                        {isSubmitting ? "Confirming..." : "Confirm Appointment"}
                                        {!isSubmitting && <Check className="w-5 h-5" />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
