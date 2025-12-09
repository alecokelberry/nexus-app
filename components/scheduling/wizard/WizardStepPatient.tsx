import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useScheduling } from "@/context/SchedulingContext";

interface WizardStepPatientProps {
    onNext: () => void;
}

export function WizardStepPatient({ onNext }: WizardStepPatientProps) {
    const { familyMembers, activePatientId, setActivePatientId } = useScheduling();

    return (
        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" /> Who is this appointment for?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {familyMembers.map(member => (
                    <button
                        key={member.id}
                        onClick={() => {
                            setActivePatientId(member.id);
                            onNext();
                        }}
                        className={`p-6 rounded-2xl border text-left flex items-center gap-4 transition-all ${activePatientId === member.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-slate-200 bg-white hover:border-primary/50"
                            }`}
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">
                            {member.name[0]}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg">{member.name}</h4>
                            <p className="text-sm text-slate-500">{member.relation} • {member.dob}</p>
                        </div>
                    </button>
                ))}
                <button className="p-6 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center gap-2 text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all min-h-[100px]">
                    + Add Family Member
                </button>
            </div>
        </motion.div>
    );
}
