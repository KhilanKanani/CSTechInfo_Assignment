import React from "react";
import { motion } from "framer-motion";
import {
    History,
    FileSpreadsheet,
    Users,
    Search,
    Eye,
    Download,
    Sparkles,
    ShieldCheck,
    Layers3,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    AlertCircle,
    Loader2,
    Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { SERVER_URL } from "../../../main";

const UploadHistory = () => {
    const [search, setSearch] = React.useState("");
    const [batches, setBatches] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const fetchUploadHistory = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${SERVER_URL}/api/upload/history`, {
                withCredentials: true,
            });

            setBatches(Array.isArray(response?.data?.data) ? response.data.data : []);
        } catch (error) {
            console.error("Error fetching upload history:", error);
            toast.error(
                error?.response?.data?.message || "Failed to fetch upload history"
            );
            setBatches([]);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUploadHistory();
    }, []);

    const filteredBatches = (batches || []).filter((batch) => {
        const query = search.trim().toLowerCase();

        const batchId =
            batch?._id || batch?.id || batch?.batchId || "";

        const fileName =
            batch?.fileName || batch?.originalFileName || batch?.filename || "";

        const uploadedBy =
            typeof batch?.uploadedBy === "string"
                ? batch.uploadedBy
                : batch?.uploadedBy?.name || batch?.uploadedBy?.email || "";

        return [batchId, fileName, uploadedBy]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(query));
    });

    const formatDate = (value) => {
        if (!value) return "-";
        return new Date(value).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getAssignedCounts = (batch) => {
        if (Array.isArray(batch?.assigned)) {
            return batch.assigned;
        }

        if (Array.isArray(batch?.assignedAgents)) {
            return batch.assignedAgents.map((item) => item?.recordsCount ?? 0);
        }

        return [];
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-3 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-700 shadow-sm">
                            <Sparkles className="h-4 w-4" />
                            Upload Tracking
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Upload History
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Review all uploaded CSV, XLS, and XLSX batches, their processing
                            status, and how records were distributed among agents.
                        </p>
                    </div>

                    <div className="rounded border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-200">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Protected Records
                                </p>
                                <p className="text-xs text-slate-500">
                                    JWT authenticated history
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Toolbar */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="mb-6 flex flex-col gap-4 rounded border border-white/70 bg-white/85 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between"
                >
                    <div className="relative w-full md:max-w-xl">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by batch ID, file name, or uploaded by..."
                            className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            className="rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            onClick={() => navigate("/admin/upload")}
                        >
                            Upload New Batch
                        </button>
                    </div>
                </motion.div>

                {/* Loading */}
                {loading ? (
                    <div className="rounded border border-white/70 bg-white/90 p-10 shadow-sm text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-cyan-600" />
                        <p className="mt-3 text-sm text-slate-500">Loading upload history...</p>
                    </div>
                ) : (
                    <>
                        {/* History Cards */}
                        <div className="grid gap-5">
                            {filteredBatches.length > 0 ? (
                                filteredBatches.map((batch, index) => {
                                    const assignedCounts = getAssignedCounts(batch);

                                    const batchId =
                                        batch?._id || batch?.id || batch?.batchId || "-";

                                    const fileName =
                                        batch?.fileName || batch?.originalFileName || batch?.filename || "-";

                                    const uploadedByName =
                                        typeof batch?.uploadedBy === "string"
                                            ? batch.uploadedBy
                                            : batch?.uploadedBy?.name ||
                                            batch?.uploadedBy?.email ||
                                            "-";

                                    return (
                                        <motion.div
                                            key={batchId}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 + index * 0.04, duration: 0.45 }}
                                            className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
                                        >
                                            <div className="border-b border-slate-100 px-4 py-5 sm:px-5">
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-100">
                                                            <FileSpreadsheet className="h-7 w-7" />
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <h2 className="text-xl font-bold text-slate-900">
                                                                    {fileName}
                                                                </h2>
                                                            </div>
                                                            <p className="mt-2 text-sm text-slate-500">
                                                                Batch ID:{" "}
                                                                <span className="font-semibold text-slate-700">
                                                                    #{batchId.slice(-6)}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <button onClick={() => navigate(`/admin/upload/view/${batchId}`)} className="inline-flex cursor-pointer items-center gap-2 rounded border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                                                            <Eye className="h-4 w-4" />
                                                            View Details
                                                        </button>
                                                        <a
                                                            href={`${SERVER_URL}/uploads/${batch.fileName}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Download
                                                        </a>    
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
                                                <div className="rounded bg-slate-50 p-3 sm:p-5">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                                        Total Records
                                                    </p>
                                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                                        {batch?.totalRecords ?? 0}
                                                    </p>
                                                </div>

                                                <div className="rounded bg-slate-50 p-3 sm:p-5">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                                        Agents
                                                    </p>
                                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                                        {batch?.totalAgents ?? assignedCounts.length ?? 0}
                                                    </p>
                                                </div>

                                                <div className="rounded bg-slate-50 p-3 sm:p-5">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                                        Uploaded By
                                                    </p>
                                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                                        {uploadedByName}
                                                    </p>
                                                </div>

                                                <div className="rounded bg-slate-50 p-3 sm:p-5">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                                        Uploaded At
                                                    </p>
                                                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                                                        {formatDate(batch?.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="rounded border border-slate-200 bg-white p-10 text-center shadow-sm">
                                    <p className="text-lg font-semibold text-slate-900">
                                        No upload history found
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Try another keyword.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadHistory;