import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Instagram, Twitter, Facebook, Cpu, Terminal } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/shop/home" },
    { name: "Collections", path: "/shop/listing" },
    { name: "About", path: "/shop/about" },
    { name: "Contact", path: "/shop/contact" },
    { name: "Account", path: "/shop/account" },
    { name: "Checkout", path: "/shop/checkout" },
  ];

  const sidebarVariants = {
    closed: { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -40 },
    opened: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Lighter blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] cursor-zoom-out"
          />

          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed left-0 top-0 h-full w-full max-w-[420px] bg-white border-r-8 border-black z-[110] flex flex-col font-mono shadow-[20px_0px_60px_rgba(0,0,0,0.1)]"
          >
            {/* Header - Light & High Contrast */}
            <div className="flex justify-between items-center p-8 md:p-10 border-b-4 border-black">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
                  System_Nav
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group relative h-10 w-10 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Scrollable Nav Area */}
            <nav className="flex-1 overflow-y-auto px-8 md:px-10 py-10 space-y-4 bg-white">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} custom={i} variants={linkVariants}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-3 border-b border-transparent hover:border-black transition-colors cursor-pointer"
                    >
                      <span
                        className={`text-5xl font-black tracking-tighter uppercase italic transform -skew-x-12 transition-all duration-300
                        ${isActive
                            ? "text-black translate-x-4 scale-105"
                            : "text-zinc-300 hover:text-black hover:translate-x-2"
                          }`}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <ArrowRight size={32} className="text-black animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer - Light Tactical */}
            <div className="p-8 md:p-10 border-t-4 border-black space-y-8 bg-zinc-50">
              {/* User Module */}
              <div className="group flex items-center gap-4 p-4 border-4 border-black bg-white hover:bg-black transition-all cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                <div className="w-14 h-14 border-2 border-black bg-black text-white flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1 group-hover:text-white/50">Verified_Auth</p>
                  <p className="font-black text-lg text-black leading-none truncate uppercase italic group-hover:text-white transition-colors">
                    {user?.name || "Guest_User"}
                  </p>
                </div>
                <Cpu size={18} className="text-black group-hover:text-white transition-colors" />
              </div>

              {/* Socials */}
              <div className="flex gap-8 justify-center text-zinc-400">
                <Instagram size={20} className="hover:text-black cursor-pointer transition-colors" />
                <Twitter size={20} className="hover:text-black cursor-pointer transition-colors" />
                <Facebook size={20} className="hover:text-black cursor-pointer transition-colors" />
              </div>

              <div className="text-center">
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.8em]">
                  NextGen_Interface_v4.2
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;