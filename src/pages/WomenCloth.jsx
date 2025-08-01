import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import apiInstance from '../api/axiosInstance';
import Card from '../components/Card';
import ColorFilter from '../components/filters/ColorFilter';
import SizeFilter from '../components/filters/SizeFilter';
import PriceFilter from '../components/filters/PriceFilter';

const WomenCloth = () => {
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

  const womenCat = [
    { label: 'View all', path: 'all' },
    { label: 'Dresses and Jumpsuits', path: 'dresses-and-jumpsuits' },
    { label: 'Coats and Jackets', path: 'coats-and-jackets' },
    { label: 'Tops and Shirts', path: 'tops-and-shirts' },
    { label: 'T-shirts', path: 't-shirts' },
    { label: 'Knitwear', path: 'knitwear' },
    { label: 'Sweatshirts', path: 'sweatshirts' },
    { label: 'Trousers', path: 'trousers' },
    { label: 'Skirts and Shorts', path: 'skirts-and-shorts' },
    { label: 'Beachwear', path: 'beachwear' },
    { label: 'Activewear', path: 'activewear' },
    { label: 'Socks', path: 'socks' }
  ];

  const current = womenCat.find(cat => cat.path === subcategory) || womenCat[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiInstance.get('/products');
        let data = res.data;

        const colorsSet = new Set();
        const sizesSet = new Set();

        data.forEach(product => {
          product.colors?.forEach(c => colorsSet.add(c));
          product.sizes?.forEach(s => sizesSet.add(s));
        });

        setUniqueColors([...colorsSet]);
        setUniqueSizes([...sizesSet]);

        if (subcategory && subcategory !== 'all') {
          data = data.filter(
            (product) =>
              product.gender.toLowerCase() === 'women' &&
              product.category.toLowerCase() === 'clothing' &&
              product.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategory.toLowerCase()
          );
        } else {
          data = data.filter(
            (product) =>
              product.gender.toLowerCase() === 'women' &&
              product.category.toLowerCase() === 'clothing'
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
  }, [subcategory]);

  useEffect(() => {
    let filtered = allProducts;

    if (appliedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors?.some(color => appliedColors.includes(color))
      );
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

  // Handlers
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
      <div className='pt-[65px] pb-[40px] w-[1660px] mx-auto'>
        <div className='flex items-center'>
          <Link className='text-sm text-[#605e5e] px-1'>Guess</Link>
          <p>/</p>
          <Link className='text-sm text-[#605e5e] px-1'>Women</Link>
          <p>/</p>
          <Link className='text-sm text-[#605e5e] px-1'>Clothing</Link>
        </div>
        <h2 className='text-[28px] font-bold pt-6 pb-2'>{current.label}</h2>
        <div className="flex gap-5">
          {womenCat.map(({ label, path }) => (
            <NavLink
              key={path}
              to={`/women/clothing/${path}`}
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
      <div className='sticky top-[150px] z-30 bg-white w-full'>
        <div className='w-[1660px] mx-auto'>
          <div className='relative flex py-4 gap-2'>
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

      <div >
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-red-500">No products found</p>
        ) : (
          <div className="grid grid-cols-4 gap-6 pb-12 pt-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WomenCloth;
