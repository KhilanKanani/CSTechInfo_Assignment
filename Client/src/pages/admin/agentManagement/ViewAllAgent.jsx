import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Search,
    Mail,
    Phone,
    ShieldCheck,
    MoreVertical,
    Edit3,
    Trash2,
    UserRound,
    Activity,
    BadgeCheck,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../../../main";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const ViewAllAgent = () => {
    const navigate = useNavigate()
    const [search, setSearch] = React.useState("");
    const [agentsData, setAgentsData] = React.useState([]);

    const handleDelete = async (agentId) => {
        const toastId = toast.loading("Deleting agent...");
        try {
            await axios.delete(`${SERVER_URL}/api/agents/delete/${agentId}`, { withCredentials: true });
            setAgentsData((prevData) => prevData.filter((agent) => agent._id !== agentId));
            toast.success("Agent deleted successfully!", {id: toastId});
        }
        catch (error) {
            console.error("Error deleting agent:", error);
            toast.error("Failed to delete agent.", {id: toastId});
        }
    };

    const fetchAgentsData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/agents/all`, { withCredentials: true });
            setAgentsData(response.data.data);
        } catch (error) {
            console.error("Error fetching agents data:", error);
        }
    };

    React.useEffect(() => {
        fetchAgentsData();
    }, []);

    const filteredAgents = agentsData.filter((agent) => {
        const query = search.toLowerCase();

        const name = agent?.name ?? "";
        const email = agent?.email ?? "";
        const mobile = agent?.mobileNumber ?? agent?.mobile ?? "";
        const status = agent?.status ?? "";

        return (
            name.toLowerCase().includes(query) ||
            email.toLowerCase().includes(query) ||
            mobile.toLowerCase().includes(query) ||
            status.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-3 py-8 text-slate-900">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-700 shadow-sm">
                            <ShieldCheck className="h-4 w-4" />
                            Agent Management
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            View All Agents
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Manage your agent team, review assignment progress, and keep track of active performance from a modern dashboard view.
                        </p>
                    </div>

                    <div className="rounded border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Team Snapshot</p>
                        <div className="mt-2 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-200">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{agentsData.length} Agents</p>
                                <p className="text-xs text-slate-500">Managed in real time</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Search and toolbar */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                    className="mb-6 flex flex-col gap-4 rounded border border-white/70 bg-white/85 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between"
                >
                    <div className="relative w-full md:max-w-xl">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search agents by name, email, mobile, or status..."
                            className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={() => navigate('/admin/agents/create')} className="rounded border cursor-pointer bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Add Agent
                        </button>
                    </div>
                </motion.div>

                {/* Table card */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
                >
                    <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                                    Agent Directory
                                </p>
                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    All agent records and status
                                </h2>
                            </div>
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-semibold text-slate-900">{filteredAgents.length}</span> results
                            </p>
                        </div>
                    </div>

                    <div className=" overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        AgentId
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        MobileNumber
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredAgents.map((agent, index) => (
                                    <motion.tr
                                        key={agent.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 + index * 0.03 }}
                                        className="transition hover:bg-cyan-50/40"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm text-slate-500">#{agent._id.slice(-6)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {agent.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {agent.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {agent.mobileNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <button onClick={() => handleDelete(agent._id)} className="rounded border border-red-100 bg-red-50 p-2 text-red-500 transition hover:bg-red-100">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAgents.length === 0 && (
                        <div className="border-t border-slate-100 px-6 py-12 text-center">
                            <p className="text-lg font-semibold text-slate-900">No agents found</p>
                            <p className="mt-2 text-sm text-slate-500">
                                Try a different search keyword.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ViewAllAgent;
