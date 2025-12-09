"use client";

import { useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { LOCATIONS, VisitType, LocationId, TimeSlot } from "@/types/scheduling";
import { mockProviders } from "@/data/mockPatient";
import { format } from "date-fns";
import { Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useData } from "@/context/DataContext";
import { WizardStepPatient } from "./wizard/WizardStepPatient";
import { WizardStepReason } from "./wizard/WizardStepReason";
import { WizardStepDateTime } from "./wizard/WizardStepDateTime";
import { WizardStepConfirm } from "./wizard/WizardStepConfirm";



interface BookingWizardProps {
    onClose: () => void;
    onComplete: () => void;
}

export function BookingWizard({ onClose, onComplete }: BookingWizardProps) {
    const { activePatientId, visitTypes, scheduleAppointment, addToWaitlist } = useScheduling();
    const { addAppointment } = useData();

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedVisitType, setSelectedVisitType] = useState<VisitType | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<LocationId>("st_george");
    const [selectedProvider, setSelectedProvider] = useState<string>(mockProviders[0].id);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filtered providers based on requirement
    // In a real app, providers would have linked locations. Mocking assuming all providers at all locations.

    const handleConfirm = async () => {
        if (!selectedSlot || !selectedVisitType) return;
        setIsSubmitting(true);
        const bookedSlots = await scheduleAppointment(selectedSlot, selectedVisitType, activePatientId);

        // Sync with DataContext (Appointment List)
        const visitRule = visitTypes.find(v => v.type === selectedVisitType);
        // const patientName = familyMembers.find(f => f.id === activePatientId)?.name || "Unknown"; // Unused
        const providerName = mockProviders.find(p => p.id === selectedProvider)?.name || "Unknown Provider";

        bookedSlots.forEach(slot => {
            addAppointment({
                date: slot.start,
                time: format(new Date(slot.start), "h:mm a"),
                provider: providerName,
                specialty: visitRule?.description || "General",
                reason: visitRule?.label || "Appointment",
                location: LOCATIONS.find(l => l.id === selectedLocation)?.name || "Main Clinic",
                notes: slot.reminders ? `Reminders: ${JSON.stringify(slot.reminders)}` : undefined
            });
        });

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
                            <WizardStepPatient onNext={() => setStep(2)} />
                        )}

                        {/* STEP 2: REASON & LOCATION */}
                        {step === 2 && (
                            <WizardStepReason
                                selectedVisitType={selectedVisitType}
                                setSelectedVisitType={setSelectedVisitType}
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                                onNext={() => setStep(3)}
                            />
                        )}

                        {/* STEP 3: DATE & TIME */}
                        {step === 3 && (
                            <WizardStepDateTime
                                selectedProvider={selectedProvider}
                                setSelectedProvider={setSelectedProvider}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                selectedSlot={selectedSlot}
                                setSelectedSlot={setSelectedSlot}
                                selectedVisitType={selectedVisitType}
                                selectedLocation={selectedLocation}
                                onNext={() => setStep(4)}
                                onWaitlist={handleWaitlist}
                            />
                        )}

                        {/* STEP 4: CONFIRM */}
                        {step === 4 && selectedSlot && (
                            <WizardStepConfirm
                                selectedSlot={selectedSlot}
                                setSelectedSlot={setSelectedSlot}
                                activePatientId={activePatientId}
                                selectedVisitType={selectedVisitType}
                                selectedProvider={selectedProvider}
                                selectedLocation={selectedLocation}
                                isSubmitting={isSubmitting}
                                onConfirm={handleConfirm}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
