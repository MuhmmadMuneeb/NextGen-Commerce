import React from 'react';
import { motion } from 'framer-motion';
// Added 'Activity' to the import list below
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', icon: DollarSign, trend: '+12.5%', color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/20' },
  { label: 'Active Orders', value: '154', icon: ShoppingCart, trend: '+3.2%', color: 'from-emerald-400 to-emerald-600', glow: 'shadow-emerald-400/20' },
  { label: 'Total Customers', value: '2,420', icon: Users, trend: '+18.1%', color: 'from-teal-500 to-emerald-700', glow: 'shadow-teal-500/20' },
  { label: 'System Health', value: '99.9%', icon: ShieldCheck, trend: 'Stable', color: 'from-slate-700 to-slate-900', glow: 'shadow-slate-500/10' },
];

const AdminDashboard = () => {
  return (
    <div className="relative space-y-8">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Welcome Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">
            System <span className="text-emerald-500">Overview</span>
          </h2>
          <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <TrendingUp className="h-4 w-4 text-emerald-500/50" />
            Operational status: <span className="text-emerald-400/80">Optimal</span>
          </p>
        </motion.div>
        
        <div className="hidden sm:block">
           <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Session ID: 882-X9</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className={`group relative overflow-hidden rounded-[24px] border border-emerald-500/10 bg-[#0f172a]/40 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-[#0f172a]/60 shadow-lg ${stat.glow}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-slate-950" />
              </div>
              <span className="flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                {stat.trend} <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </div>
            
            <div className="relative z-10 mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              <h3 className="mt-1 text-2xl font-black text-white tabular-nums">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="h-[400px] rounded-[32px] border border-emerald-500/5 bg-slate-950/40 p-8 backdrop-blur-md shadow-2xl"
        >
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold uppercase tracking-widest text-white">Visual Analytics</h3>
             <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          <div className="flex h-full items-center justify-center">
             <div className="text-center">
               <div className="inline-block rounded-full bg-emerald-500/5 p-4 mb-4">
                  <Activity className="h-8 w-8 text-emerald-500/20" />
               </div>
               <p className="text-xs font-medium text-slate-600 uppercase tracking-tighter">Real-time data stream offline</p>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="h-[400px] rounded-[32px] border border-emerald-500/5 bg-slate-950/40 p-8 backdrop-blur-md shadow-2xl"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Inventory Nodes</h3>
          <div className="mt-20 flex flex-col items-center justify-center space-y-4">
             <Package className="h-10 w-10 text-slate-800" />
             <div className="h-1 w-32 rounded-full bg-slate-900 overflow-hidden">
                <motion.div 
                  animate={{ x: [-128, 128] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="h-full w-1/2 bg-emerald-500/40"
                />
             </div>
             <p className="text-[10px] font-bold text-slate-600 uppercase">Synchronizing...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;