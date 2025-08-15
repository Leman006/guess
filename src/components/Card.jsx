import React, { useState, useEffect } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function Card({ product }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0); // Индекс выбранного цветового варианта

  // Получаем текущие изображения в зависимости от выбранного варианта
  const getCurrentImages = () => {
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants[selectedVariant]?.images || product.images;
    }
    return product.images;
  };

  // Получаем текущий цвет
  const getCurrentColor = () => {
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants[selectedVariant]?.color || product.colors[0];
    }
    return product.colors[0];
  };

  const currentImages = getCurrentImages();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsInWishlist(stored.some((item) => item.id === product.id));
  }, [product.id]);

  // Сброс индекса изображения при смене цвета
  useEffect(() => {
    setCurrentImg(0);
    setNextImg(null);
    setAnimating(false);
  }, [selectedVariant]);

  const handleSlide = (dir) => {
    if (animating) return;
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
    let updated;

    if (isInWishlist) {
      updated = stored.filter((item) => item.id !== product.id);
    } else {
      updated = [...stored, product];
    }

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(!isInWishlist);
  };

  const handleColorClick = (e, variantIndex) => {
    e.preventDefault();
    setSelectedVariant(variantIndex);
  };

  // Функция для получения CSS цвета
  const getColorStyle = (colorName) => {
    const colorMap = {
      'black': '#000000',
      'white': '#ffffff',
      'blue': '#0066cc',
      'dark blue': '#003366',
      'grey': '#808080',
      'gray': '#808080',
      'cream': '#f5f5dc',
      'beige': '#f5f5dc',
      'multi beige': '#d2b48c',
      'multi gold': '#ffd700',
    };

    const lowerColor = colorName.toLowerCase();
    return colorMap[lowerColor] || (lowerColor.includes('white') ? '#f3f3f3' : lowerColor);
  };

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

        {/* Цвета */}
        {hovered && ((product.colorVariants && product.colorVariants.length > 1) || (product.colors && product.colors.length > 1)) && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {product.colorVariants && product.colorVariants.length > 1 ? (
              // Если есть цветовые варианты, показываем их
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
              // Если нет цветовых вариантов, но есть несколько цветов, показываем их
              product.colors.map((color, index) => (
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
        <p className="text-sm sm:text-base text-[#1c1b1b] font-medium">{product.price.toFixed(2)} €</p>
        {((product.colorVariants && product.colorVariants.length > 1) || (product.colors && product.colors.length > 1)) && (
          <p className="text-xs text-[#767676] mt-1">More colors +</p>
        )}
      </div>
    </div>
  );
}

export default Card;