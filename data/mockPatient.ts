export const patientData = {
    // 1. Core Profile Info
    profile: {
        id: "pat_demo_001",
        name: "Demo Patient",
        initials: "DP",
        email: "demo.patient@example.com",
        phone: "(555) 123-4567",
        dob: "1985-06-15",
        address: "123 Wellness Blvd, St. George, UT 84790",
        insurance: {
            provider: "SelectHealth",
            planId: "SH-DEMO-01",
            group: "GRP-TEST",
            status: "Active"
        },
        avatarUrl: "https://i.pravatar.cc/150?u=demo"
    },

    // 2. Dashboard Status
    dashboard: {
        greeting: "Good afternoon, Demo",
        alerts: 1,
        nextAction: "Complete Pre-visit Forms",
    },

    // 3. Appointments Data
    appointments: {
        upcoming: [
            {
                id: "appt_101",
                date: "2025-12-14", // Updated to Dec
                time: "2:00 PM",
                provider: "Dr. Marcus Thorne",
                specialty: "Otolaryngology (ENT)",
                reason: "Sinus Pressure & Follow-up",
                location: "Provo Clinic - Suite 200",
                status: "Confirmed" as const,
                canCheckIn: true,
                image: "/doctors/thorne.jpg"
            }
        ],
        past: [
            {
                id: "appt_099",
                date: "2025-08-22",
                time: "10:30 AM",
                provider: "Dr. Elena Vance",
                specialty: "Audiology",
                reason: "Annual Hearing Exam",
                location: "Provo Clinic - Suite 204",
                status: "Completed" as const,
                notes: "Patient reported mild tinnitus in left ear."
            }
        ]
    },

    // 4. Billing & Financials
    billing: {
        currentBalance: 45.00,
        currency: "USD",
        dueDate: "2025-12-30", // Updated to Dec
        invoices: [
            {
                id: "inv_5521",
                date: "2025-08-22",
                description: "Comprehensive Audiometry (92557)",
                total: 120.00,
                insuranceCovered: 75.00,
                patientOwes: 45.00,
                status: "Pending"
            },
            {
                id: "inv_5010",
                date: "2025-05-10",
                description: "Office Visit - Established (99213)",
                total: 150.00,
                insuranceCovered: 130.00,
                patientOwes: 20.00,
                status: "Paid"
            }
        ],
        paymentMethods: [
            {
                id: "pm_1",
                type: "Visa",
                last4: "4242",
                expiry: "12/26",
                isDefault: true
            }
        ]
    },

    // 5. Medical Records & Results
    records: [
        {
            id: "rec_001",
            type: "Lab Result",
            title: "Allergy Skin Panel",
            date: "2025-05-12",
            doctor: "Dr. Marcus Thorne",
            status: "Abnormal",
            summary: "High sensitivity to cedar and ragweed.",
            downloadUrl: "#"
        },
        {
            id: "rec_002",
            type: "Audiogram",
            title: "Pure Tone Audiometry",
            date: "2025-08-22",
            doctor: "Dr. Elena Vance",
            status: "Normal",
            summary: "Hearing thresholds within normal limits.",
            downloadUrl: "#"
        }
    ],

    // 6. Clinical Data (New Phase 13)
    clinical: {
        medications: [
            { id: "med_1", name: "Fluticasone Propionate", dosage: "50mcg", frequency: "2 sprays daily", refillsRemaining: 3, lastFilled: "2025-11-01", status: "Active" },
            { id: "med_2", name: "Zyrtec (Cetirizine)", dosage: "10mg", frequency: "1 tablet daily", refillsRemaining: 0, lastFilled: "2025-10-15", status: "Active" },
            { id: "med_3", name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", refillsRemaining: 0, lastFilled: "2025-05-10", status: "Discontinued" }
        ],
        allergies: [
            { id: "alg_1", substance: "Penicillin", reaction: "Hives", severity: "Moderate" },
            { id: "alg_2", substance: "Peanuts", reaction: "Anaphylaxis", severity: "Severe" },
            { id: "alg_3", substance: "Cedar Pollen", reaction: "Rhinitis", severity: "Mild" }
        ],
        conditions: [
            { id: "con_1", name: "Allergic Rhinitis", status: "Active", onset: "2018-03-10" },
            { id: "con_2", name: "Mild Sleep Apnea", status: "Active", onset: "2023-11-05" },
            { id: "con_3", name: "Acute Sinusitis", status: "Resolved", onset: "2025-05-01" }
        ],
        immunizations: [
            { id: "imm_1", name: "Influenza (Flu)", date: "2025-10-01", status: "Completed" },
            { id: "imm_2", name: "Tdap", date: "2020-05-15", status: "Completed" },
            { id: "imm_3", name: "COVID-19 Booster", date: "2024-11-10", status: "Completed" }
        ],
        vitals: [
            { date: "2025-12-01", type: "Blood Pressure", value: "118/78", unit: "mmHg" },
            { date: "2025-12-01", type: "Weight", value: "175", unit: "lbs" },
            { date: "2025-08-22", type: "Blood Pressure", value: "122/80", unit: "mmHg" },
            { date: "2025-08-22", type: "Weight", value: "178", unit: "lbs" }
        ],
        labTrends: {
            "cholesterol": [
                { date: "2023-01-10", value: 185 },
                { date: "2024-01-15", value: 195 },
                { date: "2025-01-20", value: 190 }
            ],
            "a1c": [
                { date: "2023-01-10", value: 5.4 },
                { date: "2024-01-15", value: 5.5 },
                { date: "2025-01-20", value: 5.3 }
            ]
        }
    },

    // 7. Available Providers
    availableProviders: [
        {
            id: "dr_thorne",
            name: "Dr. Marcus Thorne",
            title: "MD, FACS",
            specialty: "Sinus & Sleep Specialist",
            bio: "Board-certified otolaryngologist specializing in balloon sinuplasty and sleep apnea solutions.",
            availability: ["Mon", "Wed", "Fri"],
            rating: 4.9
        },
        {
            id: "dr_vance",
            name: "Dr. Elena Vance",
            title: "Au.D.",
            specialty: "Clinical Audiologist",
            bio: "Expert in diagnostic hearing evaluations and advanced hearing aid technology.",
            availability: ["Tue", "Thu"],
            rating: 5.0
        }
    ],

    // 8. Engagement & Retention (New)
    engagement: {
        broadcasts: [
            {
                id: "bc_1",
                type: "info", // info, warning, success
                title: "Flu Shot Clinic Now Open",
                message: "Walk-in flu shots available every Friday in October. No appointment needed!",
                active: true,
                dismissable: true
            }
        ],
        surveys: [
            {
                id: "srv_1",
                type: "post-visit",
                title: "How was your recent visit?",
                description: "Dr. Thorne would love your feedback on your sinus procedure.",
                status: "pending", // pending, completed
                dueDate: "2025-12-20"
            }
        ],
        campaigns: [
            {
                id: "camp_1",
                type: "recall",
                title: "Annual Hearing Test Due",
                description: "It's been 12 months since your last audiogram. Schedule now to track your hearing health.",
                actionLink: "/appointments",
                status: "active"
            }
        ]
    }
};

// Aliases for compatibility with existing components that expect 'mockPatient'
export const mockPatient = {
    id: patientData.profile.id,
    name: patientData.profile.name,
    nextAppointment: patientData.appointments.upcoming[0],
    balance: patientData.billing.currentBalance,
    recentResults: patientData.records.map(r => ({
        id: r.id,
        title: r.title,
        date: r.date,
        status: r.status === "Normal" ? "Ready" : "Reviewed" // Simple mapping
    })),
    // Expose deep objects for new pages
    billing: patientData.billing,
    profile: patientData.profile,
    records: patientData.records,
    clinical: patientData.clinical,
    engagement: patientData.engagement
};

export const mockProviders = patientData.availableProviders.map(p => ({
    id: p.id,
    name: p.name,
    specialty: p.specialty,
    image: `/doctors/${p.name.split(" ")[1].toLowerCase()}.jpg`, // minimalistic image path logic fallback
    availability: {
        "2025-12-09": ["09:00", "11:00", "14:00"], // Mapping simple array to map for compatibility
        "2025-12-10": ["10:00", "13:30", "15:00"],
        "2025-12-11": ["09:00", "11:30", "16:00"]
    }
}));
