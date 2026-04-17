import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  Search, X, ArrowRight, User, LogOut, Settings, Activity, ChevronDown, ShoppingBag, Terminal
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
import UserCartWrapper from "./UserCartWrapper";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shopCart || { cartItems: [] });

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Robust Initial Logic
  const nameSource = user?.userName || user?.name || user?.email || "Guest";
  const userInitial = nameSource.charAt(0).toUpperCase();
  const displayName = user?.userName || user?.name || "Guest_Access";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* LEFT: TACTICAL MENU TRIGGER */}
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

        {/* CENTER: BRAND IDENT */}
        <Link to="/shop/home" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-black italic tracking-tighter text-black uppercase transform -skew-x-12">
            Aura<span className="text-black/20">.</span>
          </h1>
        </Link>

        {/* RIGHT: SEARCH, CART, PROFILE */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:flex p-2 hover:bg-black hover:text-white transition-all duration-300">
            <Search size={18} strokeWidth={2.5} />
          </button>

          {/* CART TRIGGER */}
          <div className="relative">
            <button
              onClick={() => setOpenCartSheet(true)}
              className="p-2 hover:bg-black hover:text-white transition-all duration-300 relative group"
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              {cartItems?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black px-1 min-w-[14px] animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>
            <UserCartWrapper
              openCartSheet={openCartSheet}
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems}
            />
          </div>

          <div className="h-6 w-[1px] bg-black/10 hidden sm:block mx-2" />


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer group">
                <Avatar className="h-9 w-9 rounded-none border border-black/10 group-hover:border-black transition-all duration-300">
                  <AvatarFallback className="bg-black text-white group-hover:bg-white group-hover:text-black text-[10px] font-black rounded-none transition-colors border-2 border-transparent group-hover:border-black">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={12} className="text-black/30 group-hover:text-black transition-colors" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 rounded-none border-2 border-black bg-white p-0 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] z-[100] font-mono"
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
                {/* ACCOUNT ITEM */}
                <DropdownMenuItem
                  onClick={() => navigate("/shop/account")}
                  className="flex items-center gap-3 px-4 py-4 rounded-none cursor-pointer group transition-colors
               data-[highlighted]:bg-black data-[highlighted]:[--accent-foreground:white]"
                >
                  <User
                    size={14}
                    strokeWidth={3}
                    className="text-[--accent-foreground] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--accent-foreground]">
                    Access_Account
                  </span>
                </DropdownMenuItem>

                {/* SETTINGS ITEM */}
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-4 rounded-none cursor-pointer group transition-colors
               data-[highlighted]:bg-black data-[highlighted]:[--accent-foreground:white]"
                >
                  <Settings
                    size={14}
                    strokeWidth={3}
                    className="text-[--accent-foreground] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--accent-foreground]">
                    System_Prefs
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-black/10 my-1" />

                {/* LOGOUT ITEM */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-4 rounded-none cursor-pointer group transition-colors
               data-[highlighted]:bg-red-600 data-[highlighted]:[--accent-foreground:white]"
                >
                  <LogOut
                    size={14}
                    strokeWidth={3}
                    className="text-[--accent-foreground] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--accent-foreground]">
                    Terminate_Session
                  </span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* FULL SCREEN SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 h-full w-full max-w-[450px] bg-white text-black z-[110] border-r-4 border-black flex flex-col p-8 md:p-12 font-mono"
            >
              <div className="flex justify-between items-start mb-20 border-b-2 border-black pb-8">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tighter transform -skew-x-12 uppercase">
                    Navigation<span className="text-black/20">/</span>SYS
                  </h2>
                  <p className="text-[10px] font-bold text-black/40 mt-1 uppercase tracking-widest">Access_Directory.exe</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {[
                  { name: "Home", path: "/shop/home" },
                  { name: "Collections", path: "/shop/listing" },
                  { name: "About_Us", path: "/shop/about" },
                  { name: "Contact_Service", path: "/shop/contact" },
                  { name: "Account_Root", path: "/shop/account" },
                ].map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`group flex items-center justify-between p-4 border transition-all ${isActive ? "bg-black text-white border-black" : "border-transparent hover:border-black"
                        }`}
                    >
                      <span className="text-3xl font-black uppercase tracking-tighter">{item.name}</span>
                      <ArrowRight size={24} className={`transition-transform ${isActive ? "translate-x-0" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 border-t-2 border-black">
                <div className="flex items-center gap-4 p-4 border-2 border-black bg-slate-50">
                  <Terminal size={20} />
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-black/40">Active_User</p>
                    <p className="font-black uppercase text-sm truncate">{displayName}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;