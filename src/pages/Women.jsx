import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Women = () => {
  

  return (
    <>
      
      <div className='pt-[41px]'>
        <div className="banner bg-[#f0f0f0] py-[17px] flex justify-center items-center gap-20">
          <div className='text-center font-[Geologica, sans-serif]'>
            <span className='text-[12px]'>Online Only</span>
            <h2 className='text-[38px]'>Sale up to <b className='font-[400px]'>50% off</b></h2>
            <p className='text-[18px]'>New styles added</p>
          </div>
          <div className='flex h-[30px] w-[470px] justify-between font-[Inter, sans-serif] text-[16px]'>
            <Link
              className="relative h-auto inline-block pb-[2px] border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              View All
            </Link>
            <Link
              className="relative h-auto inline-block pb-[2px] border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              Dresses
            </Link>
            <Link
              className="relative h-auto inline-block pb-[2px] border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              Bags
            </Link>
            <Link
              className="relative h-auto inline-block pb-[2px] border-b border-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[1.5px] after:w-0 after:bg-black
                      after:transition-all after:duration-300 hover:after:w-full"
            >
              Shoes
            </Link>
          </div>
        </div>
        <div className='relative'>
          <img src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_01" alt="" />
          <div className='absolute bottom-[24px] h-[50%] flex justify-center w-full'>
            <div className='sticky'>
              <h2 className='text-[60px] font-[600] uppercase text-white'>Vacation wardrobe icons</h2>
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
                  <span className="relative z-10">Beachwear</span>
                  <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                  ></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[70px] mb-[50px]'>
          <h3 className='text-center font-[500] text-[30px] mb-[35px]'>Natural Luxe</h3>
          <div className='relative flex justify-center' >
            <img className='w-[1344px] h-[780px]' data-aos="fade-up" src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_02" alt="" />
            <div className='absolute bottom-[30%] flex justify-center w-full'>
              <Link
                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
              >
                <span className="relative z-10">Bags</span>
                <span
                  className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                ></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="bags flex mb-[100px] justify-between" data-aos="fade-up">
          <Link className="bag">
            <img className='w-[396px] h-[503px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_03" alt="" />
            <p className='uppercase text-[16px] text-center font-[Inter, sans-serif] tracking-[1px]'>Silvana raffia mini handbag</p>
          </Link>
          <Link className="bag">
            <img className='w-[396px] h-[503px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_04" alt="" />
            <p className='uppercase text-[16px] text-center font-[Inter, sans-serif] tracking-[1px]'>Irene raffia crossbody</p>
          </Link>
          <Link className="bag">
            <img className='w-[396px] h-[503px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_05" alt="" />
            <p className='uppercase text-[16px] text-center font-[Inter, sans-serif] tracking-[1px]'>Tatum handbag</p>
          </Link>
          <Link className="bag">
            <img className='w-[396px] h-[503px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_06" alt="" />
            <p className='uppercase text-[16px] text-center font-[Inter, sans-serif] tracking-[1px]'>Nicolette Canva Shoulder Bag</p>
          </Link>
        </div>
        <div className='flex' data-aos="fade-up">
          <Link className='relative'>
            <img className='w-[864px] h-[810px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_09" alt="" />
            <div className='absolute bottom-[28%] flex justify-center w-full'>
              <div
                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
              >
                <span className="relative z-10">Jeans</span>
                <span
                  className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                ></span>
              </div>
            </div>
          </Link>
          <Link className='relative'>
            <img className='w-[864px] h-[810px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_10" alt="" />
            <div className='absolute bottom-[28%] flex justify-center w-full'>
              <div
                className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
              >
                <span className="relative z-10">Clothing</span>
                <span
                  className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                ></span>
              </div>
            </div>
          </Link>
        </div>
        <div className='mt-[100px] mb-[50px]'>
          <h3 className='text-center font-[500] text-[30px] mb-[35px] tracking-[1px]'>Holiday glamour essentials</h3>
          <div className='flex' data-aos="fade-up">
            <Link className='relative'>
              <img className='w-[576px] h-[702px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_11" alt="" />
              <div className='absolute bottom-[28%] flex justify-center w-full'>
                <div
                  className="relative group py-[16px] px-[36px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                  <span className="relative z-10">Weekend escape</span>
                  <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                  ></span>
                </div>
              </div>
            </Link>
            <Link className='relative'>
              <img className='w-[576px] h-[702px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_12" alt="" />
              <div className='absolute bottom-[28%] flex justify-center w-full'>
                <div
                  className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                  <span className="relative z-10">Shoes</span>
                  <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                  ></span>
                </div>
              </div>
            </Link>
            <Link className='relative'>
              <img className='w-[576px] h-[702px]' src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_13" alt="" />
              <div className='absolute bottom-[28%] flex justify-center w-full'>
                <div
                  className="relative group py-[16px] px-[66px] m-[8px] rounded-[4px] bg-[#ffffffe6] overflow-hidden z-0"
                >
                  <span className="relative z-10">Shorts</span>
                  <span
                    className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"
                  ></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Women;