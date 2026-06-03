import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Loader2,
  ArrowRight,
  X,
  Download,
  Database,
  Users,
  FileUp,
} from "lucide-react";
import { SERVER_URL } from "../../../main";

const allowedExtensions = ["csv", "xls", "xlsx"];

const UploadFileData = () => {
  const [file, setFile] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [uploadSummary, setUploadSummary] = React.useState(null);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return "Please choose a file";

    const fileName = selectedFile.name.toLowerCase();
    const ext = fileName.split(".").pop();

    if (!allowedExtensions.includes(ext)) {
      return "Only CSV, XLS, and XLSX files are allowed";
    }

    return null;
  };

  const handleFileSelect = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setFile(selectedFile);
    setUploadSummary(null);
    toast.success("File selected successfully");
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      const loadingToast = toast.loading("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${SERVER_URL}/api/upload/upload`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.dismiss(loadingToast);
      toast.success(response?.data?.message || "File uploaded successfully");
      setUploadSummary(response?.data?.data || null);
      setFile(null);
    }

    catch (error) {
      toast.dismiss();
      const message =
        error?.response?.data?.message || error.message || "Upload failed";
      toast.error(message);
    }

    finally {
      setLoading(false);
    }
  };

  const selectedFileInfo = file ? {
    name: file.name,
    size: `${(file.size / 1024).toFixed(1)} KB`,
    ext: file.name.split(".").pop().toUpperCase(),
  } : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-3 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 shadow-sm">
              <Sparkles className="h-3 w-3" />
              Upload Management
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Upload CSV / XLS / XLSX File
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Upload your lead file, validate it, and distribute records equally among agents with a clean modern dashboard flow.
            </p>
          </div>

          <div className="rounded border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Secure Upload</p>
                <p className="text-xs text-slate-500">JWT protected route</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="">
          {/* Upload panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
          >
            <div className="border-b border-slate-100 bg-white/70 px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
                    File Upload
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Select and upload your file
                  </h2>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpload} className="p-4 sm:p-8">
              <label
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDrop={handleDrop}
                className={`group relative flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-8 text-center transition sm:p-12 ${dragActive
                  ? "border-cyan-400 bg-cyan-50/70"
                  : "border-slate-200 bg-slate-50/70 hover:border-cyan-300 hover:bg-cyan-50/40"
                  }`}
              >
                <input
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-200">
                  <UploadCloud className="h-10 w-10" />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Drag & drop file here
                </h3>
                <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500">
                  Or click to browse from your computer. Accepted file types are CSV, XLS, and XLSX.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    FirstName
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Phone
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Notes
                  </span>
                </div>
              </label>

              {selectedFileInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-cyan-50 text-cyan-700">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{selectedFileInfo.name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {selectedFileInfo.ext} • {selectedFileInfo.size}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="rounded p-2 text-slate-400 transition bg-slate-50 border border-sky-100 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Button Upload */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs leading-6 text-slate-500">
                  The backend will validate the headers and split the records equally among 5 agents.
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="inline-flex h-14 min-w-[220px] items-center justify-center rounded cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-500 px-6 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(13,148,136,0.28)] transition hover:from-cyan-700 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      Upload File
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadFileData;
