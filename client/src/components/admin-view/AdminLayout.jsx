import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import Header from "./Header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white font-mono cursor-default">
      {/* Dark Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="relative z-10 flex h-screen">
        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        
        <div className="flex flex-1 flex-col min-w-0">
          <Header setOpen={setOpenSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 cursor-default">
            <div className="mx-auto max-w-7xl">
               {/* High Contrast Status Bar */}
               <div className="mb-6 flex items-center justify-between border-2 border-white bg-zinc-900 px-4 py-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-black uppercase tracking-widest cursor-text">
                      Root/System/Current_Session
                    </span>
                 </div>
                 <span className="text-[9px] font-bold text-zinc-500 cursor-help">0x882_X9_LIVE</span>
               </div>
               <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;