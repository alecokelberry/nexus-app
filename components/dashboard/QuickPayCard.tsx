import { CreditCard, Receipt } from "lucide-react";

export function QuickPayCard({ balance }: { balance: number }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-md border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" />

            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Quick Pay
            </h3>

            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-4xl font-bold text-foreground tracking-tight">
                        ${balance.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Current Balance</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-emerald-600 mb-1">
                    <Receipt className="w-5 h-5" />
                </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pay Now
            </button>
        </div>
    );
}
