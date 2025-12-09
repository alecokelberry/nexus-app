"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { patientData, mockProviders } from "@/data/mockPatient";

// Define Types (simplified from mock data structure)
export type Appointment = {
    id: string;
    date: string;
    time: string;
    provider: string;
    specialty: string;
    reason: string;
    location: string;
    status: "Confirmed" | "Completed" | "Cancelled";
    canCheckIn?: boolean;
    image?: string;
    notes?: string;
};

export type PatientProfile = typeof patientData.profile;

interface DataContextType {
    patientProfile: PatientProfile;
    clinical: typeof patientData.clinical;
    appointments: Appointment[];
    providers: typeof mockProviders;
    updateProfile: (newProfile: Partial<PatientProfile>) => void;
    addAppointment: (appt: Omit<Appointment, "id" | "status">) => void;
    updateAppointment: (id: string, updates: Partial<Appointment>) => void;
    cancelAppointment: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    // Initialize state with specific parts of patientData
    // In a real app, this would fetch from an API
    const [patientProfile, setPatientProfile] = useState<PatientProfile>(patientData.profile);

    // Combine upcoming and past for a full list
    const [appointments, setAppointments] = useState<Appointment[]>([
        ...(patientData.appointments.upcoming as unknown as Appointment[]),
        ...(patientData.appointments.past as unknown as Appointment[])
    ]); // Fixed: Accessing appointments from patientData directly

    const providers = mockProviders;

    // Sync with LocalStorage (Mock Persistence)
    useEffect(() => {
        const storedProfile = localStorage.getItem("nexus_profile");
        const storedAppts = localStorage.getItem("nexus_appointments");

        if (storedProfile) {
            try {
                setPatientProfile(JSON.parse(storedProfile));
            } catch (e) {
                console.error("Failed to parse profile", e);
            }
        }
        if (storedAppts) {
            try {
                setAppointments(JSON.parse(storedAppts));
            } catch (e) {
                console.error("Failed to parse appointments", e);
            }
        }
    }, []);

    // Prevent hydration mismatch by not rendering provider content until mounted
    // However, for this context provider, we can just allow default values initially
    // and let them update after mount, which is standard for client-side only data.

    useEffect(() => {
        localStorage.setItem("nexus_profile", JSON.stringify(patientProfile));
    }, [patientProfile]);

    useEffect(() => {
        localStorage.setItem("nexus_appointments", JSON.stringify(appointments));
    }, [appointments]);

    // Actions
    const updateProfile = (newProfile: Partial<PatientProfile>) => {
        setPatientProfile((prev) => ({ ...prev, ...newProfile }));
    };

    const addAppointment = (appt: Omit<Appointment, "id" | "status">) => {
        const newAppt: Appointment = {
            ...appt,
            id: `appt_${Date.now()}`,
            status: "Confirmed",
        };
        setAppointments((prev) => [...prev, newAppt]);
    };

    const updateAppointment = (id: string, updates: Partial<Appointment>) => {
        setAppointments((prev) =>
            prev.map((appt) => (appt.id === id ? { ...appt, ...updates } : appt))
        );
    };

    const cancelAppointment = (id: string) => {
        updateAppointment(id, { status: "Cancelled" });
    };

    return (
        <DataContext.Provider
            value={{
                patientProfile,
                clinical: patientData.clinical,
                appointments,
                providers,
                updateProfile,
                addAppointment,
                updateAppointment,
                cancelAppointment,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
