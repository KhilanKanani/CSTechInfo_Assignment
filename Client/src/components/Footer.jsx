import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-4">
      <div className="mx-auto max-w-7xl px-3 text-center">
        <p className="text-sm text-slate-500 font-semibold">
          © {new Date().getFullYear()} <span className="font-bold">Abhan Mans</span >. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;