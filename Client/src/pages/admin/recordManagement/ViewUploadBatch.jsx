import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Users, UserRound, Phone, StickyNote, Loader2 } from "lucide-react";
import { SERVER_URL } from "../../../main";

const ViewUploadBatch = () => {
    const { batchId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(true);
    const [agentWiseData, setAgentWiseData] = React.useState([]);

    const fetchBatchDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/upload/batch/${batchId}`, {
                withCredentials: true,
            });
            const data = response?.data?.data
            setAgentWiseData(data);
        }
        catch (error) {
            console.error("Error fetching batch details:", error);
            toast.error(error?.response?.data?.message || "Failed to load batch details");
            setAgentWiseData([]);
        }
        finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (batchId) {
            fetchBatchDetails();
        } else {
            setLoading(false);
        }
    }, [batchId]);

    const getAgentName = (agent, index) =>
        agent?.agentName ||
        agent?.name ||
        agent?.assignedAgent?.name ||
        `Agent ${index + 1}`;

    const getAgentId = (agent, index) =>
        agent?.agentId?._id ||
        agent?.agentId ||
        agent?._id ||
        index;

    const getAgentRecords = (agent) => {
        if (Array.isArray(agent?.records)) return agent.records;
        if (Array.isArray(agent?.data)) return agent.data;
        return [];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="h-10 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="mt-6 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-40 animate-pulse rounded-3xl bg-slate-200" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-3 py-8 text-slate-900">
            <div className="mx-auto max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 rounded border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-lg">
                            <Users className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Agent-wise Records
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Only the assigned records for each agent are shown below.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-6">
                    {agentWiseData.length > 0 ? (
                        agentWiseData.map((agent, index) => {
                            const agentName = getAgentName(agent, index);
                            const agentId = getAgentId(agent, index);
                            const agentRecords = getAgentRecords(agent);

                            return (
                                <motion.div
                                    key={agentId}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                                >
                                    <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">
                                                    {agentName}
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Agent ID: {String(agentId)}
                                                </p>
                                            </div>

                                            <div className="rounded w-fit bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                                                {agentRecords.length} assigned records
                                            </div>
                                        </div>
                                    </div>

                                    {agentRecords.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-slate-100">
                                                <thead className="bg-slate-50/80">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                            Name
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                            Phone
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                            Notes
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                    {agentRecords.map((record, rIndex) => (
                                                        <tr key={record?._id || rIndex} className="hover:bg-cyan-50/40">
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-3 font-medium text-slate-900">
                                                                    <UserRound className="h-4 w-4 text-cyan-600" />
                                                                    {record?.firstName || record?.name || record?.FirstName || "-"}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-3 text-slate-700">
                                                                    <Phone className="h-4 w-4 text-cyan-600" />
                                                                    {record?.phone || record?.mobileNumber || record?.Phone || "-"}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-start gap-3 text-slate-700">
                                                                    <StickyNote className="mt-1 h-4 w-4 text-cyan-600" />
                                                                    <span className="max-w-md min-w-sm">
                                                                        {record?.notes || record?.Notes || "-"}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="px-6 py-10 text-center">
                                            <p className="text-sm text-slate-500">
                                                No records assigned to this agent.
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-lg font-semibold text-slate-900">
                                No assigned data found
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                This batch does not have agent-wise records yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewUploadBatch;