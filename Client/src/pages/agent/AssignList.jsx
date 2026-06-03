import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Users,
  FileSpreadsheet,
  Phone,
  StickyNote,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock3,
  TrendingUp,
  MoreVertical,
  Search,
  Filter,
  Download,
  CalendarDays,
  UserRound,
  Loader2,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { SERVER_URL } from "../../main";
import { useSelector } from "react-redux";

const AssignList = () => {
  const navigate = useNavigate();
  const { Userdata } = useSelector((state) => state.User);
  const agentId = Userdata?.user._id

  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [agent, setAgent] = React.useState(null);
  const [records, setRecords] = React.useState([]);

  const fetchAssignedRecords = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${SERVER_URL}/api/upload/agent/${agentId}`,
        {
          withCredentials: true,
        }
      );

      setAgent(response?.data?.agent || null);
      setRecords(Array.isArray(response?.data?.records) ? response.data.records : []);
    }

    catch (error) {
      console.error("Error fetching assigned records:", error);
      toast.error(error?.response?.data?.message || "Failed to load agent records");
      setAgent(null);
      setRecords([]);
    }

    finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (agentId) {
      fetchAssignedRecords();
    } else {
      setLoading(false);
    }
  }, [agentId]);

  const filteredRecords = (records || []).filter((item) => {
    const q = search.trim().toLowerCase();
    return [item?.firstName, item?.phone, item?.notes, item?.status]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q));
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-56 animate-pulse rounded-[32px] bg-slate-200" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
          <div className="mt-6 h-80 animate-pulse rounded-[32px] bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded border border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
        >
          <div className="relative p-6 sm:p-8">
            <div classNsame="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(244,114,182,0.12),_transparent_24%)]" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded bg-white/10 text-cyan-100 backdrop-blur-md">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking- text-cyan-100/80">
                    <Sparkles className="h-3 w-3" />
                    Assigned List
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {agent?.name || "Agent"}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                      <BadgeCheck className="h-4 w-4 text-emerald-300" />
                      {agent?.status || "Active"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                      <CalendarDays className="h-4 w-4 text-cyan-200" />
                      Joined {agent?.createdAt ? new Date(agent.createdAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</p>
                  <p className="mt-2 font-medium text-white">
                    {agent?.email || "-"}
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Mobile</p>
                  <p className="mt-2 font-medium text-white">
                    {agent?.mobileNumber || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info strip */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded border border-white/70 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Today’s Activity</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This agent is handling {records.length} assigned leads right now.
            </p>
          </div>
          <div className="rounded border border-white/70 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Agent Status</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-600 font-medium">
              {agent?.status || "Active"} and processing records.
            </p>
          </div>
          <div className="rounded border border-white/70 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Performance</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Current progress is {agent?.performance ?? 91}% with strong completion rate.
            </p>
          </div>
        </div>

        {/* Records section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-6 overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
        >
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">Assigned Records</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">Specific agent data</h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search record..."
                    className="h-12 w-64 rounded border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredRecords.map((record, index) => (
                  <tr key={record?._id || index} className="transition hover:bg-cyan-50/40">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3 font-medium text-slate-900">
                        <UserRound className="h-4 w-4 text-cyan-600" />
                        {record?.firstName || record?.FirstName || record?.name || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3 text-slate-700">
                        <Phone className="h-4 w-4 text-cyan-600" />
                        {record?.phone || record?.Phone || record?.mobileNumber || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3 text-slate-700">
                        <StickyNote className="mt-1 h-4 w-4 text-cyan-600" />
                        <span className="max-w-md">{record?.notes || record?.Notes || "-"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-lg font-semibold text-slate-900">No records found</p>
              <p className="mt-2 text-sm text-slate-500">Try another search keyword.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AssignList;
