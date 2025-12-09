import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
import { useScheduling } from "@/context/SchedulingContext";
import { LOCATIONS, VisitType, LocationId } from "@/types/scheduling";

interface WizardStepReasonProps {
    selectedVisitType: VisitType | null;
    setSelectedVisitType: (type: VisitType) => void;
    selectedLocation: LocationId;
    setSelectedLocation: (id: LocationId) => void;
    onNext: () => void;
}

export function WizardStepReason({ selectedVisitType, setSelectedVisitType, selectedLocation, setSelectedLocation, onNext }: WizardStepReasonProps) {
    const { visitTypes } = useScheduling();

    return (
        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Reason for Visit</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {visitTypes.map(v => (
                            <button
                                key={v.type}
                                onClick={() => setSelectedVisitType(v.type)}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedVisitType === v.type
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "bg-white border-slate-200 hover:border-primary/50 text-slate-700"
                                    }`}
                            >
                                <div className="font-bold mb-1">{v.label}</div>
                                <div className={`text-xs ${selectedVisitType === v.type ? "text-primary-foreground/80" : "text-slate-500"}`}>
                                    {v.durationMinutes} min • {v.description}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Preferred Location</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {LOCATIONS.map(loc => (
                            <button
                                key={loc.id}
                                onClick={() => setSelectedLocation(loc.id)}
                                className={`p-4 rounded-xl border flex items-start gap-3 text-left transition-all ${selectedLocation === loc.id
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "bg-white border-slate-200 hover:border-primary/50"
                                    }`}
                            >
                                <MapPin className={`w-5 h-5 mt-1 ${selectedLocation === loc.id ? "text-primary" : "text-slate-400"}`} />
                                <div>
                                    <div className="font-bold text-slate-900">{loc.name}</div>
                                    <div className="text-sm text-slate-500">{loc.address}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        disabled={!selectedVisitType}
                        onClick={onNext}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
