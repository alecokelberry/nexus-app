import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
    slots: string[];
    selectedSlot: string | null;
    onSelectSlot: (slot: string) => void;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Available Times
            </h3>

            {slots.length === 0 ? (
                <p className="text-muted-foreground text-sm">No slots available for this date.</p>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-3 sm:grid-cols-4 gap-3"
                >
                    {slots.map((slot) => (
                        <motion.button
                            key={slot}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectSlot(slot)}
                            className={`
                py-3 px-4 rounded-xl font-medium text-sm border transition-all
                ${selectedSlot === slot
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-white text-foreground border-border hover:border-primary/50 hover:bg-primary/5"}
                `}
                        >
                            {slot}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
