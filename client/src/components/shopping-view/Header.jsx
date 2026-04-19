import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search, User, LogOut, Settings, Activity, ChevronDown, ShoppingBag } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/store/auth_slice/index";
import { fetchCartItems } from "@/store/cart-slice";
import UserCartWrapper from "./UserCartWrapper";

const Header = ({ setOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // Check both common slice names to be safe
  const cartState = useSelector((state) => state.shopCart || state.cart);
  const userId = user?.id || user?._id;

  // DATA NORMALIZATION: This ensures 'manifestItems' is ALWAYS an array
  const manifestItems = useMemo(() => {
    const data = cartState?.cartItems;
    if (!data) return [];
    return Array.isArray(data) ? data : data.items || [];
  }, [cartState]);

  const totalCartItems = useMemo(() => 
    manifestItems.reduce((acc, item) => acc + (item?.quantity || 0), 0),
  [manifestItems]);

  useEffect(() => {
    if (userId) dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

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
    <header className={`fixed top-0 inset-x-0 z-[60] px-6 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-black/10 py-3" : "bg-transparent"}`}>
      <div className="flex items-center gap-6">
        <button onClick={() => setOpen?.(true)} className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col gap-1">
            <span className="h-[2px] w-5 bg-black group-hover:w-8 transition-all" />
            <span className="h-[2px] w-8 bg-black" />
            <span className="h-[2px] w-4 bg-black group-hover:w-8 transition-all" />
          </div>
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Menu_Panel</span>
        </button>
      </div>

      <Link to="/shop/home" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase -skew-x-12 text-black">Aura<span className="text-black/20">.</span></h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button onClick={() => setOpenCartSheet(true)} className="p-2 hover:bg-black hover:text-white transition-all relative group">
            <ShoppingBag size={18} strokeWidth={2.5} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
          <UserCartWrapper 
            openCartSheet={openCartSheet} 
            setOpenCartSheet={setOpenCartSheet} 
            cartItems={manifestItems} 
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar className="h-9 w-9 rounded-none border border-black/10 group-hover:border-black">
                <AvatarFallback className="bg-black text-white text-[10px] font-black rounded-none">
                  {(user?.userName || user?.name || "G").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDown size={12} className="text-black/30 group-hover:text-black" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-none border-2 border-black bg-white p-0 font-mono z-[100]">
            <DropdownMenuLabel className="px-5 py-5 border-b border-black/5 bg-slate-50/50">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 mb-1">Authorized_User</p>
              <p className="text-sm font-black truncate uppercase italic">{user?.userName || "Guest_Access"}</p>
            </DropdownMenuLabel>
            <div className="p-1">
              <DropdownMenuItem onClick={() => navigate("/shop/account")} className="flex items-center gap-3 px-4 py-4 cursor-pointer focus:bg-black focus:text-white">
                <User size={14} /> <span className="text-[10px] font-black uppercase">Access_Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 px-4 py-4 cursor-pointer focus:bg-red-600 focus:text-white">
                <LogOut size={14} /> <span className="text-[10px] font-black uppercase">Terminate_Session</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;