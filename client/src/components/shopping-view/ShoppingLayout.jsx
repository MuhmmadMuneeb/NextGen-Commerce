import React from 'react'
import Header from './Header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

const ShoppingLayout = () => {
    return (
        <div>
            <div>
                <Header />

            </div>
            <div className='flex '>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default ShoppingLayout
