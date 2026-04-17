import React from "react";
import {
  LayoutDashboard,
  TableProperties,
  Database,
  FileCode,
  Cpu,
  ArrowRight,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

/* ---------------- MENU CONFIG ---------------- */

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "ANALYTICS",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "neural_metrics",
  },
  {
    id: "products",
    label: "INVENTORY",
    path: "/admin/products",
    icon: Database,
    description: "resource_nodes",
  },
  {
    id: "orders",
    label: "OPERATIONS",
    path: "/admin/orders",
    icon: TableProperties,
    description: "active_streams",
  },
  {
    id: "logs",
    label: "SYSTEM_LOGS",
    path: "/admin/logs",
    icon: FileCode,
    description: "kernel_events",
  },
];

/* ---------------- SIDEBAR CONTENT ---------------- */

function SidebarContent({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (setOpen) setOpen(false);
  };

  return (
    <div className="flex h-full flex-col bg-[#09090b] p-6 text-white font-mono border-r-4 border-zinc-800">

      {/* ---------------- BRAND ---------------- */}

      <div
        onClick={() => handleNavigate("/admin/dashboard")}
        className="group cursor-pointer border-4 border-white bg-white p-5 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-white transform group-hover:-rotate-12 transition-transform">
            <Cpu className="h-7 w-7" strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tighter text-black italic transform -skew-x-12 leading-none">
              EMERALD
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 mt-1">
              CORE_SYSTEM_v4
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- NAV LABEL ---------------- */}

      <div className="mt-12 mb-4 px-2 flex items-center justify-between border-b-2 border-zinc-800 pb-2">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          MAIN_INTERFACE
        </p>
        <div className="h-2 w-2 bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
      </div>

      {/* ---------------- NAVIGATION ---------------- */}

      <nav className="flex flex-col gap-3">
        {adminSidebarMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`group relative flex items-center gap-4 border-2 p-3 transition-all cursor-pointer
              ${
                isActive
                  ? "bg-white text-black border-white shadow-[4px_4px_0px_0px_rgba(16,185,129,0.8)]"
                  : "bg-transparent text-zinc-500 border-transparent hover:border-zinc-700 hover:text-white hover:bg-zinc-900/50"
              }`}
            >
              <div className={`p-2 border-2 transition-colors ${isActive ? 'border-black bg-black text-white' : 'border-zinc-800 text-zinc-500 group-hover:border-white group-hover:text-white'}`}>
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
              </div>

              <div className="flex flex-col items-start text-left">
                <span className={`text-xs font-black tracking-tight uppercase ${isActive ? 'italic transform -skew-x-6' : ''}`}>
                  {item.label}
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-600' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                  {item.description}
                </span>
              </div>

              {isActive && (
                <ArrowRight size={14} className="ml-auto text-emerald-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ---------------- FOOTER ---------------- */}
      <div className="mt-auto pt-6 border-t-2 border-dashed border-zinc-800">
        <div className="bg-zinc-900/50 p-4 border-2 border-zinc-800 text-[9px] font-bold text-zinc-500 uppercase leading-relaxed cursor-default">
          <p>Local_Node: <span className="text-zinc-300">Sargodha_SO_1</span></p>
          <p>Access_Level: <span className="text-emerald-500">Root_Admin</span></p>
          <div className="mt-3 h-1 w-full bg-zinc-800 overflow-hidden relative">
             <motion.div 
               animate={{ x: [-100, 200] }} 
               transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
               className="h-full w-1/3 bg-emerald-500 shadow-[0_0_10px_#10b981]" 
             />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* MOBILE SIDEBAR */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[300px] bg-[#09090b] p-0 border-r-4 border-zinc-800"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-[300px] border-r-4 border-zinc-800 bg-[#09090b]">
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;