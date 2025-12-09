export type VisitType =
    | "new_patient"
    | "follow_up"
    | "urgent"
    | "annual_checkup"
    | "audiology_exam"
    | "allergy_shot"
    | "surgery_consult";

export type LocationId = "st_george" | "provo";

export interface VisitRule {
    type: VisitType;
    label: string;
    durationMinutes: number;
    requiresProvider?: boolean; // If false, can be with nurse/tech (e.g., allergy shot)
    description: string;
}

export interface ClinicLocation {
    id: LocationId;
    name: string;
    address: string;
}

export interface FamilyMember {
    id: string;
    name: string;
    relation: "Self" | "Spouse" | "Child" | "Parent" | "Other";
    dob: string;
}

export interface TimeSlot {
    start: string; // ISO string
    end: string;   // ISO string
    providerId?: string;
    locationId: LocationId;
    isDoubleBooked?: boolean; // For urgent override
}

export interface WaitlistEntry {
    id: string;
    patientId: string; // or family member ID
    visitType: VisitType;
    preferredDays: string[]; // ["Mon", "Wed"]
    timeRange: "AM" | "PM" | "Any";
    status: "Active" | "Notified" | "Fulfilled";
}

export const VISIT_TYPES: VisitRule[] = [
    { type: "new_patient", label: "New Patient Visit", durationMinutes: 45, requiresProvider: true, description: "First time visit for a new issue." },
    { type: "follow_up", label: "Follow-up", durationMinutes: 15, requiresProvider: true, description: "Review progress or test results." },
    { type: "urgent", label: "Urgent/Sick Visit", durationMinutes: 15, requiresProvider: true, description: "Sudden onset of symptoms (ear pain, sinus infection)." },
    { type: "annual_checkup", label: "Annual Checkup", durationMinutes: 30, requiresProvider: true, description: "Routine yearly examination." },
    { type: "audiology_exam", label: "Hearing Test", durationMinutes: 60, requiresProvider: false, description: "Comprehensive hearing evaluation with audiologist." },
    { type: "allergy_shot", label: "Allergy Shot", durationMinutes: 10, requiresProvider: false, description: "Routine immunotherapy injection." },
    { type: "surgery_consult", label: "Surgery Consultation", durationMinutes: 45, requiresProvider: true, description: "Discuss potential surgical options." },
];

export const LOCATIONS: ClinicLocation[] = [
    { id: "st_george", name: "St. George Main Clinic", address: "1490 E Foremaster Dr, Suite 320" },
    { id: "provo", name: "Provo Satellite Office", address: "100 N University Ave" }
];
