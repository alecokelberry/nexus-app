import { ArrowRight, Activity } from "lucide-react";

interface RecentResult {
    id: string;
    title: string;
    date: string;
}

export function RecentResultsCard({ results }: { results: RecentResult[] }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-md border border-white/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Recent Results
                </h3>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    New
                </span>
            </div>

            <div className="flex-1 space-y-3">
                {results.map((result) => (
                    <div
                        key={result.id}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/40 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">{result.title}</p>
                                <p className="text-xs text-muted-foreground">{result.date}</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-t border-border/50">
                View All Records
            </button>
        </div>
    );
}
