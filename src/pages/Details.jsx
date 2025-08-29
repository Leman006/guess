import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductByCode } from '../services/ProductServices';
import Loader from '../components/Loader';
import { FaRegHeart } from 'react-icons/fa';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { generateWishlistId } from '../utils/wishlist';
import { MdOutlineDescription, MdOutlineLabel, MdOutlineLocalShipping } from 'react-icons/md';
import { BiLeaf } from 'react-icons/bi';

// Добавим стили для анимации
const slideInAnimation = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
`;

// Вставляем стили в head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = slideInAnimation;
  document.head.appendChild(style);
}

const Details = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate(); 

  const colorMap = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'green': '#8B9467',
    'blue': '#4A90E2',
    'dark blue': '#1e3a8a',
    'light blue': '#87CEEB',
    'navy': '#000080',
    'gray': '#808080',
    'grey': '#808080',
    'dark gray': '#404040',
    'light gray': '#D3D3D3',
    'brown': '#8B4513',
    'beige': '#F5F5DC',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'maroon': '#800000',
    'olive': '#808000',
    'lime': '#00FF00',
    'aqua': '#00FFFF',
    'teal': '#008080',
    'silver': '#C0C0C0',
    'fuchsia': '#FF00FF'
  };

  const getColorHex = (colorName) => {
    const normalizedName = colorName.toLowerCase().trim();
    return colorMap[normalizedName] || '#CCCCCC';
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getCurrentColor = useCallback(() => {
    if (!product) return null;
    
    if (product.colorVariants && product.colorVariants.length > 0) {
        return product.colorVariants[selectedColorIndex]?.color;
    }
    
    if (product.color) {
        return product.color;
    }
    
    if (product.colors && product.colors.length > 0) {
        return product.colors[0];
    }
    
    return null;
  }, [product, selectedColorIndex]);

  const checkWishlistStatus = useCallback(() => {
    if (!product) return;
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const currentColor = getCurrentColor();
    const wishlistItemId = generateWishlistId(product, currentColor);
    setIsInWishlist(stored.some((item) => item.wishlistId === wishlistItemId));
  }, [product, getCurrentColor]);


  useEffect(() => {
    getProductByCode(code)
      .then(item => {
        setProduct(item);
        setSelectedColorIndex(0);
      })
      .catch(err => console.error(err));
  }, [code]);
  
  useEffect(() => {
    checkWishlistStatus();
    
    window.addEventListener('wishlistUpdated', checkWishlistStatus);
    
    return () => {
      window.removeEventListener('wishlistUpdated', checkWishlistStatus);
    };
  }, [product, selectedColorIndex, checkWishlistStatus]);

  const toggleWishlist = () => {
    if (!product) return;
  
    // 🔐 Проверка входа
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
      const wishlistItem = {
        ...product,
        selectedColor: getCurrentColor(),
        selectedVariantIndex: selectedColorIndex,
        selectedImages: getCurrentImages(),
        wishlistId: wishlistItemId
      };
  
      const exists = stored.some(item => item.wishlistId === wishlistItemId);
      if (!exists) {
        updated = [...stored, wishlistItem];
      } else {
        updated = stored;
      }
    }
  
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(!isInWishlist);
  
    window.dispatchEvent(new Event('wishlistUpdated'));
  };
  

  const handleAddToBag = () => {
    // 🔐 Проверка входа
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
  
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => {
        setShowSizeError(false);
      }, 3000);
      return;
    }
  
    setShowSizeError(false);
    setShowSuccessModal(true);
  
    const cartItem = {
      id: `${product.code}-${selectedSize}-${selectedColorIndex}`,
      name: product.name,
      code: product.code,
      price: parseFloat(product.price),
      size: selectedSize,
      color: getCurrentColor() || '',
      image: getCurrentImages()[0] || product.image || '',
      quantity: 1
    };
  
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
  
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
  
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
  
    console.log('Added to cart:', cartItem);
    console.log('Current cart:', existingCart);
  
    setSelectedSize('');
  
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 5000);
  };
  

  const getCurrentImages = useCallback(() => {
    if (!product) return [];
    
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants[selectedColorIndex]?.images || [];
    }
    
    if (product.images && Array.isArray(product.images)) {
      return product.images;
    }
    
    if (product.image) {
      return [product.image];
    }
    
    return [];
  }, [product, selectedColorIndex]);

  const getAvailableColors = () => {
    if (!product) return [];
    
    if (product.colorVariants && product.colorVariants.length > 0) {
      return product.colorVariants.map(variant => variant.color);
    }
    
    if (product.color) {
      return [product.color];
    }
    
    return [];
  };

  if (!product) {
    return <Loader />;
  }

  const currentImages = getCurrentImages();
  const availableColors = getAvailableColors();

  return (
    <div className="pt-10">
      {/* Уведомление об успешном добавлении */}
      {showSuccessModal && (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-80 p-4 animate-slide-in">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 mb-4">Item added successfully.</h3>
            
            <div className="mb-4">
              <img 
                src={currentImages[0]} 
                alt={product.name}
                className="w-32 h-40 object-cover mx-auto rounded"
              />
            </div>
            
            <Link to={'/cart'}
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors rounded mb-2"
            >
              shopping bag
            </Link>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center text-sm gap-1">
          <Link to={'/'} className="text-[#605e5e] px-1">Guess</Link>
          <p>/</p>
          <Link to={`/${product.gender.toLowerCase()}`} className="text-[#605e5e] px-1">{product.gender}</Link>
          <p>/</p>
          <Link className="text-[#605e5e] px-1">{product.category}</Link>
          <p>/</p>
          <Link className="text-[#605e5e] px-1">{product.subcategory}</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка с изображениями - занимает 2/3 ширины */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentImages.length > 0 ? (
            currentImages.map((img, idx) => (
              <div key={`${selectedColorIndex}-${idx}`} className="overflow-hidden bg-gray-100">
                <img
                  src={img}
                  alt={`${product.name} ${availableColors[selectedColorIndex] || 'Product'} ${idx + 1}`}
                  className="w-[561px] h-[748px] object-cover"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-[400px] bg-gray-100">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Правая колонка с деталями - занимает 1/3 ширины */}
        <div className="space-y-6 px-[15px] mr-[40px]">
          {/* Заголовок и цена */}
          <div>
            <h1 className="text-2xl font-normal text-black">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl font-normal text-black">{product.price} €</span>
            </div>
          </div>

          {/* Цвет - показываем только если есть информация о цветах */}
          {availableColors.length > 0 && (
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Color: <span className="font-medium">{availableColors[selectedColorIndex]}</span>
              </p>
              {/* Показываем селектор цветов только если цветов больше одного */}
              {availableColors.length > 1 && (
                <div className="flex gap-2">
                  {availableColors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColorIndex === idx 
                          ? 'border-black scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Размеры */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-black">Size</p>
              <button className="text-xs text-gray-500 underline">View size chart</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowSizeError(false); // Убираем ошибку при выборе размера
                  }}
                  className={`border text-sm py-2 px-1 text-center hover:border-black transition-colors ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 text-black hover:border-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Сообщение об ошибке */}
            {showSizeError && (
              <p className="text-red-500 text-sm mt-2">Please select a Size before adding to bag</p>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <Link 
              onClick={handleAddToBag}
              className="flex-1 bg-black text-white py-3 px-6 text-sm text-center font-medium hover:bg-white hover:text-black border transition-colors"
            >
              Add to bag
            </Link>
            <button 
              onClick={toggleWishlist}
              className="border border-gray-300 py-3 px-4 text-sm font-medium bg-black  transition-colors flex items-center justify-center"
            >
              {isInWishlist ? (
                <IoMdHeart size={20} className="text-white" />
              ) : (
                <IoMdHeartEmpty size={20} className="text-white" />
              )}
            </button>
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <span className="mr-3">📦</span>
              <span className="text-gray-700 underline">Free shipping</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">↩️</span>
              <span className="text-gray-700 underline">30-days free returns</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3 text-blue-500">⭐</span>
              <span className="text-blue-500">Exclusive Services</span>
            </div>
          </div>

          {/* Описание продукта над раскрывающимися секциями */}
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Раскрывающиеся секции */}
          <div className="mt-6 border border-gray-200 rounded-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection('description')}
                className="flex items-center justify-between w-full px-4 py-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <MdOutlineDescription className='mr-3' />
                  <span className="text-sm font-medium">Description</span>
                </div>
                <span
                  className={`text-gray-500 transform transition-transform duration-200 ${openSection === 'description' ? 'rotate-180' : ''}`}
                >
                  ⌄
                </span>
              </button>
              {openSection === 'description' && (
                <div className='px-4 py-4 bg-white text-sm text-gray-700 leading-relaxed'>
                  <p className="text-gray-500 mb-2">Product code: {product.code}</p>
                    <div className=" bg-white text-sm text-gray-700 leading-relaxed">
                    {product.description}
                  </div>
                </div>
                
              )}
            </div>

            {/* Composition & Care */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection('composition')}
                className="flex items-center justify-between w-full px-4 py-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <MdOutlineLabel className='mr-3'/>
                  <span className="text-sm font-medium">Composition & Care</span>
                </div>
                <span
                  className={`text-gray-500 transform transition-transform duration-200 ${openSection === 'composition' ? 'rotate-180' : ''}`}
                >
                  ⌄
                </span>
              </button>
              {openSection === 'composition' && (
                <div className="px-4 py-4 bg-white text-sm text-gray-700 leading-relaxed">
                  <p className="text-gray-500 mb-2">Product code: {product.code}</p>
                  <p className="mb-2">Composition:</p>
                  <p>• 98% Cotton, 2% Elastane</p>
                  <p className="mt-3 mb-2">Care instructions:</p>
                  <p>• Machine wash at 30°C</p>
                  <p>• Do not bleach</p>
                  <p>• Tumble dry low</p>
                  <p>• Iron at medium temperature</p>
                </div>
              )}
            </div>

            {/* Sustainability */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection('sustainability')}
                className="flex items-center justify-between w-full px-4 py-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <BiLeaf className='mr-3' />
                  <span className="text-sm font-medium">Sustainability</span>
                </div>
                <span
                  className={`text-gray-500 transform transition-transform duration-200 ${openSection === 'sustainability' ? 'rotate-180' : ''}`}
                >
                  ⌄
                </span>
              </button>
              {openSection === 'sustainability' && (
                <div className="px-4 py-4 bg-white text-sm text-gray-700 leading-relaxed">
                  <p className="text-gray-500 mb-2">Product code: {product.code}</p>
                  <p>This item is made with recycled components.</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="flex items-center justify-between w-full px-4 py-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <MdOutlineLocalShipping className='mr-3' />
                  <span className="text-sm font-medium">Shipping & Returns</span>
                </div>
                <span
                  className={`text-gray-500 transform transition-transform duration-200 ${openSection === 'shipping' ? 'rotate-180' : ''}`}
                >
                  ⌄
                </span>
              </button>
              {openSection === 'shipping' && (
                <div className="px-4 py-4 bg-white text-sm text-gray-700 leading-relaxed">
                  <p className="text-gray-500 mb-4">Product code: {product.code}</p>
                  <p>Business Days: 8-9</p>
                  <p>Cost: Free</p>
                  <p className="italic text-gray-500 mt-2">
                    *Please note that a 4€ shipping fee for orders including Past Collections is applied.
                  </p>
                  <p className="mt-3">30 days to return your order</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;