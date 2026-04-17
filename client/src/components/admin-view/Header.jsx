import React from 'react';
import { Menu, Bell, Power, Cpu, Scan, Terminal } from "lucide-react";
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
        toast.success("SYSTEM_HALT: Session Terminated");
        navigate("/auth/login");
      }
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b] border-b-4 border-zinc-800 px-6 py-0 font-mono cursor-default">
      <div className="mx-auto max-w-7xl h-20 flex items-center justify-between">
        
        {/* LEFT: BRAND & MOBILE TOGGLE */}
        <div className="flex items-center gap-6 h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen?.(true)}
            className="rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black lg:hidden cursor-pointer"
          >
            <Menu size={24} />
          </Button>

          <div className="flex items-center gap-4 group cursor-crosshair">
            <div className="relative flex h-12 w-12 items-center justify-center border-4 border-white bg-white text-black transform transition-transform group-hover:-rotate-12">
              <Cpu size={28} strokeWidth={2.5} />
              <div className="absolute -right-2 -top-2 h-4 w-4 border-2 border-[#09090b] bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>
            
            <div className="hidden flex-col sm:flex">
              <span className="text-xl font-black uppercase tracking-tighter italic transform -skew-x-12 leading-none text-white cursor-text">
                CORE<span className="text-white/20">_</span>CONTROL
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <Terminal size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 cursor-help">SYS_AUTH: AUTHORIZED</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-2 h-full">
          
          {/* NETWORK SCAN (HIDDEN ON MOBILE) */}
          <Button 
            variant="ghost" 
            className="hidden h-12 gap-3 rounded-none border-2 border-zinc-700 bg-transparent px-4 text-zinc-400 hover:bg-white hover:text-black md:flex transition-all active:translate-y-0.5 cursor-pointer"
          >
            <Scan size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">NETWORK_SCAN</span>
          </Button>

          {/* NOTIFICATIONS */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-none border-2 border-zinc-700 bg-transparent text-white hover:border-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <Bell size={20} />
            </Button>
            <span className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center border-2 border-[#09090b] bg-emerald-600 text-[8px] font-black text-white">
              03
            </span>
          </div>

          {/* LOGOUT / KILL PROCESS */}
          <Button 
            onClick={handleLogout}
            className="group ml-2 h-12 rounded-none border-4 border-white bg-white px-6 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200 hover:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer"
          >
            <Power size={18} strokeWidth={3} className="mr-2" />
            <span className="text-xs font-black uppercase italic tracking-widest">KILL_PROCESS</span>
          </Button>
        </div>

      </div>

      {/* SUB-HEADER STATUS BAR */}
      <div className="absolute bottom-[-16px] left-0 w-full h-4 bg-emerald-600 overflow-hidden flex items-center border-y-2 border-black">
         <motion.div 
           animate={{ x: [0, -800] }}
           transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
           className="whitespace-nowrap text-[8px] font-black text-black uppercase tracking-[0.5em]"
         >
            SYSTEM_RUNNING // ENCRYPTED_CONNECTION // SESSION_ACTIVE // 0x882-X9 // TERMINAL_READY // SYSTEM_RUNNING // ENCRYPTED_CONNECTION // SESSION_ACTIVE // 0x882-X9
         </motion.div>
      </div>
    </header>
  );
}

export default Header;