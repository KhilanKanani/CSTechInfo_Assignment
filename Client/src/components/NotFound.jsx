import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-3 overflow-hidden">

            {/* BACKGROUND WATERMARK LOGO */}
            <img
                src="/am.png"
                alt="Watermark Logo"
                className="absolute w-[300px] sm:w-[420px] md:w-[520px] opacity-15 pointer-events-none select-none"
            />

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* ERROR NUMBER */}
                <h1 className="text-[90px] sm:text-[120px] md:text-[150px] font-extrabold text-gray-800 leading-none tracking-tight">
                    404
                </h1>

                {/* TITLE */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mt-4">
                    Page Not Found
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-3 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
                    The page you tried to access does not exist in the academic portal.
                    It may have been moved, deleted, or the link might be incorrect.
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex  items-center cursor-pointer gap-2 px-5 py-2.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded transition shadow-sm"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center cursor-pointer gap-2 px-5 py-2.5 text-sm bg-black hover:bg-gray-900 text-white font-medium rounded transition shadow-md"
                    >
                        <FaHome />
                        Go to Dashboard
                    </button>

                </div>

            </div>

            {/* FOOTER */}
            <div className="absolute bottom-4 text-[11px] text-gray-500 text-center w-full">
                ©2026 Kk's Pvt Ltd. All Rights Reserved
            </div>

        </div>
    );
};

export default NotFound;