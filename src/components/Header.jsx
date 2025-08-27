import React, { useEffect, useRef, useState } from 'react';
import { BsBox2 } from 'react-icons/bs';
import { IoIosReturnLeft, IoMdHeartEmpty } from 'react-icons/io';
import { IoBagOutline, IoHelpCircleOutline, IoLocationOutline, IoPersonOutline, IoSearchOutline, IoMenu, IoClose, IoChevronForward, IoHomeOutline, IoSearch, IoHome } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import SearchComponent from '../pages/SearchComponent';

function Header() {
  // Состояния для модальных окон
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountModalRef = useRef(null);
  const accountButtonRef = useRef(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartModalRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Состояние для корзины
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Состояние для мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [activeGender, setActiveGender] = useState('WOMEN');
  const [activeMenu, setActiveMenu] = useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const userName = user?.name || '';
  const [wishlistCount, setWishlistCount] = useState(0);

  // Загрузка корзины из localStorage
  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      const newCartCount = cart.reduce((total, item) => total + item.quantity, 0);
setCartCount(newCartCount);
    };

    loadCart();

    // Слушаем события обновления корзины
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  // Загрузка wishlist из localStorage
useEffect(() => {
  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistCount(wishlist.length);
  };

  loadWishlist();

  // Слушаем события обновления wishlist
  const handleWishlistUpdate = () => {
    loadWishlist();
  };

  window.addEventListener('wishlistUpdated', handleWishlistUpdate);
  window.addEventListener('storage', handleWishlistUpdate);

  return () => {
    window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    window.removeEventListener('storage', handleWishlistUpdate);
  };
}, []);

  // Функции для работы с корзиной
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
  
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    // Добавить эту строку:
    const newCartCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCartCount);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    // Добавить эти две строки:
    const newCartCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCartCount);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getShippingFee = () => {
    const total = parseFloat(getCartTotal());
    return total > 0 ? '0.00' : '0.00'; // Free shipping
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const categories = {
    WOMEN: [
      { name: 'Homepage Woman', icon: <IoHomeOutline size={18} /> },
      { name: 'New In', sub: [] },
      { name: 'Jeans', sub: [] },
      { name: 'Clothing', sub: ['Dresses and Jumpsuits', 'Coats and Jackets', 'Tops and Shirts', 'T-Shirts', 'Knitwear', 'Sweatshirts', 'Trousers', 'Skirts and Shorts', 'Beachwear', 'Activewear', 'Socks'] },
      { name: 'Lingerie', sub: [] },
      { name: 'Bags', sub: [] },
      { name: 'Shoes', sub: [] },
      { name: 'Accessories', sub: [] },
      { name: 'Marciano', sub: [] },
      { name: 'Gifts', sub: [] },
      { name: 'Occasionwear', sub: [] },
      { name: 'Past Collections', sub: [] },
    ],
    MEN: [
      { name: 'Homepage Men', icon: <IoHomeOutline size={18} /> },
      { name: 'New In', sub: [] },
      { name: 'Jeans', sub: [] },
      { name: 'Clothing', sub: ['Coats and Jackets', 'T-shirts and Polo Shirts', 'Shirts', 'Knitwear', 'Sweatshirts', 'Trousers and shorts', 'Beachwear', 'Underwear', 'Activewear'] },
      { name: 'Bag', sub: [] },
      { name: 'Shoes and accessories', sub: [] },
      { name: 'Marciano', sub: [] },
      { name: 'Gifts', sub: [] },
      { name: 'Occasionwear', sub: [] },
      { name: 'Past Collections', sub: [] },
    ]
  };

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
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(event.target) &&
        accountButtonRef.current &&
        !accountButtonRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
      if (
        cartModalRef.current &&
        !cartModalRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
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
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-black hamburger-button">
              {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
            <div className="logo">
              <Link to={'/'} className='text-3xl sm:text-4xl font-semibold font-[Open_Sans]'>GUESS</Link>
            </div>
          </div>

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

        <div className="head-right flex items-center gap-2 sm:gap-4">
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

          {/* Account Modal */}
          <div className='relative flex items-center'>
            <span ref={accountButtonRef} onClick={() => setIsAccountOpen((prev) => !prev)} className="px-1 sm:px-2 cursor-pointer relative group py-7">
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

          <Link to={'/search'} className="relative group">
            <span className="py-2 px-1 sm:px-2 cursor-pointer">
              <IoSearchOutline size={26} />
            </span>
            <div className='absolute -bottom-1 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </Link>

          <span className="hidden sm:block relative group">
            <span className="py-2 px-1 sm:px-2 cursor-pointer">
              <IoLocationOutline size={26} />
            </span>
            <div className='absolute -bottom-1 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
          </span>

          <Link
  to={user ? '/wishlist' : '/login?tab=register'}
  className="relative group"
>
  <span className="py-2 px-1 sm:px-2 cursor-pointer relative">
    <IoMdHeartEmpty size={26} />
    {wishlistCount > 0 && (
      <span className="absolute top-5 -right-6 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </span>
  <div className='absolute -bottom-1 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
</Link>

          {/* Cart Modal with Items */}
          <div className='relative flex items-center'>
            <span
              ref={cartButtonRef}
              onClick={() => setIsCartOpen((prev) => !prev)}
              className="px-1 sm:px-2 cursor-pointer relative group py-7"
            >
              <IoBagOutline size={26} />
              {cartCount > 0 && (
                <span className="absolute top-5 right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <div className='absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-black transition-all duration-200'></div>
            </span>
            
            {isCartOpen && (
              <div
                ref={cartModalRef}
                className="absolute top-[55px] right-0 bg-white shadow-xl border border-black-200 w-[400px] sm:w-[500px] z-50 max-h-[600px] overflow-hidden flex flex-col"
              >
                {cartItems.length === 0 ? (
                  <div className="p-6 sm:p-8">
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
                ) : (
                  <>
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-semibold">Show Shopping Bag</h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                          <div className="flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-20 object-cover rounded"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-black text-xl"
                              >
                                ×
                              </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-1">Size {item.size}</p>
                            {item.color && <p className="text-xs text-gray-500 mb-2">Color: {item.color}</p>}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-gray-300">
                                <button 
                                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-gray-100"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                <button 
                                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span>Shipping fee</span>
                        <span>{getShippingFee()} €</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 text-lg font-bold">
                        <span>Total</span>
                        <span>{getCartTotal()} €</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="flex-1 border border-gray-300 py-2 px-4 text-sm hover:bg-black hover:text-white transition-colors"
                        >
                          Continue Shopping
                        </button>
                        <Link 
                          to="/cart"
                          onClick={() => setIsCartOpen(false)}
                          className="flex-1 bg-black text-white py-2 px-4 text-sm border-black border-2 text-center hover:bg-white hover:text-black transition-colors"
                        >
                          Shopping bag ({cartCount})
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (same as before) */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ touchAction: 'none' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="text-sm font-medium text-gray-600">AZ | EN</div>
            <div className="text-xl font-bold tracking-wider">GUESS</div>
            <button onClick={toggleMobileMenu} className="p-1 touch-manipulation">
              <IoClose size={24} />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-none bg-gray-50 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex border-b border-gray-200 flex-shrink-0">
            {['WOMEN', 'MEN', 'KIDS', 'HOME'].map((gender) => (
              <button
                key={gender}
                className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 touch-manipulation ${
                  activeGender === gender 
                    ? 'text-black border-b-2 border-black bg-gray-50' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => {
                  setActiveGender(gender);
                  setActiveMenu(null);
                }}
              >
                {gender}
              </button>
            ))}
          </div>

          <div 
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Homepage Link */}
            {categories[activeGender] && categories[activeGender][0] && (
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <Link 
                  to={activeGender === 'WOMEN' ? "/women" : activeGender === 'MEN' ? "/men" : "/"} 
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoHome size={16} />
                  Homepage {activeGender}
                </Link>
              </div>
            )}

            {/* Shop by Brand */}
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="text-sm font-medium text-black">Shop by Brand</div>
            </div>

            {/* Categories */}
            <div className="flex flex-col">
              {(categories[activeGender] || [])
                .filter(cat => cat.name !== 'Homepage Woman' && cat.name !== 'Homepage Men')
                .map((cat) => (
                <div key={cat.name}>
                  {!cat.sub ? (
                    <Link
                      to={activeGender === 'WOMEN' ? "/women" : activeGender === 'MEN' ? "/men" : "/"}
                      className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium text-black border-b border-gray-200 hover:bg-gray-50 transition-colors touch-manipulation"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-left">{cat.name}</span>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium text-black border-b border-gray-200 hover:bg-gray-50 transition-colors touch-manipulation"
                      onClick={() => setActiveMenu(activeMenu === cat.name ? null : cat.name)}
                    >
                      <span className="text-left">{cat.name}</span>
                      <IoChevronForward 
                        size={16} 
                        className={`transition-transform duration-200 text-gray-400 ${
                          activeMenu === cat.name ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  )}
                  
                  {activeMenu === cat.name && cat.sub && (
                    <div className="bg-gray-50 border-l-2 border-gray-300">
                      {cat.sub.map((sub) => {
                        let linkPath = '/';
                        
                        if (cat.name === 'Clothing') {
                          linkPath = `/${activeGender.toLowerCase()}/clothing/${sub.toLowerCase().replace(/\s+/g, '-')}`;
                        } else if (cat.name === 'Jeans') {
                          linkPath = `/${activeGender.toLowerCase()}/clothing/${sub.toLowerCase().replace(/\s+/g, '-')}`;
                        } else if (cat.name === 'New In' || cat.name === 'Lingerie' || cat.name === 'Bags' || cat.name === 'Shoes' || cat.name === 'Accessories' || cat.name === 'Marciano' || cat.name === 'Gifts' || cat.name === 'Occasionwear' || cat.name === 'Past Collections') {
                          linkPath = `/${activeGender.toLowerCase()}/clothing/${sub.toLowerCase().replace(/\s+/g, '-')}`;
                        } else {
                          linkPath = `/${activeGender.toLowerCase()}`;
                        }

                        return (
                          <Link
                            key={sub}
                            to={linkPath}
                            className="block w-full text-left px-8 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-100 transition-colors touch-manipulation"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub}
                          </Link>
                        );
                      })}
                      
                      <Link
                        to={`/${activeGender.toLowerCase()}/clothing/all`}
                        className="block w-full text-left px-8 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-100 transition-colors touch-manipulation"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        View All
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-8 px-4 space-y-1 pb-8">
              <Link 
                to={user ? '/wishlist' : '/login?tab=register'}
                className="flex items-center gap-3 py-3 text-sm text-black hover:bg-gray-50 -mx-4 px-4 rounded transition-colors touch-manipulation" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoMdHeartEmpty size={20} /> 
                My Wishlist
              </Link>
              <Link 
                to='/location' 
                className="flex items-center gap-3 py-3 text-sm text-black hover:bg-gray-50 -mx-4 px-4 rounded transition-colors touch-manipulation" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoLocationOutline size={20} /> 
                Store Locator
              </Link>
              <Link 
                to='/help' 
                className="flex items-center gap-3 py-3 text-sm text-black hover:bg-gray-50 -mx-4 px-4 rounded transition-colors touch-manipulation" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoHelpCircleOutline size={20} /> 
                Help Center
              </Link>
            </div>
            
            {/* User Section */}
            <div className="px-4 py-6 border-t border-gray-200 bg-gray-50">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link 
                    to={'/login?tab=login'} 
                    className='text-sm font-semibold text-black underline hover:no-underline transition-all touch-manipulation' 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to={'/login?tab=register'} 
                    className='text-sm font-semibold text-black underline hover:no-underline transition-all touch-manipulation' 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IoPersonOutline size={20} />
                    <span className='font-semibold text-black'>Hi {userName}</span>
                  </div>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                    className='text-sm underline text-gray-600 hover:text-black transition-colors touch-manipulation'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <hr className="border-t-[3px] border-[#e6e6e6]" />
    </div>
  );
} 

export default Header;