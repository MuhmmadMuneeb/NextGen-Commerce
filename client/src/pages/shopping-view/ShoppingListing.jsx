import React, { useEffect, useState } from "react";
import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon, ScanQrCodeIcon, ActivityIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../store/shop/Shop-product-slice/index";
import ShoppingProductTile from "../../components/shopping-view/ProductTile";

const sortOptions = [
  { id: "price-lowtohigh", label: "SORT // Price_Ascending" },
  { id: "price-hightolow", label: "SORT // Price_Descending" },
  { id: "title-atoz", label: "INDEX // Alpha_A_Z" },
  { id: "title-ztoa", label: "INDEX // Alpha_Z_A" },
];

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.products);
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch, sort, filters]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-mono">
      {/* 01. SURGICAL UTILITY BAR */}
      <div className="border-b border-black/10 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-none bg-black animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/60">Registry: Active_Session</span>
        </div>
        <div className="flex items-center gap-2 border border-black/10 px-4 py-1.5 bg-black text-white">
          <ScanQrCodeIcon className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black">
            INV_{productList?.length || 0}_UNITS
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* 02. MINIMALIST SIDEBAR */}
        <aside className="w-full md:w-[320px] md:border-r border-black/5 p-8 md:min-h-screen bg-slate-50/50">
          <div className="sticky top-28">
            <h2 className="text-5xl font-black italic tracking-tighter mb-1 transform -skew-x-12 leading-none">
              FILTER<span className="text-black/20">/</span>
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-12 font-bold">Parameters.config</p>
            
            <ProductFilter filters={filters} handleFilter={() => {}} />
          </div>
        </aside>

        {/* 03. MAIN CONTENT AREA */}
        <main className="flex-1 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16 border-b border-black/10 pb-10">
            <div>
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] select-none text-black">
                The<br /> 
                <span className="text-black/10 hover:text-black transition-colors duration-500">Archive_</span>
              </h1>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-black/20 bg-white hover:bg-black hover:text-white rounded-none h-14 px-8 group transition-all">
                  <span className="text-xs uppercase font-black tracking-[0.2em]">Sort_Order</span>
                  <ArrowUpDownIcon className="ml-3 h-4 w-4 opacity-40 group-hover:rotate-180 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-black rounded-none min-w-[240px] p-0 shadow-[10px_10px_0px_rgba(0,0,0,0.1)]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id} className="text-black/70 focus:bg-black focus:text-white rounded-none py-4 px-4 text-xs font-bold tracking-wider cursor-pointer border-b border-black/5 last:border-0">
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* NEW: PRODUCT TELEMETRY DATA BAR */}
          <div className="flex items-center justify-between mb-12 px-6 py-4 border border-black/10 bg-slate-50/50">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em] flex items-center gap-1">
                  <ActivityIcon className="w-2.5 h-2.5" /> Data_Stream //
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black italic tracking-tighter">
                    {isLoading ? "---" : productList?.length || 0}
                  </span>
                  <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                    Units_Detected
                  </span>
                </div>
              </div>
            </div>

            {/* Tactical Visual Loading/Fill Bar */}
            <div className="hidden lg:flex flex-1 mx-12 h-[1px] bg-black/10 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-black transition-all duration-1000 ease-out" 
                style={{ width: isLoading ? "0%" : `${Math.min((productList?.length / 20) * 100, 100)}%` }}
              />
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em]">
                System_Status
              </span>
              <span className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-none ${isLoading ? 'bg-yellow-400 animate-bounce' : 'bg-black animate-pulse'}`} />
                {isLoading ? "Fetching..." : "Verified"}
              </span>
            </div>
          </div>

          {/* 04. PRODUCT GRID */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse border border-black/5 flex items-center justify-center">
                   <span className="text-[8px] text-black/20 font-bold uppercase tracking-[0.5em]">Buffering_ID_{i}</span>
                 </div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
              {productList && productList.length > 0 ? (
                productList.map((product) => (
                  <div key={product._id} className="relative group overflow-hidden border border-black/5 p-2 hover:border-black transition-colors duration-300">
                    <div className="absolute bottom-4 left-4 bg-black text-white text-[9px] font-bold px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      REF_{product._id.substring(0,6)}
                    </div>
                    <ShoppingProductTile product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full border-2 border-black/5 py-48 text-center bg-slate-50">
                  <span className="text-xs uppercase tracking-[0.5em] text-black/20 font-black italic">ERROR: NULL_RESULT_RETURNED</span>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShoppingListing;