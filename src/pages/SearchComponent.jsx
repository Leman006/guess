import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Clock, Tag, Heart, ArrowLeft, ArrowRight } from 'lucide-react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Данные товаров из предоставленного JSON
  const products = [
    {
      id: 1,
      name: "Stretch denim romper",
      category: "Clothing",
      subcategory: "Dresses and Jumpsuits",
      gender: "Women",
      price: 92,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/W5GD2UD5PW1-BFIN",
      description: "Dark-wash denim romper in a stretch cotton-modal blend. Shirt collar and short sleeves.",
      colors: ["Blue"],
      code: "W5GD2UD5PW1"
    },
    {
      id: 2,
      name: "Bodycon crepon mini dress",
      category: "Clothing",
      subcategory: "Dresses and Jumpsuits",
      gender: "Women",
      price: 184,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/W5YK36WGHC2-G012",
      description: "Crepon bodycon mini dress. Classic lapels. Sleeveless. Front double-welt pockets.",
      colors: ["Black", "Dark Blue", "White"],
      code: "W5YK36WGHC2"
    },
    {
      id: 3,
      name: "Wrap up stretch blouse",
      category: "Clothing",
      subcategory: "Tops and Shirts",
      gender: "Women",
      price: 63.5,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/W5GH91WAF10-G011",
      description: "Stretch cotton blouse. Classic shirt collar. Dropped shoulders and long sleeves.",
      colors: ["White"],
      code: "W5GH91WAF10"
    },
    {
      id: 4,
      name: "Marciano wool-blend vest",
      category: "Clothing",
      subcategory: "Tops and Shirts", 
      gender: "Women",
      price: 115,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/5GGN067294A-JBLK",
      description: "Stretch wool blend vest. V-neck. Welt side pockets. Fitted silhouette.",
      colors: ["Black"],
      code: "5GGN067294A"
    },
    {
      id: 5,
      name: "Knit bodycon long dress",
      category: "Clothing",
      subcategory: "Dresses and Jumpsuits",
      gender: "Women", 
      price: 196,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/W5YK1CKK620-F11C",
      description: "Viscose-blend bodycon long dress. Halter neck that ties at the back. All-over vertical stripes.",
      colors: ["Multi beige"],
      code: "W5YK1CKK620"
    },
    {
      id: 6,
      name: "Bodycon openwork mini dress",
      category: "Clothing",
      subcategory: "Dresses and Jumpsuits",
      gender: "Women",
      price: 81,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,dpr_1.4,fl_advanced_resize,w_576,c_scale/v1/EU/Style/ECOMM/W5GK48Z3E22-F97H",
      description: "Bodycon viscose-blend mini dress with metallic fibers. V-neck and long sleeves.",
      colors: ["Multi gold", "Black", "White"],
      code: "W5GK48Z3E22"
    },
    {
      id: 7,
      name: "Off-shoulder stretch top",
      category: "Clothing",
      subcategory: "Tops and Shirts",
      gender: "Women",
      price: 31.5,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/W5GP46KACM2-G1CX",
      description: "Stretch modal top. Off-shoulder and short sleeves. Small metallic G logo at the back neckline.",
      colors: ["White"],
      code: "W5GP46KACM2"
    },
    {
      id: 8,
      name: "Stretch twill jacket",
      category: "Clothing",
      subcategory: "Coats And Jackets",
      gender: "Men",
      price: 92,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/M5GL38WHAO2-G9L9",
      description: "Stretch twill jacket. Shirt collar and long sleeves. Logo on the breast.",
      colors: ["Dark Blue", "Grey"],
      code: "M5GL38WHAO2"
    },
    {
      id: 9,
      name: "Regular fit denim jacket",
      category: "Clothing",
      subcategory: "Coats And Jackets",
      gender: "Men",
      price: 127,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/M4YXN1D4Q4R-M1NW",
      description: "Stretch cotton denim jacket in a medium wash. Classic collar and long sleeves.",
      colors: ["Blue"],
      code: "M4YXN1D4Q4R"
    },
    {
      id: 10,
      name: "Polo t-shirt",
      category: "Clothing",
      subcategory: "T-Shirts And Polo Shirts",
      gender: "Men",
      price: 45.5,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/M5GR18Z3HM1-G293",
      description: "Polo in a regular fit. Folded collar and short sleeves. Embroidered front logo.",
      colors: ["Cream"],
      code: "M5GR18Z3HM1"
    },
    {
      id: 11,
      name: "Knit top",
      category: "Clothing",
      subcategory: "T-Shirts And Polo Shirts",
      gender: "Men",
      price: 63,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/M5YP22KCWO2-F10N",
      description: "Knit top in a stretch viscose blend. Classic crew neck and short sleeves.",
      colors: ["Beige"],
      code: "M5YP22KCWO2"
    },
    {
      id: 12,
      name: "Faux-leather bomber jacket",
      category: "Clothing",
      subcategory: "Coats And Jackets",
      gender: "Men",
      price: 219,
      image: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,e_sharpen:50,,w_800,c_scale/v1/EU/Style/ECOMM/M5YL11WHEI0-FNEG",
      description: "Faux-leather bomber jacket. Stylish color blocking and front logo patch.",
      colors: ["Beige"],
      code: "M5YL11WHEI0"
    }
  ];

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
      product.colors.some(color => color.toLowerCase().includes(term)) ||
      product.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);

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
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="max-w-6xl mx-auto p-4">
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
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="space-y-8">
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

            {/* Популярные поиски */}
            <div>
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
                  <div key={product.id} className="w-full group">
                    <div className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
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
                  </div>
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