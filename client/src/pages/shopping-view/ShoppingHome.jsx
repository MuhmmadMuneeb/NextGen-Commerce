import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "@/components/shopping-view/HeroSlider";
import ProductGrid from "@/components/shopping-view/ProductGrid";
import { Globe, Zap, Cpu } from "lucide-react";

const ShoppingHome = () => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      
      {/* UTILITY TOP BAR */}
      <div className="border-b-2 border-black px-6 py-3 flex justify-between items-center sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-black animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Aura_Core_v4.0.1 // Online</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <Link to="/shop/listing" className="hover:line-through cursor-pointer">Archive</Link>
          <span className="opacity-20">//</span>
          <span className="cursor-pointer hover:line-through text-red-500">Emergency_Exit</span>
        </div>
      </div>

      {/* IMPORTED MODULAR COMPONENTS */}
      <HeroSlider />
      
      {/* MARQUEE TICKER (Below Hero) */}
      <div className="bg-black text-white py-3 border-b-2 border-black overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee font-black text-[10px] uppercase tracking-[0.5em]">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-12">
              Global_Deployment_Active // 0% Latency // SECURE_SOCKET_LAYER_ON //
            </span>
          ))}
        </div>
      </div>

      <ProductGrid />

      {/* SPECS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-y-4 border-black">
        {[
          { icon: <Zap size={20} />, label: "SPEED", val: "200ms_Deployment" },
          { icon: <Globe size={20} />, label: "ORIGIN", val: "Global_Sourcing" },
          { icon: <Cpu size={20} />, label: "CORE", val: "MERN_v.4_Engine" }
        ].map((item, i) => (
          <div key={i} className="p-12 border-b-2 md:border-b-0 md:border-r-4 border-black last:border-r-0 flex flex-col items-center text-center space-y-4 hover:bg-black hover:text-white transition-all group cursor-default">
            <div className="p-4 border-2 border-black group-hover:border-white transition-colors">
              {item.icon}
            </div>
            <p className="text-[10px] font-black tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">{item.label}</p>
            <p className="text-xs font-bold uppercase">{item.val}</p>
          </div>
        ))}
      </section>

      {/* FOOTER TICKER */}
      <div className="bg-white py-4 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee font-black text-[10px] uppercase tracking-[0.5em]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-12">
              Next_Gen_Systems // Global_Sourcing // Secure_Checkout_Active // 24/7_Telemetry_Monitor //
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ShoppingHome;