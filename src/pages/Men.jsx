import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Men = () => {
  return (
    <div>
      <div className='pt-0 lg:pt-10'>
        {/* Responsive banner */}
        <div className="bg-[#f0f0f0] py-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 mb-2 px-4 text-center">
          <div className='font-[Geologica, sans-serif]'>
            <span className='text-xs'>Online Only</span>
            <h2 className='text-2xl md:text-4xl font-normal'>Sale up to <b className='font-normal'>50% off</b></h2>
            <p className='text-base md:text-lg'>New styles added</p>
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 justify-center font-[Inter, sans-serif] text-sm md:text-base mt-4 md:mt-0'>
            <Link
              className="relative h-auto inline-block pb-1 border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              Clothing
            </Link>
            <Link
              className="relative h-auto inline-block pb-1 border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              Bags
            </Link>
          </div>
        </div>

        {/* Hero section */}
        <div className='relative'>
          <img
            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/hero"
            alt=""
            className="w-full h-auto object-cover"
          />
          <div className='absolute bottom-4 md:bottom-6 h-[50%] flex justify-center w-full'>
            <div className='text-center'>
              <h2 className='text-4xl md:text-7xl font-semibold text-white'>Sail into summer</h2>
              <div className='flex flex-col md:flex-row gap-4 md:gap-10 justify-center mt-4'>
                <Link
                  className="relative group py-3 px-8 md:py-4 md:px-16 m-2 rounded-md bg-[#ffffffe6] overflow-hidden z-0"
                >
                  <span className="relative z-10">New In</span>
                  <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                  ></span>
                </Link>
                <Link
                  className="relative group py-3 px-8 md:py-4 md:px-16 m-2 rounded-md bg-[#ffffffe6] overflow-hidden z-0"
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

        {/* Section: Ocean-ready wardrobe */}
        <div className='mt-10 md:mt-16 mb-8 md:mb-12 w-full max-w-[1424px] mx-auto px-4'>
          <h3 className='text-center font-normal text-2xl md:text-4xl mb-4'>Ocean-ready wardrobe</h3>
          <p className='text-center text-base md:text-lg mb-8'>Capture the essence of the season</p>
          <div className='flex flex-col md:flex-row justify-between gap-4 mb-2' data-aos="fade-up">
            <Link to="/beachwear" className="relative w-full md:w-[calc(50%-8px)]">
              <img
                className="w-full h-auto object-cover"
                src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_01"
                alt=""
              />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
                  <span className="relative z-10">Beachwear</span>
                  <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                </div>
              </div>
            </Link>

            <Link to="/weekend-escape" className="relative w-full md:w-[calc(50%-8px)]">
              <img
                className="w-full h-auto object-cover"
                src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_02"
                alt=""
              />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
                  <span className="relative z-10">Weekend Escape</span>
                  <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                </div>
              </div>
            </Link>
          </div>
          <Link className="relative block mt-4" data-aos="fade-up">
            <img
              className="w-full h-auto object-cover"
              src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_03"
              alt=""
            />
            <div className="absolute bottom-10 md:bottom-[28%] right-5 md:right-10 text-right">
              <h4 className="font-normal text-2xl md:text-4xl text-white mb-4">Watches for every voyage</h4>
              <div className="relative group py-3 px-6 md:py-4 md:px-8 rounded-md bg-[#ffffffe6] overflow-hidden z-0 inline-block">
                <span className="relative z-10">Discover more</span>
                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
              </div>
            </div>
          </Link>
        </div>

        {/* Section: Breathable Outfits */}
        <div className='px-4'>
          <h3 className='text-center font-normal text-2xl md:text-4xl mb-4'>Breathable Outfits</h3>
          <p className='text-center text-base md:text-lg mb-8'>Elevate your latest wardrobe essentials</p>
          <div className='mb-12 w-full max-w-[1424px] mx-auto'>
            <div className='flex flex-col md:flex-row justify-between gap-4 mb-2' data-aos="fade-up">
              <Link to="/beachwear" className="relative w-full md:w-[calc(50%-8px)]">
                <img
                  className="w-full h-auto object-cover"
                  src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_04"
                  alt=""
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
                    <span className="relative z-10">Discover Shirts</span>
                    <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                  </div>
                </div>
              </Link>
              <Link to="/weekend-escape" className="relative w-full md:w-[calc(50%-8px)]">
                <img
                  className="w-full h-auto object-cover"
                  src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_05"
                  alt=""
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
                    <span className="relative z-10">Pants Selection</span>
                    <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                  </div>
                </div>
              </Link>
            </div>
            <div className='flex flex-col md:flex-row justify-between gap-4' data-aos="fade-up">
              <Link to="/beachwear" className="relative w-full md:w-[calc(50%-8px)]">
                <img
                  className="w-full h-auto object-cover"
                  src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_06"
                  alt=""
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
                    <span className="relative z-10">Sunglasses</span>
                    <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                  </div>
                </div>
              </Link>
              <Link to="/weekend-escape" className="relative w-full md:w-[calc(50%-8px)]">
                <img
                  className="w-full h-auto object-cover"
                  src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/001_men/250627_HP_MEN_NEW_Summer_OFFICE/img_07"
                  alt=""
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative group py-3 px-6 rounded-md bg-[#ffffffe6] overflow-hidden z-0">
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