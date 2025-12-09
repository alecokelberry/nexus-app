"use client";

import React, { createContext, useContext, useState } from "react";
import { FamilyMember, TimeSlot, VisitType, VISIT_TYPES, WaitlistEntry, LocationId } from "@/types/scheduling";
import { patientData } from "@/data/mockPatient";
import { addDays, setHours, setMinutes, isBefore } from "date-fns";

// Mock Family Data
const INITIAL_FAMILY: FamilyMember[] = [
    { id: patientData.profile.id, name: patientData.profile.name, relation: "Self", dob: patientData.profile.dob },
    { id: "fam_002", name: "Sarah Patient", relation: "Spouse", dob: "1987-02-14" },
    { id: "fam_003", name: "Timmy Patient", relation: "Child", dob: "2015-08-22" }
];

interface SchedulingContextType {
    familyMembers: FamilyMember[];
    activePatientId: string;
    setActivePatientId: (id: string) => void;
    visitTypes: typeof VISIT_TYPES;
    waitlist: WaitlistEntry[];
    addToWaitlist: (entry: Omit<WaitlistEntry, "id" | "status">) => void;
    removeFromWaitlist: (id: string) => void;
    generateSlots: (date: Date, visitType: VisitType, location: LocationId, providerId: string) => TimeSlot[];
    scheduleAppointment: (slot: TimeSlot, visitType: VisitType, patientId: string) => Promise<TimeSlot[]>;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: React.ReactNode }) {
    const [familyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY); // Removed unused setFamilyMembers
    const [activePatientId, setActivePatientId] = useState<string>(patientData?.profile?.id || "patient_123");
    const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
    const [appointments, setAppointments] = useState<TimeSlot[]>([]);

    const addToWaitlist = (entry: Omit<WaitlistEntry, "id" | "status">) => {
        const newEntry: WaitlistEntry = {
            ...entry,
            id: `wl_${Date.now()}`,
            status: "Active"
        };
        setWaitlist(prev => [...prev, newEntry]);
        // simulate async notification
        setTimeout(() => alert("Added to waitlist! We will text you (555) 123-4567 if a spot opens."), 500);
    };

    const removeFromWaitlist = (id: string) => {
        setWaitlist(prev => prev.filter(entry => entry.id !== id));
    };

    // ALGORITHM: Generate slots based on duration
    const generateSlots = (date: Date, visitType: VisitType, location: LocationId, providerId: string): TimeSlot[] => {
        const rule = VISIT_TYPES.find(v => v.type === visitType);
        if (!rule) return [];

        const slots: TimeSlot[] = [];
        const duration = rule.durationMinutes;

        // Surgery Consults only in afternoons (1 PM - 5 PM)
        let startHour = 9;
        const endHour = 17; // fixed prefer-const

        if (visitType === "surgery_consult") {
            startHour = 13; // 1 PM
        }

        // 3. GENERATE INTERVALS
        // Create slots every 15 or 30 mins depending on duration to maximize efficiency
        // For simple UX using 30 mins generally, 15 for urgent
        const stepMinutes = duration < 30 ? 15 : 30;

        let current = setMinutes(setHours(date, startHour), 0);
        const endDay = setMinutes(setHours(date, endHour), 0);

        while (isBefore(current, endDay)) {
            const hour = current.getHours();

            // Lunch Block (12-1)
            const isLunch = hour === 12;

            if (!isLunch) {
                const endTime = new Date(current.getTime() + duration * 60000);

                if (isBefore(endTime, endDay)) {
                    const slotStart = current.toISOString();
                    const slotEnd = endTime.toISOString();

                    // 4. COLLISION DETECTION
                    // Check if this slot overlaps with any existing appointment for this provider
                    const isBooked = appointments.some(appt => {
                        return appt.providerId === providerId &&
                            ((slotStart >= appt.start && slotStart < appt.end) ||
                                (slotEnd > appt.start && slotEnd <= appt.end) ||
                                (slotStart <= appt.start && slotEnd >= appt.end));
                    });

                    if (!isBooked) {
                        slots.push({
                            start: slotStart,
                            end: slotEnd,
                            locationId: location,
                            providerId
                        });
                    }
                }
            }
            current = new Date(current.getTime() + stepMinutes * 60000);
        }

        return slots;
    };

    const scheduleAppointment = async (slot: TimeSlot, visitType: VisitType, patientId: string) => {
        // Double check collision (race condition simulation)
        const isBooked = appointments.some(appt => {
            return appt.providerId === slot.providerId && appt.start === slot.start;
        });

        if (isBooked) return [];

        const newAppointments = [slot];

        // Handle Recurrence (Mock logic: add 4 weekly slots)
        if (slot.recurrence === 'weekly') {
            for (let i = 1; i <= 4; i++) {
                const nextStart = addDays(new Date(slot.start), i * 7);
                const nextEnd = addDays(new Date(slot.end), i * 7);
                newAppointments.push({
                    ...slot,
                    start: nextStart.toISOString(),
                    end: nextEnd.toISOString()
                });
            }
        }

        // Mock API call
        return new Promise<TimeSlot[]>((resolve) => {
            setTimeout(() => {
                setAppointments(prev => [...prev, ...newAppointments]);
                // Simulate sending reminders
                if (slot.reminders?.sms) {
                    console.log(`[Mock System] sending SMS to patient ${patientId} for ${slot.start}`);
                }
                resolve(newAppointments);
            }, 800);
        });
    };

    return (
        <SchedulingContext.Provider value={{
            familyMembers,
            activePatientId,
            setActivePatientId,
            visitTypes: VISIT_TYPES,
            waitlist,
            addToWaitlist,
            removeFromWaitlist,
            generateSlots,
            scheduleAppointment
        }}>
            {children}
        </SchedulingContext.Provider>
    );
}

export function useScheduling() {
    const context = useContext(SchedulingContext);
    if (context === undefined) {
        throw new Error("useScheduling must be used within a SchedulingProvider");
    }
    return context;
}
