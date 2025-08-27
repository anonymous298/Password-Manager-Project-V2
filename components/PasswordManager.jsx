"use client"

import React, { useTransition } from 'react'
import { useState } from 'react'
import PasswordRendering from './PasswordRendering';
import { useContext } from 'react';
import { contextState } from '../context/context';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as motion from "motion/react-client"

const PasswordManager = ({isloading}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {passwordObj, setPasswordObj} = useContext(contextState);

  const [websiteURL, setWebsiteURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleWebsiteURLInput = (e) => {
    setWebsiteURL(e.target.value)
    // console.log(inputValues)
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
    // console.log(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
    // console.log(e.target.value)
  }

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    }

    else {
      setShowPassword(true)
    }
  }

  const notifySuccess = () => toast.success("Successfully Added Password...");

  const encryptPassword = (password) => {
    let encryptedValues = '';

    for (const val of password) {
        encryptedValues += '*';
    }

    return encryptedValues;
  }

  const onSubmit = (data) => {
    const submitData = async (data) => {
      let a = await fetch('/api/database', 
        {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(data),
        }
      );

      let res = await a.json();
      console.log(res);
    }

    data['encryptedPassword'] = encryptPassword(data.password);
    // console.log(data);
    
    if (!passwordObj[0]) {
      setPasswordObj([data])
      submitData(data)

    } 

    else {
      setPasswordObj([...passwordObj, data]);
      submitData(data)
      // console.log(passwordObj[0]._id)
    }
    // setPasswordObj([...passwordObj, data]);
    // console.log(passwordObj)

    notifySuccess();

    setWebsiteURL('');
    setUsername('');
    setPassword('');

  }

 
  return (
    <div className=' flex flex-col items-center justify-center'>
      <div className="inner-container w-[76%] flex flex-col gap-5 max-[600px]:w-[90%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className=' mt-10 flex flex-col gap-5'>
            <div className="title text-center">
              <h1 className="logo font-bold text-[22px] cursor-pointer"><span className='text-[#67C090]'>&lt;</span>Pass<span className='text-[#67C090]'>Fortress</span><span className='text-[#67C090]'>/&gt;</span></h1>
              <p className='font-semibold'>Your Secure Password Manager</p>
            </div>

            <form className='inputs flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
              <input {...register('websiteURL', {required : true})} type="text" value={websiteURL} onChange={handleWebsiteURLInput} placeholder='Enter Website URL' className='placeholder:text-gray-600 w-[100%] border-2 border-[#67C090] rounded-[20px] p-1 outline-none px-3 max-[500px]:text-[13px] bg-[#DCD0A8] text-black active:bg-[#DCD0A8]' />

              <div className='flex gap-3 max-[500px]:gap-1 max-[500px]:flex-col max-[500px]:gap-y-5'>
                <input {...register('username', {required : true})} type="text" value={username} onChange={handleUsernameInput}  placeholder='Enter Username' className='placeholder:text-gray-600 w-[80%] max-[500px]:w-[100%] border-2 border-[#67C090] rounded-[20px] p-1 outline-none  px-3 max-[500px]:text-[13px] bg-[#DCD0A8] active:bg-[#DCD0A8] text-black' />

                <div className=' border-2 border-[#67C090] rounded-[20px] p-1 flex justify-between px-3 bg-[#DCD0A8]'>
                  <input {...register('password', {required : true})} type={showPassword ? 'text ' : 'password'} value={password} onChange={handlePasswordInput}  placeholder='Enter Password' className=' placeholder:text-gray-600 outline-none w-[80%] px-2 max-[500px]:px-0.5 max-[500px]:text-[13px] active:bg-[#DCD0A8] text-black'/>

                  <div onClick={toggleShowPassword} className='cursor-pointer'>
                    {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-[#004030]">
                                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                    </svg> :
                  
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-[#004030]">
                                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>}
                  </div>
                </div>
              </div>

              <button className='text-white flex mx-auto bg-green-500 p-2 rounded-[20px] px-5 gap-1 cursor-pointer hover:bg-[#67C090] font-semibold transition-all' disabled={isSubmitting}>
                Save

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
              </button>
              
            </form>

          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >

          <PasswordRendering setWebsiteURL={setWebsiteURL}  setUsername={setUsername}  setPassword={setPassword} isloading={isloading} />
        </motion.div>

      </div>
    </div>
  )
}

export default PasswordManager
