import { motion } from "framer-motion";
import { Clock, AlertCircle, ChevronRight } from "lucide-react";
import { format, addDays } from "date-fns";
import Image from "next/image";
import { mockProviders } from "@/data/mockPatient";
import { TimeSlot, VisitType, LocationId } from "@/types/scheduling";
import { useScheduling } from "@/context/SchedulingContext";

interface WizardStepDateTimeProps {
    selectedProvider: string;
    setSelectedProvider: (id: string) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    selectedSlot: TimeSlot | null;
    setSelectedSlot: (slot: TimeSlot | null) => void;
    selectedVisitType: VisitType | null;
    selectedLocation: LocationId;
    onNext: () => void;
    onWaitlist: () => void;
}

export function WizardStepDateTime({
    selectedProvider,
    setSelectedProvider,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    selectedVisitType,
    selectedLocation,
    onNext,
    onWaitlist
}: WizardStepDateTimeProps) {
    const { generateSlots, visitTypes } = useScheduling();
    const slots = selectedVisitType ? generateSlots(selectedDate, selectedVisitType, selectedLocation, selectedProvider) : [];

    return (
        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Provider</label>
                    <div className="space-y-2 mb-6">
                        {mockProviders.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedProvider(p.id)}
                                className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all ${selectedProvider === p.id
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "bg-white border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-sm text-slate-900">{p.name}</div>
                                    <div className="text-xs text-slate-500">{p.specialty}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                        {[0, 1, 2, 3, 4].map(d => {
                            const date = addDays(new Date(), d);
                            const isSel = date.toDateString() === selectedDate.toDateString();
                            return (
                                <button
                                    key={d}
                                    onClick={() => setSelectedDate(date)}
                                    className={`flex-shrink-0 w-16 h-20 rounded-xl border flex flex-col items-center justify-center transition-all ${isSel ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:border-primary"
                                        }`}
                                >
                                    <span className="text-xs uppercase font-bold opacity-60">{format(date, "EEE")}</span>
                                    <span className="text-xl font-bold">{format(date, "d")}</span>
                                </button>
                            )
                        })}
                    </div>

                    {visitTypes.find(v => v.type === selectedVisitType)?.allowRecurrence && (
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Recurring Appointment</h4>
                                    <p className="text-xs text-slate-500 mb-2">Schedule this visit weekly?</p>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            onChange={(e) => {
                                                if (selectedSlot) {
                                                    setSelectedSlot({
                                                        ...selectedSlot,
                                                        recurrence: e.target.checked ? 'weekly' : 'none'
                                                    });
                                                }
                                            }}
                                            checked={selectedSlot?.recurrence === 'weekly'}
                                        />
                                        <span className="text-sm font-medium text-slate-700">Repeat Weekly (4 weeks)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                        <span>Available Times</span>
                        <span className="text-sm font-normal text-slate-500">{format(selectedDate, "EEEE, MMMM do")}</span>
                    </h3>

                    {slots.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {slots.map((slot, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-3 rounded-xl border text-center transition-all ${selectedSlot?.start === slot.start
                                        ? "bg-primary text-white border-primary shadow-md"
                                        : "bg-white border-slate-200 hover:border-primary text-slate-700"
                                        }`}
                                >
                                    <span className="font-bold">{format(new Date(slot.start), "h:mm a")}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                            <h4 className="font-bold text-amber-900 mb-2">No Appointments Available</h4>
                            <p className="text-amber-700 text-sm mb-4">
                                There are no open slots for this provider on this day.
                            </p>

                            <div className="bg-white/50 rounded-lg p-4 text-left max-w-xs mx-auto mb-4">
                                <label className="block text-xs font-bold text-amber-900 mb-1">Waitlist Preferences</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-amber-800">
                                        <input type="checkbox" defaultChecked className="text-amber-600 rounded" />
                                        Any Provider
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-amber-800">
                                        <input type="checkbox" defaultChecked className="text-amber-600 rounded" />
                                        Notify me via SMS
                                    </label>
                                </div>
                            </div>

                            <button onClick={onWaitlist} className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-bold hover:bg-amber-200 transition-colors w-full max-w-xs">
                                Join Waitlist
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button
                    disabled={!selectedSlot}
                    onClick={onNext}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    Review details <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
