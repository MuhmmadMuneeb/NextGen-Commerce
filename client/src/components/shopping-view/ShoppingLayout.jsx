import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import FrontendPopup from './FrontendPopup'; // <-- 1. Import the popup

const ShoppingLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 relative">
            
            {/* GLOBAL POPUP LISTENER */}
            <FrontendPopup /> {/* <-- 2. Place it high in the component tree */}

            <Header open={isSidebarOpen} setOpen={setIsSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-1 "> 
                <div className="container mx-auto px-4 md:px-8 py-6">
                    <Outlet />
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ShoppingLayout;