"use client";

import { useData } from "@/context/DataContext";
import { Search } from "lucide-react";
import Link from "next/link";

export default function PatientsIndexPage() {
    const { patientProfile } = useData();

    // Mock additional patients for the list
    const patients = [
        patientProfile,
        {
            id: "pat_882001",
            name: "Michael Chen",
            dob: "1978-11-02",
            phone: "(435) 555-9921",
            status: "Follow-up",
            initials: "MC"
        },
        {
            id: "pat_882002",
            name: "Emily Davis",
            dob: "2015-03-22",
            phone: "(435) 555-4422",
            status: "New Patient",
            initials: "ED"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Patient Directory</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-slate-400" placeholder="Search patients..." />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">DOB</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {patients.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {p.initials}
                                        </div>
                                        <span className="font-semibold text-slate-900">{p.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Active</span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{p.dob}</td>
                                <td className="px-6 py-4 text-slate-600">{p.phone}</td>
                                <td className="px-6 py-4">
                                    <Link href={`/clinic/patients/${p.id}`} className="text-slate-600 hover:text-slate-900 font-medium">
                                        View Chart
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
