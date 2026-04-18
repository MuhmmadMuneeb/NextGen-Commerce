import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  User,
  LogOut,
  Settings,
  Activity,
  ChevronDown,
  ShoppingBag,
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

const Header = ({ setOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const { cartItems } = useSelector((state) => state.shopCart || { cartItems: [] });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <header
      className={`fixed top-0 inset-x-0 z-[60] px-6 py-4 flex items-center justify-between transition-all duration-500
      ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-black/10 py-3" : "bg-transparent"}`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setOpen?.(true)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex flex-col gap-1">
            <span className="h-[2px] w-5 bg-black group-hover:w-8 transition-all" />
            <span className="h-[2px] w-8 bg-black" />
            <span className="h-[2px] w-4 bg-black group-hover:w-8 transition-all" />
          </div>
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-black transition-colors">
            Menu_Panel
          </span>
        </button>
      </div>

      {/* CENTER */}
      <Link to="/shop/home" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase -skew-x-12">
          Aura<span className="text-black/20">.</span>
        </h1>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden sm:flex p-2 hover:bg-black hover:text-white transition-all duration-300">
          <Search size={18} strokeWidth={2.5} className="stroke-current" />
        </button>

        {/* CART */}
        <div className="relative">
          <button
            onClick={() => setOpenCartSheet(true)}
            className="p-2 hover:bg-black hover:text-white transition-all duration-300 relative group"
          >
            <ShoppingBag size={18} strokeWidth={2.5} className="stroke-current" />
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

        {/* PROFILE DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar className="h-9 w-9 rounded-none border border-black/10 group-hover:border-black transition-all">
                <AvatarFallback className="bg-black text-white group-hover:bg-white group-hover:text-black text-[10px] font-black rounded-none transition-colors border-2 border-transparent group-hover:border-black">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <ChevronDown size={12} className="text-black/30 group-hover:text-black transition-colors stroke-current" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-none border-2 border-black bg-white p-0 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] z-[100] font-mono"
          >
            <DropdownMenuLabel className="px-5 py-5 border-b border-black/5 bg-slate-50/50">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={10} className="text-black/40 stroke-current" />
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40">
                  Authorized_User
                </p>
              </div>
              <p className="text-sm font-black truncate uppercase tracking-tighter italic">
                {displayName}
              </p>
            </DropdownMenuLabel>

            <div className="p-1">
              {/* ACCOUNT */}
              <DropdownMenuItem
                onClick={() => navigate("/shop/account")}
                className="flex items-center gap-3 px-4 py-4 cursor-pointer"
              >
                <User size={14} strokeWidth={3} className="stroke-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Access_Account
                </span>
              </DropdownMenuItem>

              {/* SETTINGS */}
              <DropdownMenuItem
                className="flex items-center gap-3 px-4 py-4 cursor-pointer"
              >
                <Settings size={14} strokeWidth={3} className="stroke-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  System_Prefs
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-black/10 my-1" />

              {/* LOGOUT */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-4 cursor-pointer"
              >
                <LogOut size={14} strokeWidth={3} className="stroke-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Terminate_Session
                </span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;