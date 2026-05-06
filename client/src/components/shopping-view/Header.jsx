import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search, User, LogOut, ShoppingBag, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/store/auth_slice/index";
import { fetchCartItems } from "@/store/cart-slice";
import UserCartWrapper from "./UserCartWrapper";
import { allProducts } from "../../store/shop/Shop-product-slice/index";
const Header = ({ setOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  console.log(search)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.shopCart || state.cart);
  const userId = user?.id || user?._id;

  const manifestItems = useMemo(() => {
    const data = cartState?.cartItems;
    if (!data) return [];
    return Array.isArray(data) ? data : data.items || [];
  }, [cartState]);

  const totalCartItems = useMemo(
    () => manifestItems.reduce((acc, item) => acc + (item?.quantity || 0), 0),
    [manifestItems]
  );

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
  const handleInput = (e) => {
    console.log(e)

  }


  const handleSearch = () => {
    dispatch(
      allProducts({
        filterParams: search,
      }))
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ease-in-out ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
          }`}
      >
        {/* Main Navigation Row (Fixed Height: 64px / h-16) */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Menu Toggle */}
          <button
            onClick={() => setOpen?.(true)}
            className="flex flex-col gap-[5px] p-2 -ml-2 group"
          >
            <span className="h-[1.5px] w-5 bg-black transition-all group-hover:w-6" />
            <span className="h-[1.5px] w-6 bg-black" />
            <span className="h-[1.5px] w-4 bg-black transition-all group-hover:w-6" />
          </button>

          {/* Logo */}
          <Link to="/shop/home" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-2xl font-black italic tracking-tighter uppercase -skew-x-12">
              Aura<span className="text-black/20">.</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className={`p-2 rounded-full transition-colors ${searchOpen ? 'bg-black text-white' : 'hover:bg-black/5'}`}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            <button
              onClick={() => setOpenCartSheet(true)}
              className="relative p-2 rounded-full hover:bg-black/5"
            >
              <ShoppingBag size={18} />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="ml-1 outline-none">
                <Avatar className="h-8 w-8 ring-1 ring-black/5">
                  <AvatarFallback className="bg-black text-white text-xs">
                    {(user?.userName || "G").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-bold">{user?.userName || "Guest"}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate("/shop/account")}>Account</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* --- DYNAMIC SEARCH SECTION --- */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-black/5 bg-neutral-50 ${searchOpen ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 border border-black/10 px-3 py-2 bg-white">
              <Search size={14} className="text-black/30" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs border border-black/10 px-3 py-2.5 bg-white outline-none"
            >
              <option value="">Category</option>
              <option value="shoes">Shoes</option>
              <option value="shirts">Shirts</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              Go
            </button>
          </div>
        </div>
      </header>
      <div
        className={`transition-all duration-300 ease-in-out ${searchOpen ? "h-[144px]" : "h-16"
          }`}
      />

      <UserCartWrapper
        openCartSheet={openCartSheet}
        setOpenCartSheet={setOpenCartSheet}
        cartItems={manifestItems}
      />
    </>
  );
};

export default Header;