import React from "react";
import {
  LayoutDashboard,
  TableProperties,
  Database,
  FileCode,
  Cpu,
  ShieldCheck,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

/* ---------------- MENU CONFIG ---------------- */

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Analytics",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Neural metrics",
  },
  {
    id: "products",
    label: "Inventory",
    path: "/admin/products",
    icon: Database,
    description: "Resource nodes",
  },
  {
    id: "orders",
    label: "Operations",
    path: "/admin/orders",
    icon: TableProperties,
    description: "Active streams",
  },
  {
    id: "logs",
    label: "System Logs",
    path: "/admin/logs",
    icon: FileCode,
    description: "Kernel events",
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
    <div className="flex h-full flex-col bg-[#020617] p-6 text-slate-100">

      {/* ---------------- BRAND ---------------- */}

      <div
        onClick={() => handleNavigate("/admin/dashboard")}
        className="group cursor-pointer rounded-2xl border border-emerald-500/10 bg-slate-900/50 p-5 shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all hover:border-emerald-500/30"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Cpu className="h-6 w-6 text-slate-950" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tighter text-white">
              EMERALD
            </h2>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">
              Protocol v4
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- NAV LABEL ---------------- */}

      <div className="mt-10 mb-4 px-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          Main Interface
        </p>
      </div>

      {/* ---------------- NAVIGATION ---------------- */}

      <nav className="flex flex-col gap-2">

        {adminSidebarMenuItems.map((item) => {

          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
              
              ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "text-slate-500 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent"
              }
              
              `}
            >
              <Icon
                className={`h-5 w-5 transition-colors
                  
                  ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-600 group-hover:text-emerald-500"
                  }
                  
                  `}
              />

              <div className="flex flex-col items-start text-left">
                <span className="tracking-wide">{item.label}</span>

                <span
                  className={`text-[10px] font-normal transition-colors
                  
                  ${
                    isActive
                      ? "text-emerald-400/60"
                      : "text-slate-600 group-hover:text-slate-400"
                  }
                  
                  `}
                >
                  {item.description}
                </span>
              </div>

              {/* ACTIVE GLOW */}

              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute left-0 h-6 w-1 rounded-r-full bg-emerald-500 shadow-[4px_0_12px_rgba(16,185,129,0.5)]"
                />
              )}
            </button>
          );
        })}

      </nav>

     {/* ---------------- FOOTER ---------------- */}
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
          className="w-[280px] bg-[#020617] p-0 border-r border-emerald-500/10"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Navigation</SheetTitle>
          </SheetHeader>

          <SidebarContent setOpen={setOpen} />

        </SheetContent>

      </Sheet>

      {/* DESKTOP SIDEBAR */}

      <aside className="hidden lg:block w-[280px] border-r border-emerald-500/10 bg-[#020617]">
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;