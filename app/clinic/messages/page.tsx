"use client";

import { useState } from "react";
import { clinicData } from "@/data/mockClinic";
import { Search, Send, Paperclip } from "lucide-react";

export default function MessagesPage() {
    const { messages } = clinicData;
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [inputText, setInputText] = useState("");

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* Sidebar List */}
            <div className="w-80 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search staff..."
                            className="w-full bg-slate-50 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-slate-300"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.map((msg) => (
                        <button
                            key={msg.id}
                            onClick={() => setActiveChat(msg.id)}
                            className={`w-full p-4 flex gap-3 hover:bg-slate-50 transition-colors text-left border-l-4 ${activeChat === msg.id ? "border-slate-900 bg-slate-50" : "border-transparent"}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                                {msg.sender.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-semibold text-sm ${!msg.read ? "text-slate-900" : "text-slate-600"}`}>{msg.sender}</span>
                                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{msg.text}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                {activeChat ? (
                    <>
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                                    {messages.find(m => m.id === activeChat)?.sender.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-900">{messages.find(m => m.id === activeChat)?.sender}</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-50 p-6">
                            {/* Mock Conversation */}
                            <div className="flex flex-col gap-4">
                                <div className="self-start max-w-[70%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-600">
                                    {messages.find(m => m.id === activeChat)?.text}
                                </div>
                                <div className="self-end max-w-[70%] bg-slate-900 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm">
                                    Shared the files. Let me know if you need anything else.
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white border-t border-slate-100 flex gap-4">
                            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-50 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300"
                            />
                            <button className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8 opacity-50" />
                        </div>
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
