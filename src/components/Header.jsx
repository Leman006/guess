import React, { useEffect, useRef, useState } from 'react';
import { BsBox2 } from 'react-icons/bs';
import { IoIosReturnLeft, IoMdHeartEmpty } from 'react-icons/io';
import { IoBagOutline, IoHelpCircleOutline, IoLocationOutline, IoPersonOutline, IoSearchOutline, IoMenu, IoClose } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  // Состояния для модальных окон
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountModalRef = useRef(null);
  const accountButtonRef = useRef(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartModalRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Состояние для мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const userName = user?.name || '';

  // Эффекты для синхронизации пользователя и закрытия модальных окон
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser((prevUser) => {
        const prev = JSON.stringify(prevUser);
        const next = JSON.stringify(storedUser);
        return prev !== next ? storedUser : prevUser;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAccountOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Закрытие модального окна аккаунта
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(event.target) &&
        accountButtonRef.current &&
        !accountButtonRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
      // Закрытие модального окна корзины
      if (
        cartModalRef.current &&
        !cartModalRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
      // Закрытие мобильного меню
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Переключатель для мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='fixed w-full bg-white z-50 shadow-md'>
      <div className="header-banner bg-[#1d1d1d] text-white flex justify-center py-2">
        <p className='text-xs sm:text-sm font-light font-[Open_Sans]'>Sale | Up to 50% off</p>
      </div>

      <div className="head-wrapper w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 sm:h-20 items-center">
        <div className='flex gap-[30px]'>
        {/* Мобильное меню и лого */}
        <div className="flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-black hamburger-button">
            {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
          <div className="logo">
            <Link to={'/'} className='text-3xl sm:text-4xl font-semibold font-[Open_Sans]'>GUESS</Link>
          </div>
        </div>

        {/* Навигация для десктопа */}
        <div className="hidden lg:flex items-center gap-8 text-[#939090]">
          <NavLink to={'/women'} className={({ isActive }) =>
            `text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] transition duration-300 ${isActive ? 'text-black font-semibold' : 'hover:text-[#1c1b1b]'}`
          }>WOMEN</NavLink>
          <NavLink to={'/men'} className={({ isActive }) =>
            `text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] transition duration-300 ${isActive ? 'text-black font-semibold' : 'hover:text-[#1c1b1b]'}`
          }>MEN</NavLink>
          <NavLink to={'/kids'} className='text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] hover:text-[#1c1b1b] transition duration-300'>KIDS</NavLink>
          <NavLink to={'/home'} className='text-base font-normal tracking-[0.0625rem] leading-[2.1875rem] hover:text-[#1c1b1b] transition duration-300'>HOME</NavLink>
        </div>
          </div>
        {/* Иконки и аккаунт */}
        <div className="head-right flex items-center gap-2 sm:gap-4">
          
          {/* Десктопный вариант логина/регистрации */}
          {!user ? (
            <div className="hidden lg:flex text-sm font-light font-[Open_Sans] gap-1 mr-4">
              <Link to={'/login?tab=login'} className='underline'>Login</Link>
              <p>or</p>
              <Link to={'/login?tab=register'} className='underline'>register</Link>
            </div>
          ) : (
            <div className="hidden lg:block text-sm font-medium mr-4">
              Hi {userName}
            </div>
          )}

          {/* Иконка аккаунта с модальным окном */}
          <div className='relative flex items-center'>
            <span ref={accountButtonRef} onClick={() => setIsAccountOpen((prev) => !prev)} className="px-1 sm:px-2 cursor-pointer relative group">
              <IoPersonOutline size={26} />
              <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
            </span>

            {isAccountOpen && (
              <div ref={accountModalRef} className="absolute top-[55px] right-0 bg-white shadow-lg border border-gray-200 w-[300px] sm:w-[380px] z-50">
                {user ? (
                  <div className="p-6 sm:p-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-[#3b3b3b] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-medium mr-4">
                        {userName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="text-sm sm:text-base font-medium leading-tight">
                        <p className='font-[Open_Sans]'>Hi {userName},</p>
                        <p className='font-bold'>welcome back!</p>
                      </div>
                    </div>
                    <hr className="my-5" />
                    <div className="space-y-3 text-sm">
                      <Link to='/my-guess' className="flex items-center gap-2 hover:underline">
                        <img className='w-4 h-4 mr-2' src="https://images.seeklogo.com/logo-png/6/2/guess-jeans-logo-png_seeklogo-64100.png" alt="" /> My Guess
                      </Link>
                      <Link to='/personal-data' className="flex items-center gap-2 hover:underline">
                        <img className='w-4 h-4 mr-2' src="/icons/card-icon.svg" alt="" />
                        <span className='relative'>
                          Personal data
                          <span className='absolute -top-1 -right-2 w-2 h-2 bg-red-600 rounded-full'></span>
                        </span>
                      </Link>
                      <Link to='/orders' className="flex items-center gap-2 hover:underline">
                        <BsBox2 className='mr-2' /> Orders
                      </Link>
                      <Link to='/returns' className="flex items-center gap-2 hover:underline">
                        <IoIosReturnLeft className='mr-2' /> Returns
                      </Link>
                      <Link to='/help' className="flex items-center gap-2 hover:underline">
                        <IoHelpCircleOutline className='mr-2' /> Need help
                      </Link>
                    </div>
                    <button onClick={handleLogout} className="w-full mt-6 border border-black py-2 text-center font-medium hover:bg-black hover:text-white transition duration-200">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-6 sm:p-10">
                    <Link to={'/login'} className="w-full bg-[#1d1d1d] border-2 border-transparent hover:bg-white hover:text-black hover:border-black text-white py-2 px-4 mb-4 block text-center transition duration-200">
                      Login
                    </Link>
                    <p className="text-sm mb-4">
                      <strong>Are you a new customer?</strong>{' '}
                      <Link to={'/login?tab=register'} className="underline">Register now</Link>
                    </p>
                    <hr className="my-6" />
                    <div className="space-y-3 text-sm">
                      <Link to='/my-guess' className="flex items-center gap-2 hover:underline">
                        <img className='w-4 h-4 mr-2' src="https://images.seeklogo.com/logo-png/6/2/guess-jeans-logo-png_seeklogo-64100.png" alt="" /> My Guess
                      </Link>
                      <Link to='/orders' className="flex items-center gap-2 hover:underline">
                        <BsBox2 className='mr-2' /> Orders
                      </Link>
                      <Link to='/returns' className="flex items-center gap-2 hover:underline">
                        <IoIosReturnLeft className='mr-2' /> Returns
                      </Link>
                      <Link to='/help' className="flex items-center gap-2 hover:underline">
                        <IoHelpCircleOutline className='mr-2' /> Need help
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className='hidden lg:block w-[1px] h-7 bg-gray-300'></div>
          
          <div className="hidden lg:block relative group">
            <span className="py-2 px-1 sm:px-2">
              <img className='w-7 h-5' src="https://meclis.gov.az/main/bayraq.svg" alt="" />
              <p className='text-xs text-center'>az | en</p>
            </span>
            <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </div>
          
          <div className='hidden lg:block w-[1px] h-7 bg-gray-300'></div>

          <span className="relative group">
            <span className="py-2 px-1 sm:px-2 cursor-pointer">
              <IoSearchOutline size={26} />
            </span>
            <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </span>
          
          <span className="hidden sm:block relative group">
            <span className="py-2 px-1 sm:px-2 cursor-pointer">
              <IoLocationOutline size={26} />
            </span>
            <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </span>

          <Link
            to={user ? '/wishlist' : '/login?tab=register'}
            className="relative group"
          >
            <span className="py-2 px-1 sm:px-2 cursor-pointer">
              <IoMdHeartEmpty size={26} />
            </span>
            <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </Link>

          {/* Иконка корзины с модальным окном */}
          <div className='relative flex items-center'>
            <span
              ref={cartButtonRef}
              onClick={() => setIsCartOpen((prev) => !prev)}
              className="px-1 sm:px-2 cursor-pointer relative group"
            >
              <IoBagOutline size={26} />
              <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
            </span>
            {isCartOpen && (
              <div
                ref={cartModalRef}
                className="absolute top-[55px] right-0 bg-white shadow-lg border border-gray-200 w-[300px] sm:w-[400px] z-50 p-6 sm:p-8"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Your Shopping bag is empty</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  You currently don't have any items in your shopping bag
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mb-4">
                  Can't see your items?
                </p>
                {!user && (
                  <Link
                    to="/login"
                    className="inline-block mt-2 bg-black w-full text-center text-white px-4 py-2 hover:bg-white hover:text-black border border-black transition duration-200"
                  >
                    Sign in or create an account
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Мобильное меню (показывается только на маленьких экранах) */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 z-40 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Link to={'/'} className='text-3xl font-semibold font-[Open_Sans]'>GUESS</Link>
            <button onClick={toggleMobileMenu}>
              <IoClose size={28} />
            </button>
          </div>
          <hr className="my-4" />
          
          <div className="flex flex-col gap-4 text-lg">
            <NavLink to={'/women'} onClick={toggleMobileMenu} className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}`
            }>WOMEN</NavLink>
            <NavLink to={'/men'} onClick={toggleMobileMenu} className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}`
            }>MEN</NavLink>
            <NavLink to={'/kids'} onClick={toggleMobileMenu} className='font-medium text-gray-600 hover:text-black transition duration-300'>KIDS</NavLink>
            <NavLink to={'/home'} onClick={toggleMobileMenu} className='font-medium text-gray-600 hover:text-black transition duration-300'>HOME</NavLink>
            <hr className="my-2" />
            
            <div className="flex items-center gap-4 text-gray-600">
                <IoLocationOutline size={24} />
                <span>Find a store</span>
            </div>
            
            {/* Мобильный вариант логина/регистрации */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to={'/login?tab=login'} onClick={toggleMobileMenu} className='w-full text-center py-2 border border-black hover:bg-black hover:text-white transition-colors duration-200'>Login</Link>
                <Link to={'/login?tab=register'} onClick={toggleMobileMenu} className='w-full text-center py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-200'>Register</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-medium text-lg">Hi {userName}</p>
                <Link to='/my-account' onClick={toggleMobileMenu} className='text-gray-600 hover:underline'>My Account</Link>
                <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="w-full text-center py-2 border border-black hover:bg-black hover:text-white transition-colors duration-200">
                  Logout
                </button>
              </div>
            )}
            
            <div className='flex items-center gap-2 mt-4 text-gray-600'>
              <img className='w-7 h-5' src="https://meclis.gov.az/main/bayraq.svg" alt="" />
              <span className='font-medium'>az | en</span>
            </div>

          </div>
        </div>
      </div>

      <hr className="border-t-[3px] border-[#e6e6e6]" />
    </div>
  );
}

export default Header;