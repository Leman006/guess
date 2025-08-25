import React, { useEffect, useState } from 'react';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import apiInstance from '../api/axiosInstance';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successProduct, setSuccessProduct] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);

    // Загружаем все товары для рекомендаций
    apiInstance.get('/products')
      .then((res) => {
        const allProducts = res.data.products || res.data;

        // Отфильтровать те, что не в вишлисте (используем основные ID товаров)
        const wishlistProductIds = stored.map((item) => item.id || item.code);
        const filtered = allProducts.filter((p) => !wishlistProductIds.includes(p.id || p.code));

        // Перемешать и выбрать 5
        const randomFive = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
        setSuggestedProducts(randomFive);
      })
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  const removeFromWishlist = (wishlistId) => {
    const updated = wishlist.filter((item) => item.wishlistId !== wishlistId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    
    // Добавить эту строку:
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addSuggestedToWishlist = (product) => {
    const wishlistItem = {
      ...product,
      selectedColor: product.color || (product.colors && product.colors[0]) || (product.colorVariants && product.colorVariants[0]?.color),
      selectedVariantIndex: 0,
      selectedImages: product.images || (product.colorVariants && product.colorVariants[0]?.images) || [product.image],
      wishlistId: `${product.id || product.code}_${product.color || (product.colors && product.colors[0]) || (product.colorVariants && product.colorVariants[0]?.color) || 'default'}`
    };
  
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updated = [...stored, wishlistItem];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    
    // Добавить эту строку:
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  // Функция для добавления товара из wishlist в корзину
  const addToCartFromWishlist = (product, selectedSize) => {
    if (!selectedSize) {
      return false; // Размер не выбран
    }
  
    // Создаем объект товара для корзины
    const cartItem = {
      id: `${product.code || product.id}-${selectedSize}-${product.selectedColor || 'default'}`,
      name: product.name,
      code: product.code || product.id,
      price: parseFloat(product.price),
      size: selectedSize,
      color: product.selectedColor || '',
      image: (product.selectedImages && product.selectedImages[0]) || product.image || '',
      quantity: 1
    };
  
    // Получаем текущую корзину из localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      // Если товар уже есть, увеличиваем количество
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Если товара нет, добавляем новый
      existingCart.push(cartItem);
    }
    
    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Генерируем событие для обновления корзины в других компонентах
    window.dispatchEvent(new Event('cartUpdated'));
  
    // УДАЛЯЕМ ТОВАР ИЗ WISHLIST
    removeFromWishlist(product.wishlistId);
  
    // Генерируем событие для обновления wishlist в других компонентах
    window.dispatchEvent(new Event('wishlistUpdated'));
  
    // Показываем модальное окно успеха
    setSuccessProduct(product);
    setShowSuccessModal(true);
  
    // Закрываем модальное окно через 5 секунд
    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessProduct(null);
    }, 5000);
  
    return true; // Успешно добавлено
  };
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-20 sm:pt-32 lg:pt-40 pb-10">
      {/* Модальное окно успешного добавления */}
      {showSuccessModal && successProduct && (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-80 p-4 animate-slide-in">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 mb-4">Item added to cart successfully!</h3>
            
            <div className="mb-4">
              <img 
                src={(successProduct.selectedImages && successProduct.selectedImages[0]) || successProduct.image} 
                alt={successProduct.name}
                className="w-32 h-40 object-cover mx-auto rounded"
              />
            </div>
            
            <Link
              to="/cart"
              className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors rounded mb-2 block text-center"
              onClick={() => setShowSuccessModal(false)}
            >
              View Shopping Bag
            </Link>
            
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full border border-gray-300 py-2 px-4 text-sm font-medium hover:border-gray-600 transition-colors rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 pt-7">Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty.</p>
          <Link 
            to="/women" 
            className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {wishlist.map((product) => (
            <WishlistCard 
              key={product.wishlistId || `${product.id}_${product.selectedColor || 'default'}`} 
              product={product} 
              remove={removeFromWishlist}
              addToCart={addToCartFromWishlist}
            />
          ))}
        </div>
      )}
      
      {suggestedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">Top Picks for you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {suggestedProducts.map((item) => (
              <SuggestionCard key={item.id || item.code} product={item} addToWishlist={addSuggestedToWishlist} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Компонент для карточек рекомендаций
const SuggestionCard = ({ product, addToWishlist }) => {
  const getFirstImage = () => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.colorVariants && product.colorVariants[0]?.images && product.colorVariants[0].images.length > 0) {
      return product.colorVariants[0].images[0];
    }
    if (product.image) return product.image;
    return '/placeholder-image.jpg';
  };

  return (
    <div className="text-center group">
      <Link to={`/${product.code || product.id}`} className="block relative">
        <img 
          src={getFirstImage()} 
          alt={product.name} 
          className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover transition-opacity group-hover:opacity-90" 
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          title="Add to wishlist"
        >
          <IoMdClose size={16} className="rotate-45" />
        </button>
      </Link>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-black line-clamp-2">{product.name}</p>
      <p className="text-xs sm:text-sm font-semibold">{product.price?.toFixed(2) || 'N/A'} €</p>
    </div>
  );
};

// Основная карточка wishlist с hover-слайдером
const WishlistCard = ({ product, remove, addToCart }) => {
  const [hovered, setHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);

  // Получаем изображения для текущего продукта
  const getProductImages = () => {
    // Используем сохраненные изображения выбранного варианта
    if (product.selectedImages && product.selectedImages.length > 0) {
      return product.selectedImages;
    }
    // Fallback на обычные изображения
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    // Fallback на изображения из colorVariants
    if (product.colorVariants && product.colorVariants[0]?.images) {
      return product.colorVariants[0].images;
    }
    // Fallback на одно изображение
    if (product.image) {
      return [product.image];
    }
    return [];
  };

  const productImages = getProductImages();

  const handleSlide = (dir) => {
    if (animating || productImages.length <= 1) return;
    setDirection(dir);
    setAnimating(true);
    if (dir === 'right') {
      setNextImg((currentImg + 1) % productImages.length);
    } else {
      setNextImg((currentImg - 1 + productImages.length) % productImages.length);
    }
  };

  const handleAnimationEnd = () => {
    setCurrentImg(nextImg);
    setNextImg(null);
    setAnimating(false);
  };

  // Функция для добавления в корзину
  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      // Убираем ошибку через 3 секунды
      setTimeout(() => {
        setShowSizeError(false);
      }, 3000);
      return;
    }

    // Добавляем товар в корзину
    const success = addToCart(product, selectedSize);
    
    if (success) {
      // Сбрасываем выбранный размер после успешного добавления
      setSelectedSize('');
      setShowSizeError(false);
    }
  };

  // Если нет изображений, показываем placeholder
  if (productImages.length === 0) {
    return (
      <div className="relative w-full max-w-[333px] mx-auto">
        <button
          className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
          onClick={() => remove(product.wishlistId)}
        >
          <IoMdClose size={18} className="sm:w-[22px] sm:h-[22px]" />
        </button>

        <div className="relative h-[300px] sm:h-[380px] lg:h-[445px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>

        <div className="text-center mt-2 sm:mt-3 mb-4 sm:mb-[30px]">
          <p className="text-xs sm:text-sm text-black line-clamp-2">{product.name}</p>
          <p className="text-xs sm:text-sm font-medium">{product.price?.toFixed(2) || 'N/A'} €</p>
          {product.selectedColor && (
            <p className="text-xs text-gray-500 mt-1">Color: {product.selectedColor}</p>
          )}
        </div>

        <div className="border w-full px-3 sm:px-[17px] py-3 sm:py-[19px] relative text-xs sm:text-sm">
          <label className="absolute -top-2 left-2 bg-white text-xs text-gray-500 px-1">
            Size
          </label>
          <select
            className="w-full mt-1 outline-none text-xs sm:text-sm"
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              setShowSizeError(false);
            }}
          >
            <option value=""></option>
            {product.sizes?.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>


        <button
          onClick={handleAddToBag}
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
  }

  return (
    <div className="relative w-full max-w-[333px] mx-auto">
      {/* Удаление (крестик) */}
      <button
        className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
        onClick={() => remove(product.wishlistId)}
      >
        <IoMdClose size={18} className="sm:w-[22px] sm:h-[22px]" />
      </button>

      {/* Обертка для слайдера */}
      <Link to={`/${product.code || product.id}`}>
        <div
          className="relative h-[300px] sm:h-[380px] lg:h-[445px] overflow-hidden cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Текущее изображение */}
          <img
            src={productImages[currentImg]}
            alt="current"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ${
              nextImg !== null ? `slide-out-${direction}` : ''
            }`}
          />
          {/* Следующее изображение (если есть) */}
          {nextImg !== null && (
            <img
              src={productImages[nextImg]}
              alt="next"
              onAnimationEnd={handleAnimationEnd}
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-all duration-500 slide-in-${direction}`}
            />
          )}

          {/* Стрелки при наведении (только на desktop и если есть несколько изображений) */}
          {hovered && productImages.length > 1 && (
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

          {/* Мобильные кнопки навигации (только если есть несколько изображений) */}
          {productImages.length > 1 && (
            <>
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
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImg ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Link>

      {/* Название, цена и цвет */}
      <div className="text-center mt-2 sm:mt-3 mb-4 sm:mb-[30px]">
        <p className="text-xs sm:text-sm text-black line-clamp-2">{product.name}</p>
        <p className="text-xs sm:text-sm font-medium">{product.price?.toFixed(2) || 'N/A'} €</p>
        {product.selectedColor && (
          <p className="text-xs text-gray-500 mt-1">Color: {product.selectedColor}</p>
        )}
      </div>

      {/* Size dropdown */}
      <div className="border w-full px-3 sm:px-[17px] py-3 sm:py-[19px] relative text-xs sm:text-sm">
        <label className="absolute -top-2 left-2 bg-white text-xs text-gray-500 px-1">
          Size
        </label>
        <select
          className="w-full mt-1 outline-none text-xs sm:text-sm"
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setShowSizeError(false);
          }}
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
        onClick={handleAddToBag}
        className={`mt-4 sm:mt-6 w-full py-2 sm:py-3 rounded text-xs sm:text-sm transition-colors ${
          selectedSize
            ? 'bg-black text-white cursor-pointer hover:bg-white hover:text-black border'
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