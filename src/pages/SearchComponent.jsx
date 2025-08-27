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
    <div className="min-h-screen bg-gray-50 pt-35">
      <div className=" mx-auto p-4">
        {/* Поисковая строка */}
        <div className="relative mb-8">
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
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
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 w-6 h-6 text-gray-400 hover:text-gray-600 bg-black rounded-sm flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {!isSearching ? (
          <div className="space-y-8 flex gap-10">
            <div className='w-10%'>
            {/* Недавние поиски */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Recent searches</h2>
                  <button 
                    onClick={clearRecentSearches}
                    className="text-gray-500 hover:text-gray-700 underline text-sm"
                  >
                    clear
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleRecentSearchClick(search)}
                        className="flex items-center space-x-3 text-gray-700 hover:text-black py-2 px-2 rounded-lg hover:bg-gray-100 flex-1 text-left"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{search}</span>
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className='mt-7'>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular searches</h2>
              <div className="flex flex-wrap gap-2">
                {['shirts', 'dress', 't shirt', 't shirt women', 'women shirts'].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(term)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-gray-400 transition-colors"
                  >
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            </div>
            </div>

            {/* Фокус на категориях */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Focus on</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {popularSearches.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(category.label)}
                    className="flex flex-col items-center p-4 group"
                  >
                    <div className=" bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl mb-2 ">
                      <img src={category.icon} alt="" className='rounded-[50%] w-[142px] h-[142px]'/>
                    </div>
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {searchResults.length} results for "{searchTerm}"
              </h2>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid gap-[6px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {searchResults.map((product) => (
                  <Link to={getProductPath(product)} key={product.id} className="w-full group">
                    <div className="relative block aspect-[3/4] bg-gray-100">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover "
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      
                      {/* Wishlist button on hover */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Colors indicator if multiple colors */}
                      {product.colors && product.colors.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            {product.colors.slice(0, 4).map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-white shadow-sm"
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
                              <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-[8px] text-gray-600">+</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product info */}
                    <div className="mt-2 px-1 mb-[40px]">
                      <p className="text-sm sm:text-base font-normal text-[#1c1b1b] mb-1 line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-sm sm:text-base text-[#1c1b1b] font-medium">
                        €{product.price}
                      </p>
                      {product.colors && product.colors.length > 1 && (
                        <p className="text-xs text-[#767676] mt-1">More colors +</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or browse our categories
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
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