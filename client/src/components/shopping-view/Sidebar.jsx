import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/shop/home" },
    { name: "Collections", path: "/shop/listing" },
    { name: "Account", path: "/shop/account" },
    { name: "Checkout", path: "/shop/checkout" },
  ];

  // Animation Variants
  const sidebarVariants = {
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    opened: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-[100]"
          />

          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed left-0 top-0 h-full w-full max-w-[400px] bg-white dark:bg-zinc-950 z-[110] shadow-2xl flex flex-col p-8 md:p-12"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-transform active:scale-90"
              >
                <X size={24} className="text-zinc-900 dark:text-zinc-100" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} custom={i} variants={linkVariants}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-2"
                    >
                      <span
                        className={`text-4xl font-bold tracking-tighter transition-all duration-300
                        ${isActive 
                          ? "text-zinc-950 dark:text-white translate-x-4" 
                          : "text-zinc-300 dark:text-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-400 hover:translate-x-2"
                        }`}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <ArrowRight size={28} className="text-zinc-950 dark:text-white" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="mt-auto space-y-8">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white leading-none">
                    {user?.name || "Guest User"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">View Profile Settings</p>
                </div>
              </div>

              <div className="flex gap-6 justify-center text-zinc-400">
                <Instagram size={18} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer" />
                <Twitter size={18} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer" />
                <Facebook size={18} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;