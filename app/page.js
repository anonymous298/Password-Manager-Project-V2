"use client"

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PasswordManager from '@/components/PasswordManager';
import { contextState } from '@/context/context';
import React from 'react';

import { ToastContainer } from 'react-toastify';
// import { contextState } from '@/context/context';

function App() {
  const [passwordObj, setPasswordObj] = useState([])
  const [isloading, setIsloading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      let a = await fetch('/api/database');
      let res = await a.json()
      console.log(res);

      setIsloading(false);
      setPasswordObj(res.data);

    }

    fetchData();

  }, [])

  return (
    <>
      <div className='h-[100vh] flex flex-col justify-between'>
        <contextState.Provider value={{passwordObj, setPasswordObj}}>

          <Navbar />

          <PasswordManager isloading={isloading} />

          <Footer />


        </contextState.Provider>
      </div>

      <ToastContainer
        position="bottom-right"  // top-left, bottom-right, bottom-center etc.
        autoClose={1000}      // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"       // "light" | "dark" | "colored"
      />
    </>
  )
}

export default App
