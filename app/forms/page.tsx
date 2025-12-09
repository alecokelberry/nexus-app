"use client";

import { Header } from "@/components/Header";
import { FileText, Download, PenTool } from "lucide-react";
import { useState } from "react";
import { DigitalFormWizard } from "@/components/forms/DigitalFormWizard";
import { AnimatePresence } from "framer-motion";

const forms = [
    { title: "New Patient Packet", desc: "Complete this before your first visit.", size: "1.2 MB" },
    { title: "HIPAA Release Form", desc: "Authorize release of medical records.", size: "0.5 MB" },
    { title: "Medical History Update", desc: "For returning patients (yearly).", size: "0.8 MB" },
    { title: "Allergy Questionnaire", desc: "Detailed symptom survey.", size: "0.4 MB" },
    { title: "Sleep Study Instructions", desc: "Preparation guide for home study.", size: "2.1 MB" },
    { title: "Post-Op Care: Sinus", desc: "Recovery guidelines after surgery.", size: "1.5 MB" }
];

export default function FormsPage() {
    const [selectedForm, setSelectedForm] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-5xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl font-light text-slate-900 mb-4">Patient Forms</h1>
                        <p className="text-xl text-slate-600">Download, print, or fill online to save time.</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-sm">
                        <h3 className="font-bold text-slate-900 mb-2">Go Paperless!</h3>
                        <p className="text-sm text-slate-600 mb-4">Log in to the portal to complete your forms digitally—secure, fast, and eco-friendly.</p>
                        <a href="/login" className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block shadow-lg shadow-primary/20">
                            Log In to Portal
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {forms.map((form, i) => (
                        <div key={i} className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{form.title}</h3>
                                    <p className="text-slate-500 text-sm mb-1">{form.desc}</p>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wide">{form.size}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                <button
                                    onClick={() => setSelectedForm(form.title)}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                >
                                    <PenTool className="w-4 h-4" /> Fill
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-all shrink-0">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <AnimatePresence>
                {selectedForm && (
                    <DigitalFormWizard
                        formTitle={selectedForm}
                        onClose={() => setSelectedForm(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
