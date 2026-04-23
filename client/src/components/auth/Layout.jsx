import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Activity } from 'lucide-react';

const AuthLayout = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login');

    return (
        <section className='h-screen flex flex-col lg:flex-row items-center bg-white text-black font-mono overflow-hidden'>
            
            {/* LEFT SIDE: Technical Branding */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='hidden lg:flex flex-col justify-between h-full w-[40%] bg-black text-white p-12 relative overflow-hidden'
            >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <div className="z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-8 bg-white animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Auth_Protocol_v4</span>
                    </div>
                    <h1 className="text-7xl font-black italic uppercase leading-[0.85] tracking-tighter -skew-x-12">
                        THE<br />ARCHIVE_
                    </h1>
                </div>

                <div className="z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <ShieldCheck className="text-white/40" size={32} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Secure_Access</p>
                            <p className="text-xs font-bold">AES-256 Encrypted Tunnel</p>
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                        System initialization requires identity verification. Accessing the archive grants full requisition privileges.
                    </p>
                </div>

                {/* Decorative Matrix-style text */}
                <div className="absolute bottom-[-10%] right-[-10%] text-[15vw] font-black italic opacity-5 select-none uppercase">
                    Aura
                </div>
            </motion.div>

            {/* RIGHT SIDE: Terminal Form Area */}
            <div className='flex-1 flex justify-center items-center p-8 bg-[url("https://www.transparenttextures.com/patterns/graphy.png")]'>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='w-full max-w-md bg-white border-4 border-black p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative'
                >
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black bg-black text-white">
                        <Terminal size={14} />
                    </div>

                    <div className='space-y-2 mb-10'>
                        <div className="flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-widest">
                            <Activity size={12} /> Live_Connection
                        </div>
                        <h2 className='text-4xl font-black uppercase italic tracking-tighter'>
                            {isLogin ? "Init_Login" : "Register_ID"}
                        </h2>
                    </div>

                    {/* Navigation Tabs */}
                    <div className='flex items-center gap-0 border-4 border-black mb-10'>
                        <Link 
                            to="/auth/login" 
                            className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                ${isLogin ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-50'}`}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/auth/register" 
                            className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                ${!isLogin ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-50'}`}
                        >
                            Register
                        </Link>
                    </div>

                    {/* Form Outlet */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="min-h-[300px]"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>

                    {/* Social Logic */}
                    <div className='mt-10 pt-8 border-t-2 border-black border-dashed'>
                        <span className='block text-center text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-6'>
                            External_Identity_Sync
                        </span>
                        <div className='grid grid-cols-3 gap-4'>
                            {['Google', 'Github', 'LinkedIn'].map((social) => (
                                <button 
                                    key={social} 
                                    className='py-3 border-2 border-black text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all cursor-pointer'
                                >
                                    {social}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AuthLayout;