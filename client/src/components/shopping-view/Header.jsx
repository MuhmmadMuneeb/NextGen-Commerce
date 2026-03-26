import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { 
  Search, X, ArrowRight, User, LogOut, Settings, Activity, ChevronDown 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/store/auth_slice/index";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get auth state
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Robust Initial Logic: Checks userName, then email, then defaults to "U"
  const userInitial = user?.userName 
    ? user.userName.charAt(0).toUpperCase() 
    : user?.email 
      ? user.email.charAt(0).toUpperCase() 
      : "U";

  const displayName = user?.userName || "Guest_Access";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-[60] px-6 py-4 flex items-center justify-between transition-all duration-500
          ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-black/10 py-3" : "bg-transparent"}`}
      >
        {/* LEFT: MENU TRIGGER */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-3 group"
          >
            <div className="flex flex-col gap-1 cursor-pointer">
              <span className="h-[2px] w-5 bg-black transition-all group-hover:w-8" />
              <span className="h-[2px] w-8 bg-black" />
              <span className="h-[2px] w-4 bg-black transition-all group-hover:w-8" />
            </div>
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-black transition-colors">
              Menu_Panel
            </span>
          </button>
        </div>

        {/* CENTER: LOGO */}
        <Link to="/shop/home" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-black italic tracking-tighter text-black uppercase transform -skew-x-12">
            Aura<span className="text-black/20">.</span>
          </h1>
        </Link>

        {/* RIGHT: SEARCH & TACTICAL DROPDOWN */}
        <div className="flex items-center gap-2 sm:gap-6">
          <button className="hidden sm:flex p-2 hover:bg-black hover:text-white transition-all duration-300">
            <Search size={18} strokeWidth={2.5} />
          </button>
          
          <div className="h-6 w-[1px] bg-black/10 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <Avatar className="h-9 w-9 rounded-none border border-black/10 group-hover:border-black transition-all duration-300">
                    <AvatarFallback className="bg-black text-white text-[10px] font-black rounded-none">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <ChevronDown size={12} className="text-black/30 group-hover:text-black transition-colors" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              align="end" 
              className="w-64 rounded-none border-2 border-black bg-white p-0 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] z-[100]"
            >
              <DropdownMenuLabel className="px-5 py-5 border-b border-black/5 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={10} className="text-black/40" />
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40">Authorized_User</p>
                </div>
                <p className="text-sm font-black truncate uppercase tracking-tighter italic">
                  {displayName}
                </p>
              </DropdownMenuLabel>
              
              <div className="p-1">
                <DropdownMenuItem 
                  onClick={() => navigate("/shop/account")}
                  className="flex items-center gap-3 px-4 py-4 focus:bg-black focus:text-white rounded-none cursor-pointer transition-colors group"
                >
                  <User size={14} strokeWidth={3} className="group-focus:animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Access_Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  className="flex items-center gap-3 px-4 py-4 focus:bg-black focus:text-white rounded-none cursor-pointer transition-colors"
                >
                  <Settings size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">System_Prefs</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-black/10 my-1" />

                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-4 focus:bg-red-600 focus:text-white rounded-none cursor-pointer transition-colors group"
                >
                  <LogOut size={14} strokeWidth={3} className="group-focus:translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terminate_Session</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* SIDEBAR NAVIGATION PANEL */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl p-10 flex flex-col border-r border-black"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-black animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.4em] text-black uppercase">Navigation_Index</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 border border-black/5 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {[
                  { name: "Home", path: "/shop/home" },
                  { name: "Collections", path: "/shop/listing" },
                  { name: "My Account", path: "/shop/account" },
                  { name: "Checkout", path: "/shop/checkout" },
                ].map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="group flex items-center justify-between py-2"
                      >
                        <span className={`text-5xl font-black tracking-tighter transition-all italic transform -skew-x-12
                          ${isActive ? "text-black" : "text-black/10 hover:text-black hover:-translate-x-2"}`}>
                          {item.name}<span className="text-red-500 opacity-0 group-hover:opacity-100">_</span>
                        </span>
                        {isActive && (
                          <motion.div layoutId="activeArrow">
                            <ArrowRight className="text-black" strokeWidth={4} />
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-10 border-t border-black/10">
                <div className="flex items-center gap-5 p-4 bg-slate-50 border border-black/5">
                  <div className="w-14 h-14 bg-black flex items-center justify-center font-black text-white text-xl">
                    {userInitial}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-black text-black uppercase tracking-tighter truncate leading-tight italic">
                      {displayName}
                    </p>
                    <p className="text-[9px] font-bold text-black/40 tracking-[0.2em] mt-1 uppercase">
                      Status // {isAuthenticated ? "Active_Node" : "Auth_Required"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;