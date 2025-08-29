import React, { useState, useEffect } from 'react';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { generateWishlistId } from '../utils/wishlist';

function Card({ product, filteredColor = null }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const navigate = useNavigate();
  
  

  const findVariantByColor = (colorName) => {
    if (!product.colorVariants || !colorName) return 0;
    
    const variantIndex = product.colorVariants.findIndex(variant => 
      variant.color.toLowerCase() === colorName.toLowerCase()
    );
    return variantIndex >= 0 ? variantIndex : 0;
  };

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

// Синхронизация с localStorage и установка правильного варианта
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistItemId = generateWishlistId(product, getCurrentColor());

  setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));

  const existing = stored.find(item => item.wishlistId === wishlistItemId);
  if (existing && product.colorVariants && existing.selectedColor) {
    const variantIndex = findVariantByColor(existing.selectedColor);
    if (variantIndex >= 0) {
      setSelectedVariant(variantIndex);
    }
  }
}, [product.code, product.colorVariants, selectedVariant]);

// Создаем объект для сохранения в wishlist
const getWishlistItem = () => {
  const currentColor = getCurrentColor();
  const currentImages = getCurrentImages();
  
  return {
    ...product,
    id: product.code,
    selectedColor: currentColor,
    selectedVariantIndex: selectedVariant,
    selectedImages: currentImages,
    // Используем единую функцию для создания ID
    wishlistId: generateWishlistId(product, currentColor)
  };
};

const currentImages = getCurrentImages();

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistItemId = generateWishlistId(product, getCurrentColor());
  setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));
}, [product.code, selectedVariant]);

useEffect(() => {
  setCurrentImg(0);
  setNextImg(null);
  setAnimating(false);
}, [selectedVariant]);

useEffect(() => {
  const handleWishlistUpdate = () => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItemId = generateWishlistId(product, getCurrentColor());
    setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));
  };

  window.addEventListener('wishlistUpdated', handleWishlistUpdate);
  
  return () => {
    window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  };
}, [product.code, selectedVariant]);

useEffect(() => {
  const handleWishlistUpdate = () => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const currentColor = getCurrentColor();
    const wishlistItemId = generateWishlistId(product, currentColor);
    setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));
  };

  window.addEventListener('wishlistUpdated', handleWishlistUpdate);
  
  return () => {
    window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  };
}, [product, selectedVariant]); 

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

    // Проверяем, есть ли пользователь
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); 
      return;
    }

    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItemId = generateWishlistId(product, getCurrentColor());
    let updated;
  
    if (isInWishlist) {
      updated = stored.filter((item) => item.wishlistId !== wishlistItemId);
    } else {
      const exists = stored.some(item => item.wishlistId === wishlistItemId);
      if (!exists) {
        updated = [...stored, getWishlistItem()];
      } else {
        updated = stored;
      }
    }
  
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(!isInWishlist);
  
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleColorClick = (e, variantIndex) => {
    e.preventDefault();
    if (!filteredColor) {
      setSelectedVariant(variantIndex);
    }
  };

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

  const hasMultipleColors = () => {
    if (product.colorVariants && product.colorVariants.length > 1) return true;
    if (product.colors && product.colors.length > 1) return true;
    return false;
  };

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
      <Link to={
    product.gender === "men"
      ? `/men/clothing/${product.subcategory}/${product.code}`
      : product.gender === "women" && product.category === "bags"
        ? `/women/bags/${product.subcategory}/${product.code}`
        : `/women/clothing/${product.subcategory}/${product.code}`
  }
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