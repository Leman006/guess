// BagsList.jsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import apiInstance from '../api/axiosInstance';
import Card from '../components/Card';
import ColorFilter from '../components/filters/ColorFilter';
import SizeFilter from '../components/filters/SizeFilter';
import PriceFilter from '../components/filters/PriceFilter';
import Loader from '../components/Loader';

const BagsList = ({ gender, categories, baseRoute }) => {
  const { subcategory } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [uniqueColors, setUniqueColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [appliedColors, setAppliedColors] = useState([]);

  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [appliedSizes, setAppliedSizes] = useState([]);

  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(2000);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(2000);

  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [appliedSale, setAppliedSale] = useState(false);

  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const currentCategory = categories.find(cat => cat.path === subcategory) || categories[0];

  // Function to get the display color for a specific product based on applied filters
  const getDisplayColorForProduct = (product) => {
    if (appliedColors.length === 0) return null;

    // Check colorVariants first
    if (product.colorVariants && product.colorVariants.length > 0) {
      const matchingVariant = product.colorVariants.find(variant =>
        appliedColors.some(filterColor => 
          variant.color.toLowerCase() === filterColor.toLowerCase()
        )
      );
      return matchingVariant?.color || null;
    }

    // If no colorVariants, check regular colors array
    if (product.colors && product.colors.length > 0) {
      const matchingColor = product.colors.find(color =>
        appliedColors.some(filterColor => 
          color.toLowerCase() === filterColor.toLowerCase()
        )
      );
      return matchingColor || null;
    }

    return null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiInstance.get('/products');
        let data = res.data;

        // Collect unique colors and sizes
        const colorsSet = new Set();
        const sizesSet = new Set();

        data.forEach(product => {
          // Collect colors from colorVariants if they exist, otherwise from colors array
          if (product.colorVariants && product.colorVariants.length > 0) {
            product.colorVariants.forEach(variant => colorsSet.add(variant.color));
          } else if (product.colors && product.colors.length > 0) {
            product.colors.forEach(c => colorsSet.add(c));
          }
          
          product.sizes?.forEach(s => sizesSet.add(s));
        });

        setUniqueColors([...colorsSet]);
        setUniqueSizes([...sizesSet]);

        // Filter products by gender and main category
        data = data.filter(
          (product) =>
            product.gender.toLowerCase() === gender.toLowerCase() &&
            product.category.toLowerCase() === 'bags'
        );

        // Filter by subcategory if it's not 'all'
        if (subcategory && subcategory !== 'all') {
          data = data.filter(
            (product) =>
              product.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategory.toLowerCase()
          );
        }

        setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, subcategory]);

  useEffect(() => {
    let filtered = allProducts;

    if (appliedColors.length > 0) {
      filtered = filtered.filter(p => {
        // Check in colorVariants first
        if (p.colorVariants && p.colorVariants.length > 0) {
          return p.colorVariants.some(variant =>
            appliedColors.some(filterColor =>
              variant.color.toLowerCase() === filterColor.toLowerCase()
            )
          );
        }
        // Fallback to regular colors array
        return p.colors?.some(color => 
          appliedColors.some(filterColor =>
            color.toLowerCase() === filterColor.toLowerCase()
          )
        );
      });
    }

    if (appliedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes?.some(size => appliedSizes.includes(size))
      );
    }

    filtered = filtered.filter(p =>
      p.price >= appliedMinPrice && p.price <= appliedMaxPrice
    );

    if (appliedSale) {
      filtered = filtered.filter(p => p.isOnSale === true);
    }

    setFilteredProducts(filtered);
  }, [allProducts, appliedColors, appliedSizes, appliedMinPrice, appliedMaxPrice, appliedSale]);

  // Handlers for filters
  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };
  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };
  const applyColorFilter = () => {
    setAppliedColors([...selectedColors]);
    setShowColorDropdown(false);
  };
  const applySizeFilter = () => {
    setAppliedSizes([...selectedSizes]);
    setShowSizeDropdown(false);
  };
  const applyPriceFilter = () => {
    setAppliedMinPrice(selectedMinPrice);
    setAppliedMaxPrice(selectedMaxPrice);
    setAppliedSale(onlyOnSale);
    setShowPriceDropdown(false);
  };
  const resetColorFilter = () => {
    setSelectedColors([]);
    setAppliedColors([]);
    setShowColorDropdown(false);
  };
  const resetSizeFilter = () => {
    setSelectedSizes([]);
    setAppliedSizes([]);
    setShowSizeDropdown(false);
  };
  const resetPriceFilter = () => {
    setSelectedMinPrice(0);
    setSelectedMaxPrice(2000);
    setOnlyOnSale(false);
    setAppliedMinPrice(0);
    setAppliedMaxPrice(2000);
    setAppliedSale(false);
    setShowPriceDropdown(false);
  };

  return (
    <>
      <div className='pt-[25px] lg:pt-[55px] pb-[40px] max-w-[1660px] w-full mx-auto px-4'>
        <div className='flex flex-wrap items-center text-sm gap-1'>
          <Link className='text-[#605e5e] px-1'>Guess</Link>
          <p>/</p>
          <Link className='text-[#605e5e] px-1'>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Link>
          <p>/</p>
          <Link className='text-[#605e5e] px-1'>Bags</Link>
        </div>
        <h2 className='text-[28px] font-bold pt-6 pb-2'>{currentCategory.label}</h2>

        {/* Категории */}
        <div className="flex flex-wrap gap-5">
          {categories.map(({ label, path }) => (
            <NavLink
              key={path}
              to={`${baseRoute}/${path}`}
              className={({ isActive }) =>
                `py-2 px-1 border-b-2 transition ${
                  isActive ? 'text-black border-black' : 'text-[#939090] border-transparent'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <hr className="border-t-2 border-[#e6e6e6]" />
      </div>

      {/* Filters */}
      <div className='lg:sticky lg:top-[150px] z-30 bg-white w-full'>
        <div className='max-w-[1660px] w-full mx-auto px-4'>
          <div className='relative flex flex-wrap gap-2 py-4'>
            <ColorFilter
              show={showColorDropdown}
              toggleDropdown={setShowColorDropdown}
              uniqueColors={uniqueColors}
              selectedColors={selectedColors}
              toggleColor={toggleColor}
              applyFilter={applyColorFilter}
              resetFilter={resetColorFilter}
            />
            <SizeFilter
              show={showSizeDropdown}
              toggleDropdown={setShowSizeDropdown}
              uniqueSizes={uniqueSizes}
              selectedSizes={selectedSizes}
              toggleSize={toggleSize}
              applyFilter={applySizeFilter}
              resetFilter={resetSizeFilter}
            />
            <PriceFilter
              show={showPriceDropdown}
              toggleDropdown={setShowPriceDropdown}
              selectedMinPrice={selectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              setSelectedMinPrice={setSelectedMinPrice}
              setSelectedMaxPrice={setSelectedMaxPrice}
              onlyOnSale={onlyOnSale}
              setOnlyOnSale={setOnlyOnSale}
              applyFilter={applyPriceFilter}
              resetFilter={resetPriceFilter}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <Loader/>
      ) : filteredProducts.length === 0 ? (
        <div className="max-w-[1660px] w-full mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
    {/* Иконка — сердце-поиск */}
    <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
      </svg>
    </div>

    {/* Текст */}
    <h2 className="text-2xl font-semibold tracking-wide">No Products Found</h2>
    <p className="text-gray-500 max-w-md">
      We couldn’t find any items matching your selection. Try adjusting your filters or explore our latest collection.
    </p>

    {/* Кнопка */}
    <a
      href="/"
      className="m-6 px-8 py-3 bg-black text-white font-medium uppercase tracking-wide rounded-2xl hover:bg-gray-800 transition"
    >
      Continue Shopping
    </a>
  </div>
        </div>
      ) : (
        <div className="grid gap-[6px] 
                        grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              product={product} 
              filteredColor={getDisplayColorForProduct(product)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BagsList;