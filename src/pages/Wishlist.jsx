import React, { useEffect, useState } from 'react';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import apiInstance from '../api/axiosInstance';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);

    // Загружаем все товары
    apiInstance.get('/products')
      .then((res) => {
        const allProducts = res.data.products || res.data;

        // Отфильтровать те, что не в вишлисте
        const wishlistIds = stored.map((item) => item.id);
        const filtered = allProducts.filter((p) => !wishlistIds.includes(p.id));

        // Перемешать и выбрать 5
        const randomFive = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
        setSuggestedProducts(randomFive);
      })
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-20 sm:pt-32 lg:pt-40 pb-10">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 pt-7">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {wishlist.map((product) => (
            <WishlistCard key={product.id} product={product} remove={removeFromWishlist} />
          ))}
        </div>
      )}
      {suggestedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">Top Picks for you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {suggestedProducts.map((item) => (
              <div key={item.id} className="text-center">
                <img 
                  src={item.images?.[0]} 
                  alt={item.name} 
                  className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover" 
                />
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-black line-clamp-2">{item.name}</p>
                <p className="text-xs sm:text-sm font-semibold">{item.price.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 👉 Карточка с hover-слайдером
const WishlistCard = ({ product, remove }) => {
  const [hovered, setHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const handleSlide = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    if (dir === 'right') {
      setNextImg((currentImg + 1) % product.images.length);
    } else {
      setNextImg((currentImg - 1 + product.images.length) % product.images.length);
    }
  };

  const handleAnimationEnd = () => {
    setCurrentImg(nextImg);
    setNextImg(null);
    setAnimating(false);
  };

  return (
    <div className="relative w-full max-w-[333px] mx-auto">
      {/* Удаление (крестик) */}
      <button
        className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
        onClick={() => remove(product.id)}
      >
        <IoMdClose size={18} className="sm:w-[22px] sm:h-[22px]" />
      </button>

      {/* Обертка для слайдера */}
      <div
        className="relative h-[300px] sm:h-[380px] lg:h-[445px] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Текущее изображение */}
        <img
          src={product.images[currentImg]}
          alt="current"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ${
            nextImg !== null ? `slide-out-${direction}` : ''
          }`}
        />
        {/* Следующее изображение (если есть) */}
        {nextImg !== null && (
          <img
            src={product.images[nextImg]}
            alt="next"
            onAnimationEnd={handleAnimationEnd}
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-all duration-500 slide-in-${direction}`}
          />
        )}

        {/* Стрелки при наведении (только на desktop) */}
        {hovered && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSlide('left');
              }}
              className="hidden sm:block absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
            >
              <IoIosArrowBack size={20} className="lg:w-[25px] lg:h-[25px]" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSlide('right');
              }}
              className="hidden sm:block absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
            >
              <IoIosArrowForward size={20} className="lg:w-[25px] lg:h-[25px]" />
            </button>
          </>
        )}

        {/* Мобильные кнопки навигации */}
        <div className="sm:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSlide('left');
            }}
            className="bg-white/80 rounded-full p-2"
          >
            <IoIosArrowBack size={16} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSlide('right');
            }}
            className="bg-white/80 rounded-full p-2"
          >
            <IoIosArrowForward size={16} />
          </button>
        </div>

        {/* Индикаторы изображений (мобильная версия) */}
        <div className="sm:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImg ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Название и цена */}
      <div className="text-center mt-2 sm:mt-3 mb-4 sm:mb-[30px]">
        <p className="text-xs sm:text-sm text-black line-clamp-2">{product.name}</p>
        <p className="text-xs sm:text-sm font-medium">{product.price.toFixed(2)} €</p>
      </div>

      {/* Size dropdown */}
      <div className="border w-full px-3 sm:px-[17px] py-3 sm:py-[19px] relative text-xs sm:text-sm">
        <label className="absolute -top-2 left-2 bg-white text-xs text-gray-500 px-1">
          Size
        </label>
        <select
          className="w-full mt-1 outline-none text-xs sm:text-sm"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value=""></option>
          {product.sizes?.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Add to bag кнопка */}
      <button
        className={`mt-4 sm:mt-6 w-full py-2 sm:py-3 rounded text-xs sm:text-sm transition-colors ${
          selectedSize
            ? 'bg-black text-white cursor-pointer hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!selectedSize}
      >
        Add to bag
      </button>
    </div>
  );
};

export default Wishlist;