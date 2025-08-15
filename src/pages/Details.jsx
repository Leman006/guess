import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductByCode } from '../services/ProductServices';
import Loader from '../components/Loader';
import { FaRegHeart } from 'react-icons/fa';

const Details = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

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

  useEffect(() => {
    getProductByCode(code)
      .then(item => {
        setProduct(item);
        setSelectedColorIndex(0); // Устанавливаем первый цвет по умолчанию
      })
      .catch(err => console.error(err));
  }, [code]);

  // Функция для получения текущих изображений на основе выбранного цвета
  const getCurrentImages = () => {
    if (!product || !product.colorVariants) return [];
    return product.colorVariants[selectedColorIndex]?.images || [];
  };

  // Функция для получения доступных цветов
  const getAvailableColors = () => {
    if (!product || !product.colorVariants) return [];
    return product.colorVariants.map(variant => variant.color);
  };

  if (!product) {
    return <Loader />;
  }

  const currentImages = getCurrentImages();
  const availableColors = getAvailableColors();



  return (
    <div className="pt-10">
      {/* Breadcrumb */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center text-sm gap-1">
          <Link to={'/'} className="text-[#605e5e] px-1">Guess</Link>
          <p>/</p>
          <Link to={`/${product.gender.toLowerCase()}`} className="text-[#605e5e] px-1">{product.gender}</Link>
          <p>/</p>
          <Link className="text-[#605e5e] px-1">{product.category}</Link>
          <p>/</p>
          <Link  className="text-[#605e5e] px-1">{product.subcategory}</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка с изображениями - занимает 2/3 ширины */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentImages.map((img, idx) => (
            <div key={`${selectedColorIndex}-${idx}`} className="overflow-hidden bg-gray-100">
              <img
                src={img}
                alt={`${product.name} ${availableColors[selectedColorIndex]} ${idx + 1}`}
                className="w-[561px] h-[748px] object-cover"
              />
            </div>
          ))}
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

          {/* Цвет */}
          <div>
            <p className="text-sm text-gray-700 mb-2">
              Color: <span className="font-medium">{availableColors[selectedColorIndex]}</span>
            </p>
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
          </div>

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
                  onClick={() => setSelectedSize(size)}
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
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <button className="flex-1 bg-black text-white py-3 px-6 text-sm font-medium hover:bg-white hover:text-black border transition-colors">
              Add to bag
            </button>
            <button className="border border-gray-300 py-3 px-4 text-sm font-medium hover:border-gray-600 hover:bg-black transition-colors ">
              <FaRegHeart size={20} className='bg-white'/>
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
  {/* Description */}
  <div className="border-b border-gray-200">
    <button
      onClick={() => toggleSection('description')}
      className="flex items-center justify-between w-full px-4 py-4 bg-white hover:bg-gray-50 transition"
    >
      <div className="flex items-center">
        <span className="mr-3">📄</span>
        <span className="text-sm font-medium">Description</span>
      </div>
      <span
        className={`text-gray-500 transform transition-transform duration-200 ${openSection === 'description' ? 'rotate-180' : ''}`}
      >
        ⌄
      </span>
    </button>
    {openSection === 'description' && (
      <div className="px-4 py-4 bg-white text-sm text-gray-700 leading-relaxed">
        Step into style with our stretch twill jacket, perfect for a modern, sleek look. 
        The shirt collar and long sleeves provide a touch of elegance. 
        Flaunt the logo detail on the chest. Convenient zipped side pockets. 
        Ideal for a smart casual date or a day at the office.
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
        <span className="mr-3">🏷️</span>
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
        <span className="mr-3">🌿</span>
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
        <span className="mr-3">🚚</span>
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