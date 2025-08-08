import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='pt-[70px] sm:pt-[80px] md:pt-[100px] lg:pt-[114px]'>

            {/* Главный баннер */}
            <div className='relative bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/00_splash_page/250412_Splashpage_brandmenu/hero_Guess")]
                h-[400px] sm:h-[500px] md:h-[614px] bg-cover bg-center mb-[30px] sm:mb-[50px]'>
                <div className='flex justify-center items-center h-full flex-col'>
                    <img
                        className='w-[200px] sm:w-[260px] h-auto mb-[20px] sm:mb-[25px]'
                        src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/Guess-LOGO-WHT"
                        alt="Guess Logo"
                    />
                    <div className="main-but my-[10px] sm:my-[16px] flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Link to={'/women'}
                            className="relative group py-[12px] px-[40px] sm:py-[16px] sm:px-[66px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                        >
                            <span className="relative z-10 text-sm sm:text-base">For Her</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                        </Link>
                        <Link to={'/men'}
                            className="relative group py-[12px] px-[40px] sm:py-[16px] sm:px-[66px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                        >
                            <span className="relative z-10 text-sm sm:text-base">For Him</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Секция Marciano и Kids */}
            <div className="marc-kids grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-8">
                <Link className="group w-full h-[400px] md:h-[617px] overflow-hidden relative block">
                    <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/00_splash_page/250412_Splashpage_brandmenu/img_Marciano")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                    <div className='relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-18'>
                        <img
                            className='w-[250px] sm:w-[370px] h-auto mb-[20px] md:mb-[30px]'
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/MarcianoByGuess-LOGO-WHT"
                            alt="Marciano by Guess"
                        />
                        <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
                <Link className="group w-full h-[400px] md:h-[617px] overflow-hidden relative block">
                    <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250402_Kids_splashpage/img_Kids")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                    <div className='relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-18'>
                        <img
                            className='w-[150px] sm:w-[205px] h-auto mb-[20px] md:mb-[30px]'
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessKids-LOGO-WHT"
                            alt="Guess Kids"
                        />
                        <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Тройные карточки */}
            <div className="trio grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-8 my-[30px] sm:my-[50px]">
                <Link className="group w-full h-[400px] md:h-[615px] overflow-hidden relative block">
                    <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/07_GUESS_JEANS/2025/020725_HP_updateGuessJeans/img_GuessJeans")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                    <div className='relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-18'>
                        <img
                            className='w-[180px] sm:w-[236px] h-auto mb-[20px] md:mb-[30px]'
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessJeans-LOGO-WHT"
                            alt="Guess Jeans"
                        />
                        <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
                <Link className="group w-full h-[400px] md:h-[615px] overflow-hidden relative block">
                    <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250327_BrandsSpashPage_Originals/img_GuessOriginals")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                    <div className='relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-18'>
                        <img
                            className='w-[160px] sm:w-[209px] h-auto mb-[20px] md:mb-[30px]'
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessOriginals-LOGO-WHT"
                            alt="Guess Originals"
                        />
                        <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
                <Link className="group w-full h-[400px] md:h-[615px] overflow-hidden relative block">
                    <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/241011_Splash_Refresh/img_GuessUSA")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                    <div className='relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-18'>
                        <img
                            className='w-[170px] sm:w-[223px] h-auto mb-[20px] md:mb-[30px]'
                            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/GuessUsa-LOGO-WHT"
                            alt="Guess U.S.A."
                        />
                        <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                            <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Секция Home collection */}
            <Link className="house w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-8 group h-[150px] sm:h-[232px] overflow-hidden relative block mb-[30px] sm:mb-[50px]">
                <div className='absolute inset-0 bg-[url("https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/250221_Brandssplashpage_home/img_GuessHome")] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 z-0'></div>
                <div className='relative z-10 flex flex-col sm:flex-row items-center justify-center h-full gap-[15px] sm:gap-[25px]'>
                    <h3 className='font-medium text-2xl sm:text-4xl md:text-5xl text-white text-center'>Home collection</h3>
                    <div className="relative group/link py-[12px] px-[30px] sm:py-[16px] sm:px-[40px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0">
                        <span className="relative z-10 group-hover/link:text-black transition-colors duration-300 text-sm sm:text-base">Discover more</span>
                        <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full z-0"></span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Home