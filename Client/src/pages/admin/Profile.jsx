import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../main";
import {
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Edit3,
  KeyRound,
  BadgeCheck,
  CalendarDays,
  Building2,
  BookOpen,
  FlaskConical,
  Users,
  Sparkles,
  ArrowLeft,
  Camera,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { Userdata } = useSelector((state) => state.User);
  const user = Userdata?.user || null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] pb-10 text-slate-900">
      {/* Banner */}
      <div className="relative h-60 overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(244,114,182,0.14),_transparent_22%)]" />
        <motion.div
          aria-hidden
          className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          aria-hidden
          className="absolute right-[-4rem] top-16 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-3">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="-mt-24 overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="border-b border-slate-100 px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-cyan-500 to-teal-400 text-white shadow-lg">
                    <UserRound className="h-12 w-12" />
                  </div>

                  <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                    Profile Overview
                  </p>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {user?.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                      <ShieldCheck className="h-4 w-4" />
                      {user?.role === "admin" ? "Admin" : "Agent"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700">
                      <BadgeCheck className="h-4 w-4" />
                      Account Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About */}
        <div className="mt-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded border border-white/70 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Building2 className="h-5 w-5 text-cyan-600" />
              Account Details
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded bg-slate-50 p-4">
                <Mail className="h-5 w-5 text-cyan-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</p>
                  <p className="font-medium text-slate-900">{user?.email || "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded bg-slate-50 p-4">
                <Phone className="h-5 w-5 text-cyan-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Phone</p>
                  <p className="font-medium text-slate-900">{user?.phone || user?.mobileNumber || "-"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
