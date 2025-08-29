import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, Outlet } from 'react-router-dom'

function MenLayout() {
    const [activeMenu, setActiveMenu] = useState(null);
      const menuRef = useRef();
    
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const toggleMenu = (menu, e) => {
        e.stopPropagation();
        setActiveMenu((prev) => (prev === menu ? null : menu));
      }; 
    
      useEffect(() => {
        const handleClickOutside = () => {
          setActiveMenu(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
      const onMenuClick = (e) => {
        e.stopPropagation();
      };
      const isDesktop = windowWidth >= 1024;
      
  return (
    <div>
      <Header/>
      <div className='pt-29'>
      {isDesktop && (
      <div className="navbar w-full fixed z-40 bg-white">
                      <div className='flex justify-between max-w-[1096px]  pl-[24px] z-50 '>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>New In</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Jeans</Link>
                      </span>
                      <span ref={menuRef} onClick={(e) => toggleMenu('clothing', e)}  className="relative cursor-pointer border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                                    <Link className='text-[13px] text-[#1c1b1b] font-700'>Clothing</Link>
                      
                                    {activeMenu === "clothing" && (
                                      <div onClick={onMenuClick}
                                        className="absolute top-[40px] left-[-172px] bg-white shadow-lg max-w-[1728px] w-screen p-6 z-50"
                                      >
                                        <div className='flex justify-between'>
                                          <div className="flex justify-between gap-6 w-[40%]">
                                            <div>
                                              <h4 className="font-semibold mb-[20px]">Shop by category</h4>
                                              <div className="flex justify-between gap-6 w-[380px]">
                                                <div>
                                                  <Link to={'clothing/coats-and-jackets'} className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]' onClick={() => setActiveMenu(null)}>Coats and Jackets</Link>
                                                  <Link to={'clothing/t-shirts-and-polo-shirts'} className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]' onClick={() => setActiveMenu(null)}>T-shirts and Polo Shirts</Link>
                                                  <Link to={'clothing/shirts'} className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]' onClick={() => setActiveMenu(null)}>Shirts</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Knitwear</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Sweatshirts</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Trousers and shorts</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Beachwear</Link>
                                                </div>
                                                <div>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Underwear</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Activewear</Link>
                                                  <Link to={'clothing/all'} className='block text-[13px]' onClick={() => setActiveMenu(null)}><strong>View All</strong></Link>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <h4 className="font-semibold mb-[20px]">Highlights</h4>
                                              <div>
                                                <Link className=' font-[400] text-[13px] text-[#1c1b1b] mb-[15px] flex items-center gap-2'>
                                                  <img className='w-[40px] h-[40px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2024/240924_highlight_drodpwnall/Highlight_M_Clothing_01" alt="" />
                                                  Logo Shop
                                                </Link>
                                                <Link className=' font-[400] text-[13px] text-[#1c1b1b] mb-[15px] flex items-center gap-2'>
                                                  <img className='w-[40px] h-[40px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2024/240924_highlight_drodpwnall/Highlight_W_Clothing_04" alt="" />
                                                  Guess Eco
                                                </Link>
                                                
                                              </div>
                                            </div>
                                          </div>
                                          <div className='flex justify-between gap-[16px]'>
                                            <Link className='relative justify-center flex'>
                                              <img className='w-[220px] h-[280px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/FOCUS/2023/250514_SummerFeeling/Dropdown_M_Clothing" alt="" />
                                              <span className='absolute bottom-[14px] font-[600] text-[16px] text-white px-[24px] text-center'>View All</span>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                      </span>
                      
                      <span ref={menuRef} onClick={(e) => toggleMenu('bags', e)}  className="relative cursor-pointer border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                                    <Link className='text-[13px] text-[#1c1b1b] font-700'>Bags</Link>
                      
                                    {activeMenu === "bags" && (
                                      <div onClick={onMenuClick}
                                        className="absolute top-[40px] left-[-257px] bg-white shadow-lg max-w-[1728px] w-screen p-6 z-50 "
                                      >
                                        <div className='flex justify-between'>
                                          <div className="flex justify-between w-[30%]">
                                            <div>
                                              <h4 className="font-semibold mb-[20px]">Shop by category</h4>
                                                <div>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Business Bags</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>City Bags</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Backpacks and Bum Bags</Link>
                                                  <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Travel Bags</Link>
                                                  <Link className='block text-[13px]'><strong>View All</strong></Link>
                                                </div>
                                            </div>
                                            <div>
                                              <h4 className="font-semibold mb-[20px]">Highlights</h4>
                                              <div>
                                                <Link className=' font-[400] text-[13px] text-[#1c1b1b] mb-[15px] flex items-center gap-2'>
                                                  <img className='w-[40px] h-[40px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2024/240924_highlight_drodpwnall/Highlight_M_Bags_01" alt="" />
                                                  Logo Bags
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='flex justify-between gap-[16px]'>
                                            <Link className='relative justify-center flex'>
                                              <img className='w-[220px] h-[280px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2024/2001_dropdown_/Dropdown_M_Bags_01" alt="" />
                                              <span className='absolute bottom-[14px] font-[600] text-[16px] text-white px-[24px] text-center'>Match the Look: Wallets</span>
                                            </Link>
                                            <Link className='relative justify-center flex'>
                                              <img className='w-[220px] h-[280px] rounded-[5px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2024/2001_dropdown_/Dropdown_M_Bags_02" alt="" />
                                              <span className='absolute bottom-[14px] font-[600] text-[16px] text-white px-[24px] text-center'>City Bags</span>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Shoes and Accessories</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Marciano</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Gifts</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Occasionwear</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Past Collections</Link>
                      </span>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#c91513] font-700'>Sale</Link>
                      </span>
                          
                          <div className='bg-[#e7e0de] w-[2px] h-[20px] mt-[10px]'></div>
                      <span className="border-b-2 border-transparent hover:border-black transition duration-200 py-[6px] px-[2px]">
                          <Link className='text-[13px] text-[#1c1b1b] font-700'>Shop by Brand</Link>
                      </span>
                      </div>
                      <hr className="border-t-[3px] border-[#e6e6e6]"/>
                  </div>
      )}
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default MenLayout
