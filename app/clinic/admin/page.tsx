"use client";

import { useState } from "react";
import { clinicData } from "@/data/mockClinic";
import { Shield, ToggleRight, ToggleLeft } from "lucide-react";

export default function AdminSettingsPage() {
    const { settings, auditLog } = clinicData;
    const [fees, setFees] = useState(settings.fees);

    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-2xl font-bold text-slate-900">Admin & Compliance</h1>

            {/* Fee Configuration */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                        <DollarSignIcon className="w-5 h-5 text-slate-500" />
                        Fee Settings
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">No-Show Fee ($)</label>
                            <input
                                type="number"
                                value={fees.noShow}
                                onChange={e => setFees({ ...fees, noShow: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Late Cancellation Fee ($)</label>
                            <input
                                type="number"
                                value={fees.lateCancel}
                                onChange={e => setFees({ ...fees, lateCancel: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <h3 className="font-semibold text-slate-900">Auto-Charge Fees</h3>
                            <p className="text-xs text-slate-500 max-w-[200px]">Automatically charge card on file for missed appointments.</p>
                        </div>
                        <button onClick={() => setFees({ ...fees, autoCharge: !fees.autoCharge })}>
                            {fees.autoCharge ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Integration Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Insurance Verification</h3>
                            <p className="text-xs text-green-600 font-medium">Active - Real-time</p>
                        </div>
                    </div>
                    <ToggleRight className="w-8 h-8 text-blue-500 cursor-pointer" />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <ActivityIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">EHR Synchronization</h3>
                            <p className="text-xs text-green-600 font-medium">Active - Epic Systems</p>
                        </div>
                    </div>
                    <ToggleRight className="w-8 h-8 text-purple-500 cursor-pointer" />
                </div>
            </div>

            {/* Audit Log */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-slate-900">HIPAA Audit Trail</h2>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-900">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {auditLog.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 text-slate-500">{log.time}</td>
                                    <td className="px-6 py-3 font-medium text-slate-900">{log.user}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${log.type === "info" ? "bg-blue-50 text-blue-600" :
                                            log.type === "warning" ? "bg-amber-50 text-amber-600" :
                                                "bg-red-50 text-red-600"
                                            }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-600">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
