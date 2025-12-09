"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TelehealthPage() {
    const [status, setStatus] = useState<"check" | "waiting" | "call">("check");
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: "me" | "doctor" }[]>([]);
    const [inputText, setInputText] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);

    // Mock accessing camera
    useEffect(() => {
        if (status === "call" && isVideoOn) {
            // In a real app, navigator.mediaDevices.getUserMedia...
            // For mock, we just ensure the video element exists
        }
    }, [status, isVideoOn]);

    const handleJoin = () => {
        setStatus("waiting");
        setTimeout(() => {
            setStatus("call");
            // Simulate doctor message
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now(), text: "Hello! I can see and hear you clearly. How are you today?", sender: "doctor" }]);
            }, 1000);
        }, 3000); // 3 seconds waiting room simulation
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { id: Date.now(), text: inputText, sender: "me" }]);
        setInputText("");
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-light text-slate-900">Telehealth Visit</h1>
                <p className="text-slate-500">Secure video consultation with your provider.</p>
            </div>

            <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex">

                {/* Main Video Area */}
                <div className="flex-1 relative flex flex-col">
                    {/* Remote Video (Doctor) */}
                    <div className="flex-1 bg-slate-800 relative flex items-center justify-center">
                        {status === "check" && (
                            <div className="text-center text-slate-400 p-8">
                                <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold text-white mb-2">System Check</h3>
                                <p className="max-w-md mx-auto">Please ensure your camera and microphone are working before joining the call.</p>
                            </div>
                        )}

                        {status === "waiting" && (
                            <div className="text-center text-slate-400 p-8 animate-pulse">
                                <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold text-white mb-2">Waiting for Dr. Thorne...</h3>
                                <p>You are in the virtual waiting room. The doctor will be with you shortly.</p>
                            </div>
                        )}

                        {status === "call" && (
                            <>
                                <img
                                    src="/doctors/thorne.jpg" // Assuming this exists or will fail gracefully to alt
                                    onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"}
                                    alt="Doctor"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-white font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/10">00:42</span>
                                    <span className="text-white font-bold text-shadow">Dr. Marcus Thorne</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Controls Bar */}
                    <div className="h-24 bg-slate-950 flex items-center justify-center gap-6 relative z-10 border-t border-slate-800">
                        {status === "check" ? (
                            <button
                                onClick={handleJoin}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                Join Visit
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsMicOn(!isMicOn)}
                                    className={`p-4 rounded-full transition-all ${isMicOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-red-500/20 text-red-500 border border-red-500/50"}`}
                                >
                                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                                </button>
                                <button
                                    onClick={() => setStatus("check")} // End call
                                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <PhoneOff className="w-5 h-5" /> End Call
                                </button>
                                <button
                                    onClick={() => setIsVideoOn(!isVideoOn)}
                                    className={`p-4 rounded-full transition-all ${isVideoOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-red-500/20 text-red-500 border border-red-500/50"}`}
                                >
                                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Self View (PiP) */}
                {(status === "call" || status === "check") && (
                    <div className="absolute top-6 right-6 w-48 aspect-video bg-black rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl z-20">
                        {isVideoOn ? (
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                                alt="Me"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                                <VideoOff className="w-6 h-6" />
                            </div>
                        )}
                        <div className="absolute bottom-2 right-2 text-white/50 text-xs font-bold bg-black/50 px-1.5 py-0.5 rounded">You</div>
                    </div>
                )}

                {/* Chat Sidebar (Desktop) */}
                {status === "call" && (
                    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col hidden lg:flex">
                        <div className="p-4 border-b border-slate-800 font-bold text-slate-300 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Secure Chat
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === "me"
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-slate-800 text-slate-200 rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-slate-600 mt-1">{msg.sender === "me" ? "You" : "Dr. Thorne"}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-800">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Type a message..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
