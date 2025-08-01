import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

function Home() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
          setContent('Hello from Home page!')
          setLoading(false)
        }, 2000)
      }, [])

      if (loading) return <Loader />

  return (
    <div className='pt-[114px]'>
      <div className='bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/00_splash_page/250412_Splashpage_brandmenu/hero_Guess")] 
      h-[614px] bg-cover bg-center mb-[50px]'>
        <div className='flex justify-center items-center h-full flex-col'>
            <img className=' w-[260px] h-[54px] mb-[25px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/Guess-LOGO-WHT" alt="" />
            <div className="main-but my-[16px] flex gap-4">
            <Link to={'/women'}
                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
            >
                <span className="relative z-10">For Her</span>
                <span
                className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                ></span>
            </Link>

            <Link to={'/men'}
                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
            >
                <span className="relative z-10">For Him</span>
                <span
                className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                ></span>
            </Link>
            </div>

        </div>
      </div>
      <div className="marc-kids flex justify-between w-[1660px] mx-auto">
        <Link className="group w-[804px] h-[617px] overflow-hidden relative block">
            <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/00_splash_page/250412_Splashpage_brandmenu/img_Marciano")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

            <div className='relative z-10 flex flex-col items-center justify-end h-full pb-18'>
                <img
                className='w-[370px] h-[28px] mb-[30px]'
                src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/MarcianoByGuess-LOGO-WHT"
                alt=""
                />

                <div
                className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                ></span>
                </div>
            </div>
        </Link>
        <Link className="group w-[804px] h-[617px] overflow-hidden relative block">
            {/* Zoomable background */}
            <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250402_Kids_splashpage/img_Kids")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

            {/* Fixed foreground content */}
            <div className='relative z-10 flex flex-col items-center justify-end h-full pb-18'>
                <img
                className='w-[205px] h-[28px] mb-[30px]'
                src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessKids-LOGO-WHT"
                alt=""
                />
                <div
                className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                ></span>
                </div>
            </div>
        </Link>
      </div>
      <div className="trio flex justify-between w-[1660px] mx-auto my-[50px]">
            <Link className="group w-[520px] h-[615px] overflow-hidden relative block">
                {/* Zoomable background */}
                <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/07_GUESS_JEANS/2025/020725_HP_updateGuessJeans/img_GuessJeans")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

                {/* Fixed foreground content */}
                <div className='relative z-10 flex flex-col items-center justify-end h-full pb-18'>
                    <img
                    className='w-[236px] h-[27px] mb-[30px]'
                    src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessJeans-LOGO-WHT"
                    alt=""
                    />
                    <div
                    className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                    >
                    <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                    <span
                        className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                    ></span>
                    </div>
                </div>
            </Link>
            <Link className="group w-[520px] h-[615px] overflow-hidden relative block">
                {/* Zoomable background */}
                <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250327_BrandsSpashPage_Originals/img_GuessOriginals")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

                {/* Fixed foreground content */}
                <div className='relative z-10 flex flex-col items-center justify-end h-full pb-18'>
                    <img
                    className='w-[209px] h-[63px] mb-[30px]'
                    src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessOriginals-LOGO-WHT"
                    alt=""
                    />
                    <div
                    className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                    >
                    <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                    <span
                        className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                    ></span>
                    </div>
                </div>
            </Link>
            <Link className="group w-[520px] h-[615px] overflow-hidden relative block">
                <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/241011_Splash_Refresh/img_GuessUSA")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

                <div className='relative z-10 flex flex-col items-center justify-end h-full pb-18'>
                    <img
                    className='w-[223px] h-[27px] mb-[30px]'
                    src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessUsa-LOGO-WHT"
                    alt=""
                    />
                    <div
                    className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                    >
                    <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                    <span
                        className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                    ></span>
                    </div>
                </div>
            </Link>
      </div>
      <Link className="house w-[1660px] mx-auto group h-[232px] overflow-hidden relative block mb-[50px]">
        <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250221_Brandssplashpage_home/img_GuessHome")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>

            <div className='relative z-10 flex items-center justify-center h-full gap-[25px]'>
                <h3 className='font-[500] text-[3rem] text-white'>Home collection</h3>
                <div
                className="relative group/link py-[16px] px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                <span className="relative z-10 group-hover/link:text-black transition-colors duration-300">Discover more</span>
                <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"
                ></span>
                </div>
            </div>
      </Link>
    </div>
  )
}

export default Home
