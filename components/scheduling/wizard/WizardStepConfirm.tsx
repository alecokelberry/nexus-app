import { motion } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";
import { format } from "date-fns";
import { mockProviders } from "@/data/mockPatient";
import { LOCATIONS, VisitType, LocationId, TimeSlot } from "@/types/scheduling";
import { useScheduling } from "@/context/SchedulingContext";

interface WizardStepConfirmProps {
    selectedSlot: TimeSlot;
    setSelectedSlot: (slot: TimeSlot) => void;
    activePatientId: string;
    selectedVisitType: VisitType | null;
    selectedProvider: string;
    selectedLocation: LocationId;
    isSubmitting: boolean;
    onConfirm: () => void;
}

export function WizardStepConfirm({
    selectedSlot,
    setSelectedSlot,
    activePatientId,
    selectedVisitType,
    selectedProvider,
    selectedLocation,
    isSubmitting,
    onConfirm
}: WizardStepConfirmProps) {
    const { familyMembers, visitTypes } = useScheduling();

    return (
        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Appointment Summary</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Patient</span>
                            <span className="font-semibold text-slate-900">{familyMembers.find(f => f.id === activePatientId)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Visit Type</span>
                            <span className="font-semibold text-slate-900">{visitTypes.find(v => v.type === selectedVisitType)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Provider</span>
                            <span className="font-semibold text-slate-900">{mockProviders.find(p => p.id === selectedProvider)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Date & Time</span>
                            <span className="font-semibold text-slate-900 text-right">
                                {format(new Date(selectedSlot.start), "PPP")}<br />
                                {format(new Date(selectedSlot.start), "h:mm a")}
                            </span>
                        </div>
                        {selectedSlot.recurrence === 'weekly' && (
                            <div className="flex justify-between text-blue-600 bg-blue-50 p-2 rounded-lg">
                                <span className="font-medium">Recurrence</span>
                                <span className="font-bold">Weekly (4 sessions)</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-slate-500">Location</span>
                            <span className="font-semibold text-slate-900 text-right">{LOCATIONS.find(l => l.id === selectedLocation)?.name}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm">Reminders</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-primary/50 transition-colors">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                                onChange={(e) => setSelectedSlot({ ...selectedSlot, reminders: { ...(selectedSlot.reminders || { email: false, sms: false, phone: false }), sms: e.target.checked } })}
                            />
                            <div className="flex-1">
                                <div className="font-bold text-sm text-slate-900">SMS / Text Message</div>
                                <div className="text-xs text-slate-500">Get text alerts 24h & 2h before</div>
                            </div>
                            <MessageCircle className="w-5 h-5 text-slate-400" />
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-primary/50 transition-colors">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                                onChange={(e) => setSelectedSlot({ ...selectedSlot, reminders: { ...(selectedSlot.reminders || { email: false, sms: false, phone: false }), email: e.target.checked } })}
                            />
                            <div className="flex-1">
                                <div className="font-bold text-sm text-slate-900">Email Reminders</div>
                                <div className="text-xs text-slate-500">Get calendar invite & details</div>
                            </div>
                        </label>
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 disabled:opacity-70 transition-all flex justify-center items-center gap-2"
                >
                    {isSubmitting ? "Confirming..." : "Confirm Appointment"}
                    {!isSubmitting && <Check className="w-5 h-5" />}
                </button>
            </div>
        </motion.div>
    );
}
