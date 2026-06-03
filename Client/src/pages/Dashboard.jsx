import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
  Upload,
  History,
  Plus,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Activity,
  Layers3,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Leads", value: "1,248", icon: FileSpreadsheet },
    { label: "Active Agents", value: "05", icon: Users },
    { label: "Completed", value: "1,102", icon: CheckCircle2 },
    { label: "Pending", value: "146", icon: Clock3 },
  ];

  const recentUploads = [
    { file: "leads_june.csv", records: 25, status: "Completed", time: "10:20 AM" },
    { file: "sales_data.xlsx", records: 28, status: "Completed", time: "Yesterday" },
    { file: "hot_leads.xls", records: 17, status: "Processing", time: "2 days ago" },
  ];

  const agents = [
    { name: "Aman Patel", progress: 89 },
    { name: "Riya Shah", progress: 91 },
    { name: "Karan Mehta", progress: 82 },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] py-8 text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 overflow-hidden rounded bg-gradient-to-r from-cyan-600 to-teal-500 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-50">
                <Sparkles className="h-4 w-4" />
                Dashboard Overview
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome Back, Admin
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-50/90 sm:text-base">
                Manage agents, upload files, distribute records, and track all batches from one clean dashboard.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-xs text-cyan-50/80">Status</p>
                <p className="mt-1 font-semibold">All Systems Good</p>
              </div>
              <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-xs text-cyan-50/80">Today</p>
                <p className="mt-1 font-semibold">32 Records</p>
              </div>
              <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-xs text-cyan-50/80">Agents</p>
                <p className="mt-1 font-semibold">5 Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="rounded border border-white/70 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              >
                <div className="inline-flex rounded bg-gradient-to-r from-cyan-500 to-teal-400 p-3 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{item.value}</h3>
              </motion.div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Recent uploads */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
          >
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                    Recent Uploads
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Latest file batches
                  </h2>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {recentUploads.map((item) => (
                <div
                  key={item.file}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-100">
                      <FileSpreadsheet className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900">
                          {item.file}
                        </h3>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.records} records • {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side */}
          <div className="space-y-6">

            {/* Agent performance */}
            <div className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                  Agent Performance
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Top agents
                </h2>
              </div>

              <div className="space-y-4 p-6 sm:p-8">
                {agents.map((agent) => (
                  <div key={agent.name} className="rounded bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{agent.name}</p>
                        <p className="text-sm text-slate-500">Progress {agent.progress}%</p>
                      </div>
                      <span className="text-sm font-semibold text-cyan-700">
                        {agent.progress}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
                        style={{ width: `${agent.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;