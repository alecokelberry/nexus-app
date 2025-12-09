"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronRight, Check, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DigitalFormWizardProps {
    formTitle: string;
    onClose: () => void;
}

export function DigitalFormWizard({ formTitle, onClose }: DigitalFormWizardProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setSignature] = useState(""); // signature unused
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Mock Form Data State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        medications: "",
        allergies: "",
        surgeries: "",
        consent: false,
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API
        await new Promise(r => setTimeout(r, 2000));
        setIsSubmitting(false);
        setStep(4); // Success step
    };

    // Simple Signature Canvas Logic
    useEffect(() => {
        if (step === 3 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
            }
        }
    }, [step]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.beginPath();
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (canvasRef.current) {
            setSignature(canvasRef.current.toDataURL());
        }
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setSignature("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Digital Intake</span>
                        </div>
                        <h2 className="text-xl font-bold">{formTitle}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="h-1 bg-slate-100 w-full">
                        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">First Name</label>
                                        <input
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                                        <input
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">Medical History</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Current Medications</label>
                                        <textarea
                                            value={formData.medications}
                                            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                                            placeholder="List any medications you are currently taking..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Allergies</label>
                                        <textarea
                                            value={formData.allergies}
                                            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                                            placeholder="List any allergies..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">Sign & Verify</h3>
                                <p className="text-slate-500 text-sm">
                                    By signing below, I certify that the information provided is true and accurate to the best of my knowledge.
                                </p>

                                <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 relative overflow-hidden">
                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={200}
                                        className="w-full h-48 cursor-crosshair touch-none"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                    />
                                    <div className="absolute top-2 left-2 pointer-events-none text-xs text-slate-400 font-bold uppercase tracking-wider">
                                        Sign Here
                                    </div>
                                    <button
                                        onClick={clearSignature}
                                        className="absolute top-2 right-2 text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-100 text-slate-600"
                                    >
                                        Clear
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        checked={formData.consent}
                                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="consent" className="text-sm text-slate-700">
                                        I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
                                    </label>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Check className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Form Submitted!</h3>
                                <p className="text-slate-600 max-w-sm mx-auto mb-8">
                                    We have securely received your information. A copy has been sent to your email.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                                >
                                    Return to Forms
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                {step < 4 && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 rounded-xl font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                            >
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.consent || isSubmitting} // Removing signature check for ease of demo if needed, but signature state is tracked.
                                className="bg-primary text-white px-8 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Form"}
                                {!isSubmitting && <PenTool className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
