import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/store/shop/Shop-product-slice";
import { toast } from "sonner";
import { addToCart } from "@/store/cart-slice";
import { 
  ArrowUpRight, 
  Command, 
  Globe, 
  Zap, 
  Cpu,
  Scan,
  Maximize
} from "lucide-react";

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productList, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetching high-value items for the home display
    dispatch(allProducts({ filterParams: {}, sortParams: "price-hightolow" }));
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("AUTH_ERROR: Secure login required to modify manifest.");
      return;
    }
    dispatch(addToCart({ userId, productId, quantity: 1 })).then((res) => {
      if (res?.payload?.success) toast.success("SYSTEM: Unit added to cart registry.");
    });
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white">
      
      {/* 01. UTILITY TOP BAR */}
      <div className="border-b-2 border-black px-6 py-3 flex justify-between items-center sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-black animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Aura_Core_v4.0.1 // Online</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <Link to="/shop/listing" className="hover:line-through cursor-pointer">Archive</Link>
          <span className="opacity-20">//</span>
          <span className="cursor-pointer hover:line-through">Telemetry</span>
          <span className="opacity-20">//</span>
          <span className="cursor-pointer hover:line-through text-red-500">Emergency_Exit</span>
        </div>
      </div>

      {/* 02. HERO SECTION */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black min-h-[85vh]">
        
        {/* HERO LEFT */}
        <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
          <div className="space-y-6">
            <h1 className="text-[12vw] lg:text-[9vw] font-black italic tracking-tighter leading-[0.8] uppercase -skew-x-12">
              NEXT<br />
              <span className="bg-black text-white px-4 ml-[-1rem]">GEN_SYS</span>
            </h1>
            <p className="max-w-md text-xs font-bold text-black/60 uppercase tracking-widest leading-relaxed">
              Technical apparel deployment for the modern engineer. 
              High-performance units cataloged and ready for requisition.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-0 border-4 border-black w-fit group cursor-pointer">
            <Button 
              onClick={() => navigate('/shop/listing')}
              className="h-20 px-12 bg-black text-white rounded-none uppercase font-black text-sm hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Access_Archive
            </Button>
            <div className="h-20 px-10 flex items-center bg-white border-t-4 sm:border-t-0 sm:border-l-4 border-black group-hover:bg-slate-50 transition-colors">
               <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
            </div>
          </div>
        </div>

        {/* HERO RIGHT: FEATURED IMAGE */}
        <div className="lg:col-span-5 relative group overflow-hidden bg-slate-100 cursor-crosshair">
           <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop" 
              alt="Feature"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
           />
           <div className="absolute top-8 right-8 bg-black text-white p-4 italic font-black text-2xl -rotate-12 group-hover:rotate-0 transition-transform">
              NEW_MANIFEST
           </div>
           <div className="absolute bottom-0 left-0 w-full p-6 bg-white/90 border-t-2 border-black flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest">Protocol_01: Aesthetic_Precision</span>
              <Scan size={18} className="animate-spin-slow" />
           </div>
        </div>
      </section>

      {/* 03. LIVE TICKER */}
      <div className="bg-black text-white py-3 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee font-black text-[10px] uppercase tracking-[0.5em]">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-12">
              Global_Deployment_Active // 0% Latency // SECURE_SOCKET_LAYER_ON // New_Units_Detected //
            </span>
          ))}
        </div>
      </div>

      {/* 04. PRODUCT GRID */}
      <section className="p-8 md:p-16 bg-slate-50">
        <div className="flex justify-between items-end mb-16 border-b-4 border-black pb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Latest_Entry_Logs
          </h2>
          <Maximize size={32} className="hidden md:block opacity-20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white border-2 border-black/5 animate-pulse" />
            ))
          ) : (
            productList.slice(0, 8).map((product) => (
              <div 
                key={product._id} 
                className="group relative bg-white border-2 border-black p-4 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <div className="aspect-square bg-slate-100 mb-6 overflow-hidden border border-black/5">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="space-y-2 mb-6">
                   <p className="text-[9px] font-black text-black/40 uppercase tracking-widest">REF_{product._id.substring(0,8)}</p>
                   <h3 className="text-sm font-black uppercase tracking-tighter truncate">{product.title}</h3>
                   <p className="text-lg font-black italic">${product.price}</p>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigating when clicking the button
                    handleAddToCart(product._id);
                  }}
                  className="w-full h-12 bg-white border-2 border-black text-black rounded-none uppercase font-black text-[10px] hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Request_Unit [+]
                </Button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 05. SPECS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-y-4 border-black">
        {[
          { icon: <Zap size={20} />, label: "SPEED", val: "200ms_Deployment" },
          { icon: <Globe size={20} />, label: "ORIGIN", val: "Global_Sourcing" },
          { icon: <Cpu size={20} />, label: "CORE", val: "MERN_v.4_Engine" }
        ].map((item, i) => (
          <div key={i} className="p-12 border-b-2 md:border-b-0 md:border-r-4 border-black last:border-r-0 flex flex-col items-center text-center space-y-4 hover:bg-black hover:text-white transition-all group cursor-default">
            <div className="p-4 border-2 border-black group-hover:border-white">
              {item.icon}
            </div>
            <p className="text-[10px] font-black tracking-[0.4em] opacity-40 group-hover:opacity-100">{item.label}</p>
            <p className="text-xs font-bold uppercase">{item.val}</p>
          </div>
        ))}
      </section>

      {/* 06. FINAL CALL TO ACTION */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto border-8 border-black p-12 md:p-20 relative">
          <div className="absolute -top-6 -left-6 bg-white border-4 border-black px-4 py-2 font-black text-xs uppercase">
            System_Output
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Join_The<br />Network_
          </h2>
          <Button 
            onClick={() => navigate('/shop/listing')}
            className="h-20 px-16 bg-black text-white rounded-none uppercase font-black tracking-[0.3em] text-xs hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Access_Full_Manifest
          </Button>
        </div>
      </section>

      {/* ANIMATION STYLES */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ShoppingHome;