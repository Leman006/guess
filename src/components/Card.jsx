import React, { useState, useEffect } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function Card({ product, filteredColor = null }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Функция для нахождения индекса варианта по цвету
  const findVariantByColor = (colorName) => {
    if (!product.colorVariants || !colorName) return 0;
    
    const variantIndex = product.colorVariants.findIndex(variant => 
      variant.color.toLowerCase() === colorName.toLowerCase()
    );
    return variantIndex >= 0 ? variantIndex : 0;
  };

  // Устанавливаем выбранный вариант на основе фильтра
  useEffect(() => {
    if (filteredColor && product.colorVariants) {
      const variantIndex = findVariantByColor(filteredColor);
      setSelectedVariant(variantIndex);
    }
  }, [filteredColor, product.colorVariants]);

  // Получаем текущие изображения в зависимости от выбранного варианта
  const getCurrentImages = () => {
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants[selectedVariant]?.images || product.images || [];
    }
    if (product.images && Array.isArray(product.images)) {
      return product.images;
    }
    if (product.image) {
      return [product.image];
    }
    return [];
  };

  // Получаем текущий цвет
  const getCurrentColor = () => {
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants[selectedVariant]?.color;
    }
    if (product.color) {
      return product.color;
    }
    if (product.colors && product.colors.length > 0) {
      return product.colors[0];
    }
    return null;
  };

  // Создаем уникальный ID для wishlist на основе продукта и выбранного цвета
  const getWishlistItemId = () => {
    const currentColor = getCurrentColor();
    return currentColor ? `${product.id || product.code}_${currentColor}` : (product.id || product.code);
  };

  // Создаем объект для сохранения в wishlist
  const getWishlistItem = () => {
    const currentColor = getCurrentColor();
    const currentImages = getCurrentImages();
    
    return {
      ...product,
      selectedColor: currentColor,
      selectedVariantIndex: selectedVariant,
      selectedImages: currentImages,
      wishlistId: getWishlistItemId() // уникальный ID для wishlist
    };
  };

  const currentImages = getCurrentImages();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItemId = getWishlistItemId();
    setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));
  }, [product.id, product.code, selectedVariant]);

  // Сброс индекса изображения при смене цвета
  useEffect(() => {
    setCurrentImg(0);
    setNextImg(null);
    setAnimating(false);
  }, [selectedVariant]);

  const handleSlide = (dir) => {
    if (animating || currentImages.length <= 1) return;
    setDirection(dir);
    setAnimating(true);
    if (dir === 'right') {
      setNextImg((currentImg + 1) % currentImages.length);
    } else {
      setNextImg((currentImg - 1 + currentImages.length) % currentImages.length);
    }
  };

  const handleAnimationEnd = () => {
    setCurrentImg(nextImg);
    setNextImg(null);
    setAnimating(false);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItemId = getWishlistItemId();
    let updated;
  
    if (isInWishlist) {
      updated = stored.filter((item) => item.wishlistId !== wishlistItemId);
    } else {
      updated = [...stored, getWishlistItem()];
    }
  
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(!isInWishlist);
    
    // Add this line to dispatch the wishlistUpdated event
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleColorClick = (e, variantIndex) => {
    e.preventDefault();
    // Только позволяем менять цвет если не установлен фильтр
    if (!filteredColor) {
      setSelectedVariant(variantIndex);
    }
  };

  // Функция для получения CSS цвета
  const getColorStyle = (colorName) => {
    if (!colorName) return '#cccccc';
    
    const colorMap = {
      'black': '#000000',
      'white': '#ffffff',
      'blue': '#0066cc',
      'dark blue': '#003366',
      'light blue': '#87CEEB',
      'navy': '#000080',
      'grey': '#808080',
      'gray': '#808080',
      'dark gray': '#404040',
      'light gray': '#D3D3D3',
      'cream': '#f5f5dc',
      'beige': '#f5f5dc',
      'brown': '#8B4513',
      'pink': '#FFC0CB',
      'red': '#FF0000',
      'green': '#8B9467',
      'yellow': '#FFFF00',
      'orange': '#FFA500',
      'purple': '#800080',
      'multi beige': '#d2b48c',
      'multi gold': '#ffd700',
    };

    const lowerColor = colorName.toLowerCase().trim();
    return colorMap[lowerColor] || (lowerColor.includes('white') ? '#f3f3f3' : '#cccccc');
  };

  // Определяем, есть ли несколько цветовых вариантов
  const hasMultipleColors = () => {
    if (product.colorVariants && product.colorVariants.length > 1) return true;
    if (product.colors && product.colors.length > 1) return true;
    return false;
  };

  // Получаем все доступные цвета
  const getAllColors = () => {
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants.map(variant => variant.color);
    }
    if (product.colors && product.colors.length > 0) {
      return product.colors;
    }
    return [];
  };

  const allColors = getAllColors();

  if (currentImages.length === 0) {
    return (
      <div className="w-full group">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
        <div className="mt-2 px-1 mb-[40px]">
          <p className="text-sm sm:text-base font-normal text-[#1c1b1b] mb-1">{product.name}</p>
          <p className="text-sm sm:text-base text-[#1c1b1b] font-medium">{product.price?.toFixed(2) || 'N/A'} €</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full group">
      <Link to={`${product.code}`}
        className="relative block aspect-[3/4] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={currentImages[currentImg]}
          alt="current"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ${
            nextImg !== null ? `slide-out-${direction}` : ''
          }`}
        />
        {nextImg !== null && (
          <img
            src={currentImages[nextImg]}
            alt="next"
            onAnimationEnd={handleAnimationEnd}
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-all duration-500 slide-in-${direction}`}
          />
        )}

        {/* Навигация */}
        {hovered && (
          <>
            <div className="absolute top-3 right-3 text-gray-700 z-20">
              <button onClick={toggleWishlist}>
                {isInWishlist ? (
                  <IoMdHeart size={25} className="text-black" />
                ) : (
                  <IoMdHeartEmpty size={25} className="text-gray-700" />
                )}
              </button>
            </div>
            
            {/* Стрелки навигации - показываем только если есть несколько изображений */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSlide('left');
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20"
                >
                  <IoIosArrowBack size={25} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSlide('right');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20"
                >
                  <IoIosArrowForward size={25} />
                </button>
              </>
            )}
          </>
        )}

        {/* Цвета - показываем только если есть несколько цветов и нет активного фильтра */}
        {hovered && !filteredColor && hasMultipleColors() && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {product.colorVariants && product.colorVariants.length > 1 ? (
              product.colorVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={(e) => handleColorClick(e, index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    selectedVariant === index 
                      ? 'border-black scale-110' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{
                    backgroundColor: getColorStyle(variant.color),
                  }}
                />
              ))
            ) : (
              allColors.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: getColorStyle(color),
                  }}
                />
              ))
            )}
          </div>
        )}
      </Link>

      {/* Product info */}
      <div className="mt-2 px-1 mb-[40px]">
        <p className="text-sm sm:text-base font-normal text-[#1c1b1b] mb-1">{product.name}</p>
        <p className="text-sm sm:text-base text-[#1c1b1b] font-medium">{product.price?.toFixed(2) || 'N/A'} €</p>
        {/* Показываем текущий цвет если есть фильтр, иначе показываем "More colors +" */}
        {filteredColor && getCurrentColor() ? (
          <p className="text-xs text-[#767676] mt-1">Color: {getCurrentColor()}</p>
        ) : (
          hasMultipleColors() && (
            <p className="text-xs text-[#767676] mt-1">More colors +</p>
          )
        )}
      </div>
    </div>
  );
}

export default Card;