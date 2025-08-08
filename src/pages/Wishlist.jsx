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
    <div className="w-[1440px] mx-auto px-6 pt-40 pb-10">
      <h1 className="text-2xl font-semibold mb-10">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-10">
          {wishlist.map((product) => (
            <WishlistCard key={product.id} product={product} remove={removeFromWishlist} />
          ))}
        </div>
      )}
      {suggestedProducts.length > 0 && (
        <div className="mt-20">
            <h2 className="text-xl font-semibold text-center mb-6">Top Picks for you</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {suggestedProducts.map((item) => (
                <div key={item.id} className="text-center">
                <img src={item.images?.[0]} alt={item.name} className="w-full h-[300px] object-cover" />
                <p className="mt-3 text-sm text-black">{item.name}</p>
                <p className="text-sm font-semibold">{item.price.toFixed(2)} €</p>
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
    <div className="relative w-[333px]">
      {/* Удаление (крестик) */}
      <button
        className="absolute top-2 right-2 z-20"
        onClick={() => remove(product.id)}
      >
        <IoMdClose size={22} />
      </button>

      {/* Обертка для слайдера */}
      <div
        className="relative h-[445px] overflow-hidden"
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

        {/* Стрелки при наведении */}
        {hovered && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSlide('left');
              }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20  p-1 "
            >
              <IoIosArrowBack size={25} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSlide('right');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20  p-1 "
            >
              <IoIosArrowForward size={25} />
            </button>
          </>
        )}
      </div>

      {/* Название и цена */}
      <div className="text-center mt-3 mb-[30px]">
        <p className="text-sm text-black">{product.name}</p>
        <p className="text-sm font-medium">{product.price.toFixed(2)} €</p>
      </div>

      {/* Size dropdown */}
      <div className="border w-full px-[17px] py-[19px] relative text-sm">
        <label className="absolute -top-2 left-2 bg-white text-xs text-gray-500 px-1">
          Size
        </label>
        <select
        className="w-full mt-1 outline-none"
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
  className={`mt-6 w-full py-3 rounded text-sm transition-colors ${
    selectedSize
      ? 'bg-black text-white cursor-pointer'
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
