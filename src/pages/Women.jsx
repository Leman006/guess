import React from 'react';
import { Link } from 'react-router-dom';

const Women = () => {
  return (
    <div className="pt-0 lg:pt-10">
      {/* Banner */}
      <div className="banner bg-[#f0f0f0] py-4 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-20 px-4">
        <div className="text-center font-[Geologica, sans-serif]">
          <span className="text-xs md:text-sm">Online Only</span>
          <h2 className="text-2xl md:text-4xl">
            Sale up to <b className="font-normal">50% off</b>
          </h2>
          <p className="text-base md:text-lg">New styles added</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 font-[Inter, sans-serif] text-sm md:text-base">
          {['View All', 'Dresses', 'Bags', 'Shoes'].map((item) => (
            <Link
              key={item}
              className="relative h-auto inline-block pb-[2px] border-b border-black
                after:content-[''] after:absolute after:left-0 after:bottom-0
                after:h-[1.5px] after:w-0 after:bg-black
                after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Section 1 */}
      <div className="relative">
        <img
          className="w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] object-cover"
          src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_01"
          alt=""
        />
        <div className="absolute bottom-6 sm:bottom-10 flex justify-center w-full text-center px-4">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-semibold uppercase text-white mb-4">
              Vacation wardrobe icons
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['New In', 'Beachwear'].map((btn) => (
                <Link
                  key={btn}
                  className="relative group py-3 px-8 sm:px-16 rounded bg-white/90 overflow-hidden z-0 text-sm sm:text-base"
                >
                  <span className="relative z-10">{btn}</span>
                  <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mt-16 mb-12">
        <h3 className="text-center font-medium text-2xl sm:text-3xl mb-8">Natural Luxe</h3>
        <div className="relative flex justify-center px-4">
          <img
            className="w-full max-w-[1344px] object-cover rounded"
            src="https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/img_02"
            alt=""
          />
          <div className="absolute bottom-[20%] flex justify-center w-full">
            <Link className="relative group py-3 px-12 rounded bg-white/90 overflow-hidden z-0 text-sm sm:text-base">
              <span className="relative z-10">Bags</span>
              <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bags list */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 mb-20">
        {[
          ['Silvana raffia mini handbag', 'img_03'],
          ['Irene raffia crossbody', 'img_04'],
          ['Tatum handbag', 'img_05'],
          ['Nicolette Canva Shoulder Bag', 'img_06'],
        ].map(([title, img]) => (
          <Link key={title} className="flex flex-col items-center">
            <img
              className="w-full object-cover rounded"
              src={`https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/${img}`}
              alt=""
            />
            <p className="uppercase text-xs sm:text-sm text-center font-[Inter, sans-serif] tracking-[1px] mt-2">
              {title}
            </p>
          </Link>
        ))}
      </div>

      {/* Section 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-20">
        {[
          ['Jeans', 'img_09'],
          ['Clothing', 'img_10'],
        ].map(([title, img]) => (
          <Link key={title} className="relative">
            <img
              className="w-full h-[60vh] object-cover rounded"
              src={`https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/${img}`}
              alt=""
            />
            <div className="absolute bottom-[20%] flex justify-center w-full">
              <div className="relative group py-3 px-12 rounded bg-white/90 overflow-hidden z-0 text-sm sm:text-base">
                <span className="relative z-10">{title}</span>
                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Section 4 */}
      <div className="mt-16 mb-12">
        <h3 className="text-center font-medium text-2xl sm:text-3xl mb-8 tracking-[1px]">
          Holiday glamour essentials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
          {[
            ['Weekend escape', 'img_11'],
            ['Shoes', 'img_12'],
            ['Shorts', 'img_13'],
          ].map(([title, img]) => (
            <Link key={title} className="relative">
              <img
                className="w-full h-[60vh] object-cover rounded"
                src={`https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/1_women/250711_HP_Women_nw_summer_trends/${img}`}
                alt=""
              />
              <div className="absolute bottom-[20%] flex justify-center w-full">
                <div className="relative group py-3 px-8 sm:px-12 rounded bg-white/90 overflow-hidden z-0 text-sm sm:text-base">
                  <span className="relative z-10">{title}</span>
                  <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
