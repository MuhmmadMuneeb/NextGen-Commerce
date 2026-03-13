import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <section className=' h-screen flex items-center'>
            <div className='h-full bg-[#a06df2] w-[40%] flex justify-center items-center'>
                <img src="/img.svg" className='h-96 ' alt="" />
            </div>
            <div className='flex  w-[60%] justify-center items-center'>
                <div className='flex flex-col  w-[42%]  space-y-6'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold '>Get more things done with Loggin platform.</h1>
                        <p className=' '>Access to the most powerfull tool in the <br /> entire design and web industry.</p>
                    </div>
                    <div className='flex items-center gap-5 space-y-1.5'>
                        <a className='relative' href="#">Login
                            <span className='h-0.5 bg-[#57d48d] left-0 -bottom-1 w-full absolute'></span>
                        </a>
                        <a className='relative' href="#">
                            Register
                            <span className='h-0.5 bg-[#57d48d] left-0 -bottom-1 w-full absolute'></span>
                        </a>
                        <span></span>
                    </div>
                    <Outlet />
                    <div className='flex items-center gap-3.5'>
                        <p className='font-extralight'>Or login with</p>
                        <a className='text-black font-semibold underline underline-offset-1 text-[12px] ' href="">Facebook</a>
                        <a className='text-black font-semibold underline underline-offset-1 text-[12px]' href="">Google</a>
                        <a className='text-black font-semibold underline underline-offset-1 text-[12px]' href="">LinkedIn</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Layout
