"use client";

import { useState, useEffect } from "react";
import { mockPatient } from "@/data/mockPatient";
import { AppointmentCard } from "@/components/dashboard/AppointmentCard";
import { QuickPayCard } from "@/components/dashboard/QuickPayCard";
import { RecentResultsCard } from "@/components/dashboard/RecentResultsCard";
import { ServicesSearch } from "@/components/dashboard/ServicesSearch";

import { WaitlistCard } from "@/components/dashboard/WaitlistCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Star, Megaphone } from "lucide-react";
import Link from "next/link";
import { BroadcastAlert } from "@/components/dashboard/BroadcastAlert";
import { SurveyModal } from "@/components/dashboard/SurveyModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);
  const { engagement } = mockPatient;

  useEffect(() => {
    // Simulate network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4 pb-12 relative">
      <AnimatePresence>
        {showSurvey && engagement.surveys[0] && (
          <SurveyModal
            survey={engagement.surveys[0]}
            onClose={() => setShowSurvey(false)}
          />
        )}
      </AnimatePresence>

      {/* Engagement: Broadcast Alerts */}
      {!isLoading && <BroadcastAlert broadcasts={engagement.broadcasts} />}

      {/* Welcome Section */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 rounded-xl" />
              <Skeleton className="h-5 w-48 rounded-lg" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-light text-foreground">
                Good Morning, <span className="font-semibold">{mockPatient.name.split(" ")[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-1">Here is your health overview for today.</p>
            </motion.div>
          )}
        </div>
        <div className="hidden md:block text-right">
          {!isLoading && <p className="text-sm font-medium text-primary">Patient ID: {mockPatient.id}</p>}
        </div>
      </div>

      {/* Content & Services Search */}
      <ServicesSearch />

      {/* Engagement: Pending Survey Action (High Priority) */}
      {!isLoading && engagement.surveys.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <Star className="w-6 h-6 fill-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Feedback Request</h3>
              <p className="text-sm text-slate-600">Please take a moment to rate your visit with Dr. Thorne.</p>
            </div>
          </div>
          <button
            onClick={() => setShowSurvey(true)}
            className="px-6 py-2 bg-white border border-amber-200 text-amber-700 font-bold rounded-xl shadow-sm hover:bg-amber-50 transition-colors"
          >
            Rate Now
          </button>
        </motion.div>
      )}

      {/* Action Center Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Priority 1: Next Appointment */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <Skeleton className="h-[240px] w-full rounded-2xl" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <AppointmentCard appointment={mockPatient.nextAppointment} />
              </motion.div>

              {/* Telehealth Promo Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative group overflow-hidden rounded-2xl bg-indigo-600 text-white p-6 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <div>
                  <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-1">Telehealth Ready</h3>
                  <p className="text-indigo-100 text-sm">Start a secure video visit with your provider from anywhere.</p>
                </div>
                <Link href="/telehealth" className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm text-center hover:bg-indigo-50 transition-colors shadow-sm">
                  Start Visit
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/* Priority 2: Quick Pay (High conversion action) */}
        <div className="lg:col-span-1">
          {isLoading ? (
            <Skeleton className="h-[240px] w-full rounded-2xl" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <QuickPayCard balance={mockPatient.balance} />
            </motion.div>
          )}
        </div>

        {/* Priority 3: Medical Results & History */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Waitlist Status (Conditional) */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <WaitlistCard />
              </motion.div>

              {/* Placeholder for future detailed chart or simply more info */}
              {isLoading ? (
                <Skeleton className="h-[200px] w-full rounded-2xl" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                  className="h-full min-h-[200px] rounded-2xl bg-white/50 border border-white/40 p-6 flex items-center justify-center text-muted-foreground italic backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
                >
                  No new messages from Dr. Anderson
                </motion.div>
              )}
            </div>
            <div className="md:col-span-1 h-full">
              {isLoading ? (
                <Skeleton className="h-[200px] w-full rounded-2xl" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <RecentResultsCard results={mockPatient.recentResults} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
