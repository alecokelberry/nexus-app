"use client";

import { useState } from "react";
import { clinicData } from "@/data/mockClinic";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function SchedulePage() {
    const { staff, schedule } = clinicData;
    const [viewDate] = useState("Today, Dec 8"); // Removed unused setViewDate

    // Hours to display (8am - 5pm)
    const hours = Array.from({ length: 10 }, (_, i) => i + 8);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Calendar Toolbar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900">{viewDate}</h2>
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                        <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
                        <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
                    </div>
                </div>

                {/* Provider Legend */}
                <div className="flex items-center gap-3">
                    {staff.filter(s => s.role === "Provider").map(s => (
                        <div key={s.id} className="flex items-center gap-2 text-xs font-medium">
                            <span className={`w-3 h-3 rounded-full ${s.color.split(" ")[0]}`} />
                            {/* Extract bg color - comments should be braces */}
                            {s.name}
                        </div>
                    ))}
                    <button className="ml-4 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-y-auto relative">
                <div className="flex min-w-[800px]">
                    {/* Time Column */}
                    <div className="w-16 flex-shrink-0 border-r border-slate-100 bg-slate-50/50">
                        {hours.map(h => (
                            <div key={h} className="h-32 text-xs text-slate-400 font-medium text-right pr-2 pt-2 relative">
                                {h > 12 ? h - 12 : h} {h >= 12 ? 'PM' : 'AM'}
                                <div className="absolute top-0 right-0 w-2 h-[1px] bg-slate-200" />
                            </div>
                        ))}
                    </div>

                    {/* Columns per Provider */}
                    <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100 relative">
                        {[staff[0], staff[1]].map((provider) => ( // Removed unused 'i'
                            <div key={provider.id} className="relative">
                                {/* Grid Lines */}
                                {hours.map(h => (
                                    <div key={h} className="h-32 border-b border-slate-50" />
                                ))}

                                {/* Events */}
                                {schedule.filter(e => e.providerId === provider.id).map(evt => {
                                    // Calculate position
                                    const startHour = parseInt(evt.start.split(":")[0]);
                                    const top = (startHour - 8) * 128 + (parseInt(evt.start.split(":")[1]) / 60) * 128; // 128px per hour
                                    const duration = (parseInt(evt.end.split(":")[0]) - startHour) + (parseInt(evt.end.split(":")[1]) - parseInt(evt.start.split(":")[1])) / 60;
                                    const height = duration * 128;

                                    return (
                                        <motion.div
                                            key={evt.id}
                                            drag
                                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 500 }}
                                            dragElastic={0.1}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{ top: `${top}px`, height: `${height}px` }}
                                            className={`absolute left-2 right-2 rounded-xl p-3 border-l-4 text-xs cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow z-10 ${provider.color // Use provider color scheme
                                                }`}
                                        >
                                            <div className="font-bold">{evt.title}</div>
                                            <div className="opacity-80">{evt.start} - {evt.end}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
