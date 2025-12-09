export const clinicData = {
    // 1. Staff Members
    staff: [
        { id: "s1", name: "Dr. Marcus Thorne", role: "Provider", color: "bg-blue-100 text-blue-700 border-blue-200" },
        { id: "s2", name: "Dr. Elena Vance", role: "Provider", color: "bg-purple-100 text-purple-700 border-purple-200" },
        { id: "s3", name: "Sarah Jenkins", role: "Nurse", color: "bg-green-100 text-green-700 border-green-200" },
        { id: "s4", name: "Front Desk", role: "Admin", color: "bg-slate-100 text-slate-700 border-slate-200" },
    ],

    // 2. Analytics Data
    analytics: {
        revenueRec: [
            { month: "Jan", value: 45000 },
            { month: "Feb", value: 52000 },
            { month: "Mar", value: 48000 },
            { month: "Apr", value: 61000 },
            { month: "May", value: 55000 },
            { month: "Jun", value: 67000 },
        ],
        noShowRate: 4.2, // percent
        onlineBooking: 68, // percent
        revenueRecovered: 12500, // dollars
    },

    // 3. Audit Log (HIPAA)
    auditLog: [
        { id: "log_1", action: "Record Access", user: "Dr. Marcus Thorne", details: "Viewed Patient #8392", time: "2 mins ago", type: "info" },
        { id: "log_2", action: "Fee Waived", user: "Front Desk", details: "Waived late fee for Patient #8392", time: "1 hour ago", type: "warning" },
        { id: "log_3", action: "Login Success", user: "Dr. Elena Vance", details: "IP: 192.168.1.42", time: "2 hours ago", type: "info" },
        { id: "log_4", action: "Export Data", user: "Admin", details: "Exported monthly billing report", time: "5 hours ago", type: "alert" },
    ],

    // 4. Calendar Events
    schedule: [
        { id: "evt_1", title: "Patient Review", providerId: "s1", start: "09:00", end: "10:00", type: "appointment" },
        { id: "evt_2", title: "Staff Meeting", providerId: "s4", start: "08:30", end: "09:00", type: "internal" },
        { id: "evt_3", title: "Surgery Prep", providerId: "s1", start: "11:00", end: "13:00", type: "appointment" },
        { id: "evt_4", title: "Hearing Tests", providerId: "s2", start: "09:00", end: "12:00", type: "appointment" },
    ],

    // 5. Admin Settings
    settings: {
        fees: {
            noShow: 50,
            lateCancel: 25,
            autoCharge: false
        },
        integrations: {
            insuranceVerify: true,
            ehrSync: true
        }
    },

    // 6. Messages
    messages: [
        { id: 1, sender: "Sarah Jenkins", text: "Dr. Thorne, patient in room 3 is ready.", time: "10:45 AM", read: false },
        { id: 2, sender: "Front Desk", text: "Insurance verified for tomorrow's surgery list.", time: "09:15 AM", read: true },
    ]
};
