"use client"

import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#004030]'>
      <nav className='flex w-[80%] items-center justify-between mx-auto p-1.5 max-[500px]:w-[88%] max-[400px]:w-[96%]'>
        <h1 className="logo text-white font-bold text-[22px] cursor-pointer"><span className='text-[#67C090]'>&lt;</span>Pass<span className='text-[#67C090]'>Fortress</span><span className='text-[#67C090]'>/&gt;</span></h1>

        <div className=' border-2 border-[#67C090] px-5 py-1 rounded-[20px] font-bold text-white flex items-center justify-center hover:bg-green-500 cursor-pointer transition-all'>Login</div>
      </nav>
    </div>
  )
}

export default Navbar
