import React from 'react';
import { Menu, Bell, Power, Cpu, Scan, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth_slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Header({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser()).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        toast.success("System override: Session terminated");
        navigate("/auth/login");
      }
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full px-6 py-4">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto max-w-7xl rounded-2xl border border-emerald-500/20 bg-slate-900/80 px-6 py-3 shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          
          {/* Left: Brand & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen?.(true)}
              className="group rounded-lg bg-emerald-500/5 hover:bg-emerald-500/20 lg:hidden"
            >
              <Menu className="h-5 w-5 text-emerald-400 transition-transform group-hover:rotate-90" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <Cpu className="h-6 w-6 text-slate-900" />
                <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-slate-900 bg-emerald-300" />
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-sm font-black uppercase tracking-widest text-white">
                  Emerald <span className="text-emerald-400">Core</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-emerald-500/50" />
                  <span className="text-[9px] font-bold uppercase text-slate-400">System Stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Scanner Button (Decorative) */}
            <Button variant="ghost" size="sm" className="hidden gap-2 rounded-lg border border-emerald-500/10 bg-slate-800/50 px-3 text-slate-400 hover:text-emerald-400 md:flex">
              <Scan className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Network Scan</span>
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-lg text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400">
                <Bell className="h-5 w-5" />
              </Button>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>

            {/* Logout Button */}
            <Button 
              onClick={handleLogout}
              className="group ml-2 h-10 rounded-lg bg-transparent border-2 border-emerald-500/50 px-4 text-emerald-400 transition-all hover:bg-emerald-500 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <Power className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-black uppercase">Kill Process</span>
            </Button>
          </div>

        </div>
      </motion.div>
    </header>
  );
}

export default Header;