import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Men = () => {
    const [activeMenu, setActiveMenu] = useState(null);
      const menuRef = useRef();
    
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

  return (
    <div>
      <div className='pt-29'>
            <div className="navbar w-full fixed z-60 bg-white">
                <div className='flex justify-between w-[1096px]  pl-[24px] z-50 '>
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
                                  className="absolute top-[40px] left-[-172px] bg-white shadow-lg w-[1728px] p-6 z-50"
                                >
                                  <div className='flex justify-between'>
                                    <div className="flex justify-between gap-6 w-[40%]">
                                      <div>
                                        <h4 className="font-semibold mb-[20px]">Shop by category</h4>
                                        <div className="flex justify-between gap-6 w-[380px]">
                                          <div>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Coats and Jackets</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>T-shirts and Polo Shirts</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Shirts</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Knitwear</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Sweatshirts</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Trousers and shorts</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Beachwear</Link>
                                          </div>
                                          <div>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Underwear</Link>
                                            <Link className='block font-[500] text-[13px] text-[#1c1b1b] mb-[8px]'>Activewear</Link>
                                            <Link className='block text-[13px]'><strong>View All</strong></Link>
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
                                  className="absolute top-[40px] left-[-257px] bg-white shadow-lg w-[1728px] p-6 z-50"
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
        </div>
        <div className='pt-[41px]'>
            <div className="banner bg-[#f0f0f0] py-[17px] flex justify-center items-center gap-45 mb-[8px]">
                <div className='text-center font-[Geologica, sans-serif]'>
                    <span className='text-[12px]'>Online Only</span>
                    <h2 className='text-[38px]'>Sale up to <b className='font-[400px]'>50% off</b></h2>
                    <p className='text-[18px]'>New styles added</p>
                </div>
                <div className='flex h-[30px] gap-15 justify-center font-[Inter, sans-serif] text-[16px]'>
                    <Link
                            className="relative h-auto inline-block pb-[2px] border-b border-black
                                        after:content-[''] after:absolute after:left-0 after:bottom-0
                                        after:h-[1.5px] after:w-0 after:bg-black
                                        after:transition-all after:duration-300 hover:after:w-full"
                            >
                            Clothing
                    </Link>
                    <Link
                            className="relative h-auto inline-block pb-[2px] border-b border-black
                                        after:content-[''] after:absolute after:left-0 after:bottom-0
                                        after:h-[1.5px] after:w-0 after:bg-black
                                        after:transition-all after:duration-300 hover:after:w-full"
                            >
                            Bags
                    </Link>
                </div>
            </div>
            <div className='relative'>
                <img src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/hero" alt="" />
                <div className='absolute bottom-[24px] h-[50%] flex justify-center w-full'>
                    <div className='sticky'>
                        <h2 className='text-[74px] font-[600] text-white'>Sail into summer</h2>
                        <div className='flex gap-10 justify-center'>
                            <Link
                                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                            >
                                <span className="relative z-10">New In</span>
                                <span
                                className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                                ></span>
                            </Link>
                            
                            <Link
                                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                            >
                                <span className="relative z-10">Clothing</span>
                                <span
                                className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                                ></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[70px] mb-[50px] w-[1424px] mx-auto'>
                <h3 className='text-center font-[400] text-[38px] mb-[16px]'>Ocean-ready wardrobe</h3>
                <p className='text-center text-16px mb-[35px]'>Capture the essence of the season</p>
                <div className=' flex justify-between mb-[8px]' data-aos="fade-up">
                    <Link to="/beachwear" className="relative">
                        <img
                        className="w-[708px] h-[1010px]"
                        src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_01"
                        alt=""
                        />
                        <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                        <div className="relative group py-[16px] px-[46px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10">Beachwear</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                        </div>
                        </div>
                    </Link>

                    <Link to="/weekend-escape" className="relative">
                        <img
                        className="w-[708px] h-[1010px]"
                        src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_02"
                        alt=""
                        />
                        <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                        <div className="relative group py-[16px] px-[16px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10">Weekend Escape</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                        </div>
                        </div>
                    </Link>
                </div>
                <Link className="relative block" data-aos="fade-up">
                    <img
                        className="w-full h-[886px] object-cover"
                        src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_03"
                        alt=""
                    />
                    <div className="absolute bottom-[28%] right-[5%] text-right">
                        <h4 className="font-[400] text-[38px] text-white mb-4">Watches for every voyage</h4>
                        <div className="relative group py-[16px] px-[36px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0 inline-block">
                        <span className="relative z-10">Discover more</span>
                        <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <h3 className='text-center font-[400] text-[38px] mb-[16px]'>Breathable Outfits</h3>
                <p className='text-center text-16px mb-[35px]'>Elevate your latest wardrobe essentials</p>
                <div className='boys mb-[48px]'>
                    <div className=' flex justify-between mb-[8px]' data-aos="fade-up">
                        <Link to="/beachwear" className="relative">
                            <img
                            className="w-[860px] h-[1130px]"
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_04"
                            alt=""
                            />
                            <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                            <div className="relative group py-[16px] px-[16px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                                <span className="relative z-10">Discover Shirts</span>
                                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                            </div>
                            </div>
                        </Link>

                        <Link to="/weekend-escape" className="relative">
                            <img
                            className="w-[860px] h-[1130px]"
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_05"
                            alt=""
                            />
                            <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                            <div className="relative group py-[16px] px-[16px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                                <span className="relative z-10">Pants Selection</span>
                                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                            </div>
                            </div>
                        </Link>
                    </div>
                    <div className=' flex justify-between mb-[8px]' data-aos="fade-up">
                        <Link to="/beachwear" className="relative">
                            <img
                            className="w-[860px] h-[1130px]"
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_06"
                            alt=""
                            />
                            <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                            <div className="relative group py-[16px] px-[16px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                                <span className="relative z-10">Sunglasses</span>
                                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                            </div>
                            </div>
                        </Link>

                        <Link to="/weekend-escape" className="relative">
                            <img
                            className="w-[860px] h-[1130px]"
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_07"
                            alt=""
                            />
                            <div className="absolute bottom-[28%] left-3/4 transform -translate-x-1/2">
                            <div className="relative group py-[16px] px-[16px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                                <span className="relative z-10">Shop Bags</span>
                                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                            </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Men
