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
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/productDetails";
import { fetchProductDetails } from "../../store/shop/Shop-product-slice/index";

function createSearchParamsHelper(filters) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, isLoading, productDetails } = useSelector((state) => state.products);
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Load initial filters from SessionStorage
  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(savedFilters);
  }, []);

  const handleGetProductDetails = (id) => {
    dispatch(fetchProductDetails(id));
  };
  const handleFilter = (sectionId, currentOption) => {
    let cpyFilters = { ...filters };

    if (!cpyFilters[sectionId]) {
      // Create new category if it doesn't exist
      cpyFilters[sectionId] = [currentOption];
    } else {
      const indexOfCurrentOption = cpyFilters[sectionId].indexOf(currentOption);
      if (indexOfCurrentOption === -1) {
        // Add option if not present
        cpyFilters[sectionId] = [...cpyFilters[sectionId], currentOption];
      } else {
        // Remove option if already present (Toggle off)
        cpyFilters[sectionId] = cpyFilters[sectionId].filter(item => item !== currentOption);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  // Sync state to URL search parameters
  useEffect(() => {
    const createQueryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(createQueryString));
  }, [filters]);

  // Fetch products
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(

        allProducts({
          filterParams: filters,
          sortParams: sort,
        })
      );
    }
  }, [dispatch, filters, sort]);


  useEffect(() => {
    if (productDetails) {
      setOpen(true);
    }
  }, [productDetails]);

  return (
    <div  className="min-h-screen bg-white text-black font-mono">
      {/* 01. UTILITY BAR */}
      <div className="border-b border-black/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-black animate-pulse" />
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
        <aside className="w-full md:w-[320px] md:border-r border-black/5 p-8 bg-slate-50/50">
          <div className="sticky top-28">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16 border-b border-black/10 pb-10">
            <h1 className="text-7xl sm:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              The<br /><span className="text-black/10 hover:text-black transition-colors">Archive_</span>
            </h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-black/20 rounded-none h-14 px-8 group">
                  <span className="text-xs uppercase font-black tracking-[0.2em]">Sort_Order</span>
                  <ArrowUpDownIcon className="ml-3 h-4 w-4 opacity-40 group-hover:rotate-180 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-black rounded-none min-w-[240px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {[
                    { id: "price-lowtohigh", label: "SORT // Price_Ascending" },
                    { id: "price-hightolow", label: "SORT // Price_Descending" },
                    { id: "title-atoz", label: "INDEX // Alpha_A_Z" },
                    { id: "title-ztoa", label: "INDEX // Alpha_Z_A" },
                  ].map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id} className="py-4 text-xs font-bold tracking-wider">
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* TELEMETRY BAR */}
          <div className="flex items-center justify-between mb-12 px-6 py-4 border border-black/10 bg-slate-50/50">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em] flex items-center gap-1">
                <ActivityIcon className="w-2.5 h-2.5" /> Data_Stream //
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black italic tracking-tighter">
                  {isLoading ? "---" : productList?.length || 0}
                </span>
                <span className="text-[10px] font-bold uppercase">Units_Detected</span>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 mx-12 h-[1px] bg-black/10 relative">
              <div
                className="absolute inset-y-0 left-0 bg-black transition-all duration-1000"
                style={{ width: isLoading ? "0%" : `${Math.min((productList?.length / 20) * 100, 100)}%` }}
              />
            </div>

            <div className="text-right">
              <span className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em]">System_Status</span>
              <div className="text-[10px] font-black uppercase flex items-center gap-2">
                <div className={`h-1.5 w-1.5 ${isLoading ? 'bg-yellow-400 animate-bounce' : 'bg-black animate-pulse'}`} />
                {isLoading ? "Fetching..." : "Verified"}
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse border border-black/5" />
              ))
            ) : productList?.length > 0 ? (
              productList.map((product) => (
                <div key={product._id} className="relative group border border-black/5 p-2 hover:border-black transition-all">
                  <div className="absolute bottom-4 left-4 bg-black text-white text-[9px] font-bold px-2 py-0.5 opacity-0 group-hover:opacity-100 z-10">
                    REF_{product._id.substring(0, 6)}
                  </div>
                  <ShoppingProductTile
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-48 text-center bg-slate-50 border-2 border-black/5">
                <span className="text-xs uppercase tracking-[0.5em] text-black/20 font-black italic">ERROR: NULL_RESULT_RETURNED</span>
              </div>
            )}
          </div>
        </main>
      </div>
      <ProductDetailsDialog open={open} setOpen={setOpen} productDetails={productDetails} />

    </div>
  );
};

export default ShoppingListing;