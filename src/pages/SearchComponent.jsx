import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Clock, Tag, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import apiInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiInstance.get('/products');
        setProducts(res.data); 
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Функция для создания правильного пути к товару
  const getProductPath = (product) => {
    // Убедимся, что у товара есть gender и subcategory
    const gender = product.gender?.toLowerCase();
    const subcategory = product.subcategory?.toLowerCase();
    
    if (gender && subcategory) {
      return `/${gender}/clothing/${subcategory}/${product.code}`;
    }
    
    // Если нет полной информации, возвращаем путь к поиску или корневой путь
    return `/search?q=${product.code}`;
  };

  // Категории для популярных поисков
  const popularSearches = [
    { label: 'dresses', icon: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2025/250808_Women_Dropdown/focus/01_w' },
    { label: 'tops', icon: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2025/250808_Women_Dropdown/focus/02_w' },
    { label: 'beachwear', icon: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2025/250808_Women_Dropdown/focus/03_w' },
    { label: 'bags', icon: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/EU/Asset/Europe/E-Commerce/01_GUESS/MENU/2025/250808_Women_Dropdown/focus/04_w' },
  ];

  // Загрузка недавних поисков из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Сохранение недавних поисков в localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Поиск товаров
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.subcategory.toLowerCase().includes(term) ||
      product.gender.toLowerCase().includes(term) ||
      (product.colors && product.colors.some(color => color.toLowerCase().includes(term))) ||
      product.code.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setIsSearching(value.trim().length > 0);
  };

  const addToRecentSearches = (search) => {
    if (!search.trim()) return;
    
    const newRecentSearches = [
      search,
      ...recentSearches.filter(item => item !== search)
    ].slice(0, 5); // Храним только 5 последних поисков
    
    setRecentSearches(newRecentSearches);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm.trim());
    }
  };

  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    setIsSearching(true);
  };

  const handlePopularSearchClick = (search) => {
    setSearchTerm(search);
    setIsSearching(true);
    addToRecentSearches(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (searchToRemove) => {
    setRecentSearches(prev => prev.filter(search => search !== searchToRemove));
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-30 ">
      <div className="mx-auto p-2 sm:p-4 lg:p-6">
        {/* Поисковая строка */}
        <div className="relative mb-4 sm:mb-6 lg:mb-8">
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(e);
                  }
                }}
                placeholder="Search"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600 bg-black rounded-sm flex items-center justify-center"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {!isSearching ? (
          <div className="space-y-6 sm:space-y-8 flex flex-col lg:flex-row lg:gap-10">
            {/* Боковая панель с недавними и популярными поисками */}
            <div className='w-full lg:w-[300px] xl:w-[350px] flex-shrink-0'>
              {/* Недавние поиски */}
              {recentSearches.length > 0 && (
                <div className="mb-6 lg:mb-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent searches</h2>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-gray-500 hover:text-gray-700 underline text-sm"
                    >
                      clear
                    </button>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    {recentSearches.map((search, index) => (
                      <div key={index} className="flex items-center justify-between group">
                        <button
                          onClick={() => handleRecentSearchClick(search)}
                          className="flex items-center space-x-2 sm:space-x-3 text-gray-700 hover:text-black py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg hover:bg-gray-100 flex-1 text-left text-sm sm:text-base"
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{search}</span>
                        </button>
                        <button
                          onClick={() => removeRecentSearch(search)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity ml-2"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Популярные поиски */}
              <div className='mb-6 lg:mb-0'>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Popular searches</h2>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['shirts', 'dress', 't shirt', 't shirt women', 'women shirts'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearchClick(term)}
                      className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm"
                    >
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 whitespace-nowrap">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Фокус на категориях */}
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Focus on</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {popularSearches.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(category.label)}
                    className="flex flex-col items-center p-2 sm:p-3 lg:p-4 group"
                  >
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                      <img 
                        src={category.icon} 
                        alt={category.label}
                        className='rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 object-cover'
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider text-center">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Результаты поиска */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {searchResults.length} results for "{searchTerm}"
              </h2>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid gap-1 sm:gap-2 md:gap-3 lg:gap-[6px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {searchResults.map((product) => (
                  <Link to={getProductPath(product)} key={product.id} className="w-full group">
                    <div className="relative block aspect-[3/4] bg-gray-100">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      
                      {/* Wishlist button on hover */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Colors indicator if multiple colors */}
                      {product.colors && product.colors.length > 1 && (
                        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-0.5 sm:gap-1">
                            {product.colors.slice(0, 4).map((color, index) => (
                              <div
                                key={index}
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white shadow-sm"
                                style={{
                                  backgroundColor: color.toLowerCase() === 'white' ? '#f3f3f3' : 
                                                 color.toLowerCase() === 'black' ? '#000000' :
                                                 color.toLowerCase() === 'blue' ? '#0066cc' :
                                                 color.toLowerCase() === 'dark blue' ? '#003366' :
                                                 color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#808080' :
                                                 color.toLowerCase() === 'cream' ? '#f5f5dc' :
                                                 color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                                 color.toLowerCase().includes('gold') ? '#ffd700' :
                                                 '#cccccc'
                                }}
                              />
                            ))}
                            {product.colors.length > 4 && (
                              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-[6px] sm:text-[8px] text-gray-600">+</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product info */}
                    <div className="mt-1 sm:mt-2 px-0.5 sm:px-1 mb-6 sm:mb-8 lg:mb-[40px]">
                      <p className="text-xs sm:text-sm lg:text-base font-normal text-[#1c1b1b] mb-0.5 sm:mb-1 line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base text-[#1c1b1b] font-medium">
                        €{product.price}
                      </p>
                      {product.colors && product.colors.length > 1 && (
                        <p className="text-xs text-[#767676] mt-0.5 sm:mt-1">More colors +</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                  Try adjusting your search or browse our categories
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;