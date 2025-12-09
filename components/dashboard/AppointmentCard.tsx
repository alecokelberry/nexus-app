import { Calendar, Clock, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Removed to avoid dependency issue
// Actually, I'll use direct Tailwind for buttons to avoid dependency on uncreated UI components, or I should have created them.
// The prompt said "Layout component" in Phase 1, didn't explicitly say "Button" component.
// I'll stick to raw Tailwind for speed and "vibe" control unless directed otherwise.

export function AppointmentCard({ appointment }: { appointment: any }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-md border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />

            <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Upcoming Visit
                </h3>

                <div className="bg-white/50 rounded-xl p-4 border border-white/40 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-foreground">{appointment.date}</p>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{appointment.time}</span>
                            </div>
                            <p className="text-sm font-medium text-primary mt-2">{appointment.type}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 bg-primary text-white font-medium py-2.5 px-4 rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 active:scale-95">
                        Check-in Now
                    </button>
                    <button className="flex-1 bg-white text-muted-foreground font-medium py-2.5 px-4 rounded-lg border border-border hover:bg-gray-50 hover:text-foreground transition-all duration-200">
                        Reschedule
                    </button>
                </div>
            </div>
        </div>
    );
}
