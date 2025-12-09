"use client";

import { useData } from "@/context/DataContext";
import { useScheduling } from "@/context/SchedulingContext";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Shield, Camera, Save, Users, Plus, X, LogOut, BellRing } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SettingsPage() {
    const { patientProfile, updateProfile } = useData();
    const { familyMembers } = useScheduling(); // Access family data
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<"profile" | "family" | "security" | "notifications">("profile");

    // Form State
    const [formData, setFormData] = useState(patientProfile);
    const [successMsg, setSuccessMsg] = useState("");

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
        setSuccessMsg("Profile updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-light text-slate-900">Account Settings</h1>
                <p className="text-slate-500 mt-1">Manage your profile, family, and preferences.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1 rounded-xl w-fit border border-slate-200 shadow-sm">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "profile" ? "bg-slate-900 text-white shadow-md relative z-10" : "text-slate-600 hover:bg-slate-50"}`}
                >
                    <User className="w-4 h-4" /> Personal Info
                </button>
                <button
                    onClick={() => setActiveTab("family")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "family" ? "bg-slate-900 text-white shadow-md relative z-10" : "text-slate-600 hover:bg-slate-50"}`}
                >
                    <Users className="w-4 h-4" /> Family Members
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "security" ? "bg-slate-900 text-white shadow-md relative z-10" : "text-slate-600 hover:bg-slate-50"}`}
                >
                    <Shield className="w-4 h-4" /> Security
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "notifications" ? "bg-slate-900 text-white shadow-md relative z-10" : "text-slate-600 hover:bg-slate-50"}`}
                >
                    <BellRing className="w-4 h-4" /> Notifications
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {activeTab === "profile" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-8 items-center bg-slate-50/50">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-2xl font-bold text-slate-900">{formData.name}</h2>
                                <p className="text-slate-500">{formData.email}</p>
                                <div className="flex gap-2 justify-center md:justify-start mt-4">
                                    {isEditing ? (
                                        <>
                                            <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                                                <Save className="w-4 h-4" /> Save Changes
                                            </button>
                                            <button onClick={() => setIsEditing(false)} className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className="bg-white border border-slate-200 text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            name="name"
                                            disabled={!isEditing}
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            name="email"
                                            disabled={!isEditing}
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            name="phone"
                                            disabled={!isEditing}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            name="address"
                                            disabled={!isEditing}
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "family" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Registered Dependents</h2>
                        </div>

                        {/* Family List */}
                        {familyMembers.map((member) => (
                            <div key={member.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center group hover:shadow-md transition-all gap-4">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-slate-500 text-lg border border-slate-200 group-hover:border-primary group-hover:text-primary transition-colors shadow-sm">
                                        {member.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">{member.relation}</span>
                                            <span>• DOB: {member.dob}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-primary font-semibold text-sm px-4 py-2 hover:bg-white rounded-lg transition-all w-full sm:w-auto">Edit Details</button>
                            </div>
                        ))}

                        <button className="w-full py-6 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 mt-4">
                            <Plus className="w-5 h-5" /> Add New Family Member
                        </button>
                    </motion.div>
                )}

                {activeTab === "security" && (
                    <div className="p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Security Settings</h3>
                        <p className="text-slate-500 max-w-sm mb-8">Manage your password, two-factor authentication, and connected devices.</p>
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                            Change Password
                        </button>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Notification Preferences</h2>
                            <p className="text-slate-500">Choose how you want to be notified about appointments and updates.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Appointment Reminders", desc: "Receive automated text messages 24h before your visit.", default: true },
                                { title: "Email Confirmations", desc: "Get detailed visit summaries and confirmation emails.", default: true },
                                { title: "Marketing & Newsletters", desc: "Stay updated with clinic news and health tips.", default: false },
                                { title: "Billing Alerts", desc: "Get notified when a new invoice is available.", default: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-all">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
                {successMsg && (
                    <div className="absolute top-0 left-0 w-full bg-green-100 text-green-700 px-6 py-3 text-center font-medium animate-pulse">
                        {successMsg}
                    </div>
                )}
            </div>

            <div className="flex justify-center pt-8">
                <Link href="/login" className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" /> Sign Out
                </Link>
            </div>
        </div>
    );
}
