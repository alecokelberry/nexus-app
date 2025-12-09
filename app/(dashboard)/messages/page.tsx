"use client";

import { useState } from "react";
import { Send, Bell, Smartphone, Mail, AlertTriangle, Check, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function MessagesPage() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "System", type: "SMS", text: "Appt Reminder: You have an appointment tomorrow at 9:00 AM with Dr. Thorne. Reply 'C' to confirm.", time: "Yesterday, 4:00 PM", direction: "inbound" },
        { id: 2, sender: "You", type: "SMS", text: "C", time: "Yesterday, 4:05 PM", direction: "outbound" },
        { id: 3, sender: "System", type: "SMS", text: "Thanks! Your appointment is confirmed.", time: "Yesterday, 4:05 PM", direction: "inbound" }
    ]);

    const [inputText, setInputText] = useState("");
    const [activeTab, setActiveTab] = useState<"sms" | "email">("sms");

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            sender: "You",
            type: "SMS",
            text: inputText,
            time: "Just now",
            direction: "outbound"
        }]);
        setInputText("");

        // Mock Auto-reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: "System",
                type: "SMS",
                text: "Thanks for your message. A coordinator will reply shortly.",
                time: "Just now",
                direction: "inbound"
            }]);
        }, 1000);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-3xl font-light text-slate-900">Communication Hub</h1>
                    <p className="text-slate-500">Manage your notifications and messages.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* SETTINGS CARD */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm overflow-y-auto">
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" /> Notification Preferences
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Smartphone className="w-5 h-5 text-slate-600" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900">SMS Reminders</div>
                                    <div className="text-slate-500">72h, 24h, 2h before</div>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Mail className="w-5 h-5 text-slate-600" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900">Email Updates</div>
                                    <div className="text-slate-500">Results, Bills, News</div>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Phone className="w-5 h-5 text-slate-600" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900">Automated Calls</div>
                                    <div className="text-slate-500">Urgent updates only</div>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mt-auto">
                        <div className="flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                            <div className="text-xs text-amber-800">
                                <strong>Note:</strong> Detailed medical results will not be sent via SMS for privacy compliance. Please log in to view them.
                            </div>
                        </div>
                    </div>
                </div>

                {/* MESSAGING INTERFACE */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab("sms")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "sms" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Secure SMS
                            </button>
                            <button
                                onClick={() => setActiveTab("email")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "email" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Email History
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Connected
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={msg.id}
                                className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] ${msg.direction === "outbound" ? "bg-primary text-white rounded-2xl rounded-tr-none shadow-lg shadow-primary/20" : "bg-white text-slate-700 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"} p-4 `}>
                                    <div className="text-[10px] opacity-70 mb-1 uppercase tracking-wider font-bold">{msg.sender} • {msg.time}</div>
                                    <div className="text-sm leading-relaxed">{msg.text}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type a message..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-2 p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center mt-2 text-xs text-slate-400">
                            Please do not send urgent medical emergencies here. Call 911.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
