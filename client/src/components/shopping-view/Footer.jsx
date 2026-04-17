import React from "react";
import { Instagram, Twitter, Facebook } from "lucide-react";


const Footer = () => (
  <footer className="bg-white border-t-4 border-black p-8 md:p-16 font-mono text-black mt-20">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <h2 className="text-4xl font-black italic tracking-tighter mb-4">NEXT_GEN<span className="text-black/20">/</span>ECOM</h2>
        <p className="text-xs font-bold leading-relaxed max-w-sm uppercase opacity-60">
          Decentralized inventory management and semantic product discovery. 
          All systems operational. [STABLE_BUILD_4.0]
        </p>
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-2">Internal_Links</span>
        {['Shipping', 'Returns', 'Privacy_Vault', 'System_Status'].map(link => (
          <a key={link} href="#" className="text-xs font-black uppercase hover:underline">/{link}</a>
        ))}
      </div>

      <div className="flex flex-col gap-2 text-right md:text-left">
        <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-2">Connect_Protocol</span>
        <div className="flex gap-4">
           <Instagram size={20} /> <Twitter size={20} /> <Facebook size={20} />
        </div>
      </div>
    </div>
    
    <div className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <span className="text-[9px] font-black tracking-[0.5em] opacity-30">©2026_ARCHIVE_RESERVED</span>
      <div className="flex gap-8 text-[9px] font-black uppercase opacity-30">
        <span>LOC: PAKISTAN_SARGODHA</span>
        <span>LAT: 32.0836° N</span>
        <span>LONG: 72.6711° E</span>
      </div>
    </div>
  </footer>
);

export default Footer;