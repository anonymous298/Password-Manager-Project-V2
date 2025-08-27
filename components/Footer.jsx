"use client"

import React from 'react';
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
    >

          <div className='bg-[#004030] p-1 w-[100%] flex justify-center items-center mt-5'>
              <footer className=' text-center'>
                  <h1 className="logo text-white font-bold text-[18px] cursor-pointer"><span className='text-[#67C090]'>&lt;</span>Pass<span className='text-[#67C090]'>Fortress</span><span className='text-[#67C090]'>/&gt;</span></h1>
                  <p className='text-white text-[14px] font-semibold space-x-5'>Created With ❤️ By Talha</p>
              </footer>
          </div>
    </motion.div>
  )
}

export default Footer
