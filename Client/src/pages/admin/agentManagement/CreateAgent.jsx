import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Phone,
  Lock,
  Sparkles,
  ShieldCheck,
  Users,
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { SERVER_URL } from "../../../main";

const initialForm = {
  name: "",
  email: "",
  mobileNumber: "",
  password: "",
  role: "agent",
};

const CreateAgent = () => {
  const [form, setForm] = React.useState(initialForm);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, mobileNumber, password } = form;

    if (!name.trim()) return "Agent name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";

    const mobileRegex = /^\+\d{10,15}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return "Mobile number must include country code, for example +919876543210";
    }

    if (password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const loadingToast = toast.loading("Creating agent...");
      console.log(form);
      
      const response = await axios.post(`${SERVER_URL}/api/agents/create`,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          mobileNumber: form.mobileNumber.trim(),
          password: form.password,
          role: form.role,
        },
        {
          withCredentials: true,
        }
      );

      toast.dismiss(loadingToast);
      toast.success(response?.data?.message || "Agent created successfully");
      setForm(initialForm);
    }

    catch (error) {
      toast.dismiss();
      console.log("Create Agent Error:", error?.response || error);

      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }

    finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.14),_transparent_26%),linear-gradient(135deg,_#f7fbff_0%,_#edf7fb_45%,_#f8fffe_100%)] px-3 py-8 text-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full"
        >
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-700 shadow-sm">
              <Sparkles className="h-3 w-3" />
              Agent Management
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create New Agent
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Add a new agent with secure access details. Make sure to provide a valid email and mobile number with country code.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="overflow-hidden rounded border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl"
            >
              <div className="border-b border-slate-100 bg-white/70 px-3 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                      Agent Form
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Enter agent details
                    </h3>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-5 p-4 sm:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Agent Name
                    </label>
                    <div className="relative">
                      <UserPlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter agent name"
                        className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="agent@example.com"
                        className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Mobile Number with Country Code
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                      <input
                        name="mobileNumber"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        placeholder="+919876543210"
                        className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Role
                  </label>

                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="h-14 w-full rounded border border-slate-200 bg-white pl-11 pr-4 text-slate-800 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                    >
                      <option value="agent">Agent</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2 items-center justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="inline-flex cursor-pointer h-14 min-w-[220px] items-center justify-center rounded bg-gradient-to-r from-cyan-600 to-teal-500 px-6 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(13,148,136,0.28)] transition hover:from-cyan-700 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Agent...
                      </>
                    ) : (
                      <>
                        Create Agent
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAgent;