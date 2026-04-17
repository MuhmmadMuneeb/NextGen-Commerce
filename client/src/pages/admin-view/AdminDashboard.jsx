import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity,
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';

const stats = [
  { label: 'Total_Revenue', value: '$45,231.89', icon: DollarSign, trend: '+12.5%', color: 'text-black bg-white' },
  { label: 'Active_Orders', value: '154', icon: ShoppingCart, trend: '+3.2%', color: 'text-white bg-zinc-900 border-zinc-700' },
  { label: 'Registry_Users', value: '2,420', icon: Users, trend: '+18.1%', color: 'text-white bg-black border-white/20' },
  { label: 'System_Health', value: '99.9%', icon: ShieldCheck, trend: 'STABLE', color: 'text-emerald-500 bg-black border-emerald-500/20' },
];

const AdminDashboard = () => {
  return (
    <div className="relative space-y-10 font-mono text-white cursor-default">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b-4 border-zinc-800 pb-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">DASHBOARD_V4</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic transform -skew-x-12 cursor-text">
            SYSTEM<span className="text-white/10">/</span>OVERVIEW
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-3 w-3 bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 cursor-help">
              Protocol_Status: <span className="text-emerald-500 underline decoration-dotted">OPTIMAL_READY</span>
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-4">
            <div className="border-2 border-white bg-white px-4 py-2 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
               <span className="text-[10px] font-black uppercase tracking-widest">GENERATE_REPORT.EXE</span>
            </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-4 border-zinc-800 bg-[#09090b] p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] hover:border-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 border-2 ${stat.color} transition-colors group-hover:bg-white group-hover:text-black`}>
                <stat.icon size={24} strokeWidth={3} />
              </div>
              <div className="text-[10px] font-black border-2 border-emerald-500/50 text-emerald-500 px-2 py-1 flex items-center gap-1">
                {stat.trend} <ArrowUpRight size={12} />
              </div>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400">{stat.label}</p>
            <h3 className="text-3xl font-black tracking-tighter mt-1 text-white group-hover:italic">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* DATA VISUALIZATION AREA */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Analytics Block */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 border-4 border-zinc-800 bg-[#09090b] p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] flex flex-col min-h-[400px]"
        >
          <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-8">
             <div className="flex items-center gap-2 cursor-pointer group">
                <Activity size={20} className="group-hover:text-emerald-500" />
                <h3 className="text-sm font-black uppercase tracking-widest group-hover:underline">Visual_Analytics_Stream</h3>
             </div>
             <span className="text-[10px] font-bold text-emerald-500/40">[ LIVE_ENCRYPTED_FEED ]</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 bg-black relative overflow-hidden cursor-crosshair">
             {/* Dark Grid Lines */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
             
             <Terminal size={48} className="text-zinc-800 mb-4 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Awaiting_Data_Packet...</p>
             <div className="mt-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [10, 40, 15, 30, 10] }}
                    transition={{ repeat: Infinity, duration: 1 + (i * 0.2), ease: "easeInOut" }}
                    className="w-1.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                  />
                ))}
             </div>
          </div>
        </motion.div>

        {/* System Health Block */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-4 border-white bg-white text-black p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] flex flex-col cursor-default"
        >
          <div className="flex items-center gap-2 mb-8 border-b-4 border-black pb-4">
            <Cpu size={24} strokeWidth={2.5} />
            <h3 className="text-md font-black uppercase tracking-tighter italic transform -skew-x-6">NODE_HEALTH</h3>
          </div>

          <div className="space-y-6 flex-1">
            {[
              { n: 'CORE_ENGINE', s: 'ONLINE', p: '98%' },
              { n: 'DB_RELAY', s: 'SYNCING', p: '45%' },
              { n: 'AUTH_PROXY', s: 'SECURE', p: '100%' }
            ].map((node, i) => (
              <div key={i} className="group border-b-2 border-black/10 pb-3 hover:border-black transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-black/50 uppercase italic group-hover:text-black">{node.n}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 border-2 border-black ${node.s === 'SYNCING' ? 'bg-black text-white' : 'bg-emerald-500 text-black'}`}>
                    {node.s}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-black/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: node.p }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t-2 border-dashed border-black/20">
            <p className="text-[9px] font-black text-black/40 uppercase tracking-tighter mb-4">
              Uptime: <span className="text-black">1,422_HOURS_NON_STOP</span>
            </p>
            <div className="h-10 w-full border-4 border-black bg-black flex items-center px-1 overflow-hidden relative">
               <motion.div 
                 animate={{ x: [-200, 400] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent w-1/2"
               />
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '92%' }}
                 transition={{ duration: 2 }}
                 className="h-4 bg-emerald-500 border-2 border-black z-10" 
               />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;