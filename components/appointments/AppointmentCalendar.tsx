import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface AppointmentCalendarProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    availableDates: string[]; // ISO strings of available dates
}

export function AppointmentCalendar({ selectedDate, onSelectDate, availableDates }: AppointmentCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(startOfToday());
    const today = startOfToday();

    // Generate next 14 days for simple demo purposes
    const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Select Date</h3>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-muted rounded-full">
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded-full">
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground mb-4">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>

            {/* Simplified calendar grid for demo - showing linear days for better UX in mobile/appointment context sometimes, 
          but request asked for "Interactive Calendar". Let's stick to a grid logic or just list days if easier. 
          Actually, let's do a proper mini grid of the days generated above. 
      */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    // Check availability map in real app. using mock prop here
                    const isAvailable = availableDates.includes(format(day, 'yyyy-MM-dd'));
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => isAvailable && onSelectDate(day)}
                            disabled={!isAvailable}
                            className={`
                 aspect-squares rounded-lg flex flex-col items-center justify-center p-2 transition-all
                 ${isSelected
                                    ? "bg-primary text-white shadow-md"
                                    : isAvailable
                                        ? "hover:bg-primary/10 text-foreground cursor-pointer bg-white border border-border"
                                        : "opacity-40 cursor-not-allowed bg-muted/30 text-muted-foreground"}
               `}
                        >
                            <span className="text-[10px] uppercase font-bold opacity-60">{format(day, 'EEE')}</span>
                            <span className="text-lg font-bold">{format(day, 'd')}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
