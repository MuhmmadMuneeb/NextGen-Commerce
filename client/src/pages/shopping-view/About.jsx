import React from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Zap, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { label: "ESTABLISHED", value: "2026.04" },
    { label: "REGION", value: "SARGODHA_PK" },
    { label: "VERSION", value: "v4.0.2" },
    { label: "STATUS", value: "ACTIVE" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono pt-24 pb-12 px-6 md:px-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto border-4 border-black p-8 md:p-16 mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 transform -skew-x-12"
        >
          Aura_System<span className="text-black/10">.txt</span>
        </motion.h1>
        <p className="text-xl md:text-2xl font-bold max-w-3xl leading-tight">
          WE ARE A MULTIDISCIPLINARY DIGITAL HUB SPECIALIZING IN HIGH-CONTRAST 
          INTERFACE DESIGN AND ROBUST WEB ARCHITECTURE. BUILT FOR THE NEXT GENERATION.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="border-2 border-black p-6 bg-slate-50">
            <p className="text-[10px] font-black text-black/40 mb-2">{stat.label}</p>
            <p className="text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-4xl font-black uppercase underline decoration-4 underline-offset-8">Mission_Protocol</h2>
          <p className="text-lg font-medium opacity-80">
            Our objective is to bridge the gap between brutalist aesthetics and seamless user 
            functionality. We believe that digital experiences should be bold, unapologetic, 
            and technically superior.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: <Shield size={20} />, text: "END-TO-END SECURITY ENCRYPTION" },
              { icon: <Zap size={20} />, text: "ULTRA-FAST LCP LOAD SPEEDS" },
              { icon: <Globe size={20} />, text: "GLOBAL COMMERCE READY" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-crosshair">
                {item.icon}
                <span className="font-black text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-4 border-black bg-black flex items-center justify-center p-12 overflow-hidden relative group">
           <Terminal size={200} className="text-white opacity-10 group-hover:scale-110 transition-transform duration-500" />
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-5xl font-black italic -skew-x-12 border-2 border-white p-4">SYSTEM_CORE</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;