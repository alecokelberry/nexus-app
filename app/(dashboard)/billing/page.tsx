"use client";

import { mockPatient } from "@/data/mockPatient";
import { CreditCard, Download, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BillPayPage() {
    const { billing } = mockPatient;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light text-foreground mb-2">Billing & Financials</h1>
                    <p className="text-muted-foreground">Manage your invoices, payment methods, and insurance details.</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Make a Payment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Current Balance & Methods */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Balance Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
                        <h3 className="text-zinc-400 font-medium mb-1">Total Amount Due</h3>
                        <div className="text-4xl font-bold mb-4 tracking-tight">
                            ${billing.currentBalance.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-300 mb-6">
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                            <span>Due by {billing.dueDate}</span>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Insurance Status</span>
                                <span className="text-green-400 font-medium flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Active
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-foreground">Payment Methods</h3>
                            <button className="text-primary text-sm hover:underline">Edit</button>
                        </div>
                        <div className="space-y-3">
                            {billing.paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                                    <div className="w-10 h-6 bg-white border border-zinc-200 rounded flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase">{method.type}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">•••• •••• •••• {method.last4}</p>
                                        <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                                    </div>
                                    {method.isDefault && (
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Default</span>
                                    )}
                                </div>
                            ))}
                            <button className="w-full py-2 border border-dashed border-zinc-300 rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                + Add New Card
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Invoice History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h3 className="font-semibold text-foreground">Invoice History</h3>
                            <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                                View Statement <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="divide-y divide-border">
                            {billing.invoices.map((invoice, idx) => (
                                <div key={invoice.id} className="p-4 sm:p-6 hover:bg-zinc-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                                    ${invoice.status === "Paid" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                                            {invoice.status === "Paid" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground text-sm sm:text-base">{invoice.description}</h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Inv #{invoice.id} • {invoice.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
                                        <div className="text-right">
                                            <p className="font-semibold text-foreground">${invoice.patientOwes.toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground line-through decoration-zinc-400 opacity-60">
                                                Total: ${invoice.total.toFixed(2)}
                                            </p>
                                        </div>
                                        <button className="text-muted-foreground hover:text-primary transition-colors">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
