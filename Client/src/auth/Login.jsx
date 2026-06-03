import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ShieldCheck, Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { SERVER_URL } from "../main";
import { useDispatch } from "react-redux";
import { setUserdata } from "../Redux/UserSlice";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${SERVER_URL}/api/auth/login`,
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true, timeout: 5000 }
      );

      toast.success("Login successful");
      dispatch(setUserdata(res.data));

      navigate("/");
    }

    catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }

    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.18),_transparent_26%),linear-gradient(135deg,_#f8fcff_0%,_#edf8fb_45%,_#f6fffe_100%)] text-slate-900">
      <div className="relative overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-cyan-300/35 blur-3xl"
          animate={{ x: [0, 22, 0], y: [0, 16, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[-7rem] top-1/4 h-[32rem] w-[32rem] rounded-full bg-teal-300/28 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 20, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-3 py-8">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full overflow-hidden rounded border border-white/70 bg-white/70 shadow-[0_28px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
          >
            <div className="grid min-h-[700px] lg:grid-cols-2">
              {/* Left side */}
              <div className="relative flex items-center justify-center px-3 py-10">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,251,253,0.75))]" />
                <div className="relative z-10 w-full max-w-lg">

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="mb-10 flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <ArrowLeft size={18} />
                    Back To Home
                  </motion.button>

                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-400 text-white shadow-lg shadow-cyan-200">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700/75">
                        Secure Portal
                      </p>
                      <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                        Sign in to continue
                      </h1>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-600">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="h-14 w-full rounded border border-cyan-100 bg-white/90 pl-11 pr-4 text-slate-800 shadow-[0_10px_30px_rgba(34,211,238,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-600">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
                        <input
                          id="password"
                          value={form.password}
                          name="password"
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-14 w-full rounded border border-cyan-100 bg-white/90 pl-11 pr-12 text-slate-800 shadow-[0_10px_30px_rgba(34,211,238,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
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

                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer flex h-14 w-full items-center justify-center rounded bg-gradient-to-r from-cyan-600 to-teal-500 text-base font-semibold text-white shadow-lg shadow-cyan-200 transition hover:from-cyan-700 hover:to-teal-600"
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </motion.button>
                  </form>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded border border-white/80 bg-white/75 p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-800">JWT Auth</p>
                      <p className="mt-1 text-xs text-slate-500">Secure login flow</p>
                    </div>
                    <div className="rounded border border-white/80 bg-white/75 p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-800">Role Based</p>
                      <p className="mt-1 text-xs text-slate-500">Admin / Agent access</p>
                    </div>
                    <div className="rounded border border-white/80 bg-white/75 p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-800">Fast UI</p>
                      <p className="mt-1 text-xs text-slate-500">Clean user experience</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0891b2_0%,#06b6d4_45%,#14b8a6_100%)] px-3 py-10 text-white">
                <div className="absolute inset-0 opacity-25">
                  <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-white/40" />
                  <div className="absolute left-10 top-28 h-96 w-96 rounded-full border border-white/25" />
                  <div className="absolute -right-10 bottom-[-3rem] h-80 w-80 rounded-full border border-white/25" />
                </div>

                <div className="relative z-10 max-w-xl text-center lg:text-left">
                  <div className="mb-8 inline-flex text-xs  items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:text-sm backdrop-blur-md">
                    <Sparkles className="h-4 w-4" />
                    Modern lead distribution dashboard
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Clean login.
                    <br />
                    Smooth workflow.
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-6 text-cyan-50/90 sm:text-lg">
                    A unique, modern login screen for your MERN machine test with animated backgrounds, secure access styling, and a polished dashboard feel.
                  </p>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded border border-white/20 bg-white/12 p-5 shadow-xl backdrop-blur-md"
                    >
                      <p className="text-sm text-cyan-50/80">Active Agents</p>
                      <p className="mt-2 text-3xl font-bold">5</p>
                      <p className="mt-1 text-sm text-cyan-50/80">Balanced distribution</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded border border-white/20 bg-white/12 p-5 shadow-xl backdrop-blur-md"
                    >
                      <p className="text-sm text-cyan-50/80">Today&apos;s Uploads</p>
                      <p className="mt-2 text-3xl font-bold">128</p>
                      <p className="mt-1 text-sm text-cyan-50/80">Records ready to assign</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;