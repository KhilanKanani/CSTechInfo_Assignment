import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import FindCurrentUser from "./components/FindUser";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import CreateAgent from "./pages/admin/agentManagement/CreateAgent";
import ViewAllAgent from "./pages/admin/agentManagement/ViewAllAgent";
import Profile from "./pages/admin/Profile";
import UploadFileData from "./pages/admin/recordManagement/UploadFileData";
import UploadHistory from "./pages/admin/recordManagement/UploadHistory";
import ViewUploadBatch from "./pages/admin/recordManagement/ViewUploadBatch";
import AssignList from "./pages/agent/AssignList";

const App = () => {
  const dispatch = useDispatch();
  const { Loading } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(FindCurrentUser());
  }, [dispatch]);

  if (Loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8fcff] via-[#eef9ff] to-[#dff5ff] px-3">
        <div className="relative flex flex-col items-center ">
          <div className="absolute -top-6 h-12 w-12 rounded-full bg-sky-200/60 blur-2xl" />
          <div className="absolute -bottom-6 h-12 w-12 rounded-full bg-cyan-200/60 blur-2xl" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full shadow-[0_20px_60px_rgba(56,189,248,0.18)]">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-sky-100 border-t-sky-500" />
            <div className="absolute inset-3 animate-spin rounded-full border-4 border-cyan-100 border-b-cyan-400" />
            <img
              src="/am.png"
              alt="AM Logo"
              className="relative z-10 h-14 w-auto object-contain"
            />
          </div>

          <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-800">
            Loading...
          </h2>
          <p className="mt-2 text-sm max-w-sm mx-a text-slate-500 font-semibold">
            Please wait while we fetch your data.
          </p>

          <div className="mt-5 flex gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300" />
          </div>
        </div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/logout",
      element: <Logout />,
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/agents/create",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateAgent />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/agents",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewAllAgent />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/upload",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <UploadFileData />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/upload/history",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <UploadHistory />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/upload/view/:batchId",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewUploadBatch />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute allowedRoles={["admin", "agent"]}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/agent/lists",
          element: (
            <ProtectedRoute allowedRoles={["agent"]}>
              <AssignList />
            </ProtectedRoute>
          ),
        },
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
