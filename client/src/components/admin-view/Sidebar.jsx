import React from 'react';
import { 
  LayoutDashboard, 
  TableProperties, 
  Database, 
  FileCode, 
  Cpu, 
  Activity, 
  ShieldCheck 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { motion } from "framer-motion";

// --- NEW TABS CONFIGURATION ---
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

function SidebarContent({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-[#020617] p-6 text-slate-100">
      {/* Brand Section */}
      <div 
        onClick={() => { navigate("/admin/dashboard"); setOpen?.(false); }}
        className="group cursor-pointer rounded-2xl border border-emerald-500/10 bg-slate-900/50 p-5 shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all hover:border-emerald-500/30"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Cpu className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter text-white">EMERALD</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">Protocol v4</p>
          </div>
        </div>
      </div>

      {/* Navigation Label */}
      <div className="mt-10 mb-4 px-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Main Interface</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {adminSidebarMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => { navigate(item.path); setOpen?.(false); }}
              className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                : "text-slate-500 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-400" : "text-slate-600 group-hover:text-emerald-500"}`} />
              <div className="flex flex-col items-start text-left">
                <span className="tracking-wide">{item.label}</span>
                <span className={`text-[10px] font-normal transition-colors ${isActive ? "text-emerald-400/60" : "text-slate-600 group-hover:text-slate-500/60"}`}>
                  {item.description}
                </span>
              </div>
              
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

      {/* Footer Status */}
      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-emerald-500/5 bg-slate-900/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security</span>
            <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Active</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <p className="text-[10px] font-medium text-slate-400">
              Neural Link Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ open, setOpen }) {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] bg-[#020617] p-0 border-r border-emerald-500/10">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      <aside className="hidden w-[280px] border-r border-emerald-500/10 bg-[#020617] lg:block">
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;