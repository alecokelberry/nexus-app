"use client";

import { useState } from "react";
import { Star, X, Send, Smile } from "lucide-react";
import { motion } from "framer-motion";

interface SurveyModalProps {
    survey: {
        id: string;
        title: string;
        description: string;
    };
    onClose: () => void;
}

export function SurveyModal({ survey, onClose }: SurveyModalProps) {
    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        setStep(3); // Success
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                        className="h-full bg-primary transition-all duration-500"
                    />
                </div>

                <div className="p-8 text-center min-h-[320px] flex flex-col justify-center">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 fill-current" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{survey.title}</h3>
                            <p className="text-slate-500 mb-8">{survey.description}</p>

                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setRating(s)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${rating >= s
                                            ? "bg-amber-400 text-white shadow-lg scale-110"
                                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                            }`}
                                    >
                                        <Star className={`w-5 h-5 ${rating >= s ? "fill-current" : ""}`} />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => rating > 0 && setStep(2)}
                                disabled={rating === 0}
                                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Any additional feedback?</h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Your comments help us improve..."
                                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    Submit Feedback <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Smile className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                            <p className="text-slate-500">Your feedback helps us provide better care.</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
