import React, { useState } from "react"; // Fixed: Added useState
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Ensure this path is correct
import Header from "./Header";   // Ensure this path is correct

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030014] text-slate-100">
      {/* Dynamic Background Glows for the Violet Theme */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-violet-900/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar component */}
        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        
        <div className="flex flex-1 flex-col">
          {/* Header component */}
          <Header setOpen={setOpenSidebar} />
          
          <main className="flex-1 overflow-y-auto p-6">
             {/* This renders the child routes */}
             <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; // Fixed: Added default export