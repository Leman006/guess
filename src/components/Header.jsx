import React, { useEffect, useRef, useState } from 'react'
import { BsBox2 } from 'react-icons/bs'
import { IoIosReturnLeft, IoMdHeartEmpty } from 'react-icons/io'
import { IoBagOutline, IoHelpCircleOutline, IoLocationOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
          ) {
            setIsOpen(false)
          }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])
      

  return (
    <div className='fixed w-full bg-white z-50'>
      <div className="header-banner bg-[#1d1d1d] text-white flex justify-center py-[12px]">
        <p className='text-[12px] font-[400] font-[Open_Sans]'>Sale | Up to 50% off</p>
      </div>
      <div className="head-wrapper w-[1660px] mx-auto flex justify-between h-[71px] items-center">
        <div className="head-left flex items-center">
            <div className="logo mr-[40px]">
                <Link to={'/'} className='text-[45px] font-[500] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>GUESS</Link>
            </div>
            <div className="menu text-[#939090] w-[320px] flex justify-between">
                <NavLink to={'/women'} className={({ isActive }) =>
                `text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] transition duration-300 ${
                    isActive ? 'text-black' : 'hover:text-[#1c1b1b]'
                }`
                }>WOMEN</NavLink>
                <NavLink to={'/men'} className={({ isActive }) =>
                `text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] transition duration-300 ${
                    isActive ? 'text-black' : 'hover:text-[#1c1b1b]'
                }`
                }>MEN</NavLink>
                <NavLink className='text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] hover:text-[#1c1b1b] transition duration-300 '>KIDS</NavLink>
                <NavLink className='text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] hover:text-[#1c1b1b] transition duration-300 '>HOME</NavLink>
            </div>
        </div>
        <div className="head-right flex items-center gap-2">
            <div className="log-sign flex text-[12px] font-[400] font-[Open_Sans] gap-1 mr-[15px]">
                <Link to={'/login'} className='underline'>Login</Link>
                <p>or</p>
                <Link className='underline'>register</Link>
            </div>
            <div className='relative h-[74px] border-b-4 border-transparent hover:border-black transition duration-200'>
            <span ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)} className=" px-[2px]">
                <IoPersonOutline size={26}  />
            </span>
            {/* Modal */}
            {isOpen && (
                <div ref={modalRef} className="absolute right-0  bg-white shadow-lg border border-black z-50">
                <div className="p-[40px] w-[380px]">
                    
                    <Link to={'/login'} className="w-[304px] bg-[#1d1d1d] border-2 border-transparent hover:bg-white hover:text-black hover:border-black hover:border-2 text-white py-[8px] px-[20px] mb-[20px] block text-center transition duration-200">
                    Login</Link>

                    <p className="text-sm mb-4">
                    <strong>Are you a new customer?</strong>{' '}
                    <Link to={'/login'} className="underline">Register now</Link>
                    </p>

                    <hr className="my-[24px]" />

                    <div className="space-y-2 text-sm">
                    <Link className="flex items-center gap-2 mb-[14px] hover:underline">
                        <img className='w-[14px] h-[14px] mr-[12px]' src="https://images.seeklogo.com/logo-png/6/2/guess-jeans-logo-png_seeklogo-64100.png" alt="" /> My Guess
                    </Link>
                    <Link className="flex items-center gap-2 mb-[14px] hover:underline">
                        <BsBox2 className='mr-[12px]'/> Orders
                    </Link>
                    <Link className="flex items-center gap-2 mb-[14px] hover:underline">
                        <IoIosReturnLeft className='mr-[12px]'/> Returns
                    </Link>
                    <Link className="flex items-center gap-2 mb-[14px] hover:underline">
                        <IoHelpCircleOutline className='mr-[12px]'/> Need help
                    </Link>
                    </div>
                </div>
                </div>
            )}
            </div>
            <div className='w-[1px] h-[1.8125rem] bg-[#e7e0de]'></div>
            <div className="border-b-4 border-transparent hover:border-black transition duration-200 py-5 px-[2px]">
                <img className='w-[28px] h-[18px]' src="https://meclis.gov.az/main/bayraq.svg" alt="" />
                <p className='text-[8px]'>az | en</p>
            </div>
            <div className='w-[1px] h-[1.8125rem] bg-[#e7e0de]'></div>
            <span className="border-b-4 border-transparent hover:border-black transition duration-200 py-5 px-[2px]">
                <IoSearchOutline size={26}  />
            </span>
            <span className="border-b-4 border-transparent hover:border-black transition duration-200 py-5 px-[2px]">
                <IoLocationOutline size={26}  />
            </span>
            <span className="border-b-4 border-transparent hover:border-black transition duration-200 py-5 px-[2px]">
                <IoMdHeartEmpty size={26}  />
            </span>
            <span className="border-b-4 border-transparent hover:border-black transition duration-200 py-5 px-[2px]">
                <IoBagOutline size={26} />
            </span>
            
        </div>
      </div>
      <hr className="border-t-[3px] border-[#e6e6e6]"/>
    </div>
  )
}

export default Header
