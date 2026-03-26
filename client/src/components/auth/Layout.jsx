import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login');

    return (
        <section className='h-screen flex items-center bg-gray-50 overflow-hidden'>
            {/* Left Side: Illustration with floating animation */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='h-full bg-[#a06df2] w-[40%] hidden lg:flex justify-center items-center relative overflow-hidden'
            >
                {/* Decorative background circles */}
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-purple-900/20 blur-3xl" />
                
                <motion.img 
                    src="/img.svg" 
                    className='h-96 z-10' 
                    alt="Illustration"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Right Side: Form Area */}
            <div className='flex w-full lg:w-[60%] justify-center items-center p-8'>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className='flex flex-col w-full max-w-md space-y-8'
                >
                    <div className='space-y-3'>
                        <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
                            Get more things done.
                        </h1>
                        <p className='text-gray-500 text-lg'>
                            Access the most powerful tools in the <br className="hidden md:block" /> 
                            design and web industry.
                        </p>
                    </div>

                    {/* Animated Tabs */}
                    <div className='flex items-center gap-8 border-b border-gray-100 pb-2 relative'>
                        <Link to="/auth/login" className={`relative pb-2 transition-colors ${isLogin ? 'text-black font-bold' : 'text-gray-400'}`}>
                            Login
                            {isLogin && <motion.span layoutId="underline" className='absolute bottom-0 left-0 h-1 bg-[#57d48d] w-full rounded-full' />}
                        </Link>
                        <Link to="/auth/register" className={`relative pb-2 transition-colors ${!isLogin ? 'text-black font-bold' : 'text-gray-400'}`}>
                            Register
                            {!isLogin && <motion.span layoutId="underline" className='absolute bottom-0 left-0 h-1 bg-[#57d48d] w-full rounded-full' />}
                        </Link>
                    </div>

                    {/* Page Content with Slide-Fade transition */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>

                    {/* Social Login Section */}
                    <div className='pt-6'>
                        <div className='flex items-center gap-4 mb-4'>
                            <div className='h-[1px] bg-gray-200 flex-1'></div>
                            <span className='text-gray-400 text-sm'>Or login with</span>
                            <div className='h-[1px] bg-gray-200 flex-1'></div>
                        </div>
                        <div className='flex justify-center gap-6'>
                            {['Facebook', 'Google', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className='text-gray-600 hover:text-[#a06df2] font-medium text-sm transition-all hover:scale-105'>
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Layout;