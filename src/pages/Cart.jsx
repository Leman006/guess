import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import apiInstance from '../api/axiosInstance';

const SuggestionCard = ({ product, addSuggestedToCart }) => {
    const getFirstImage = () => {
      if (product.images && product.images.length > 0) return product.images[0];
      if (product.colorVariants && product.colorVariants[0]?.images && product.colorVariants[0].images.length > 0) {
        return product.colorVariants[0].images[0];
      }
      if (product.image) return product.image;
      return '/placeholder-image.jpg';
    };
  
    return (
      <div className="text-center group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[338px] mx-auto">
        <Link 
  to={`/${product.gender}/${product.category}/${encodeURIComponent(product.subcategory)}/${product.code}`} 
  className="block relative"
>
  <img 
    src={getFirstImage()}
    alt={product.name}
    className="w-full aspect-[3/4] object-cover transition-opacity group-hover:opacity-90"
  />
</Link>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-black line-clamp-2 px-2">{product.name}</p>
        <p className="text-xs sm:text-sm lg:text-base font-semibold mb-2">{product.price?.toFixed(2) || 'N/A'} €</p>
      </div>
    );
  };

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const getRandomSuggestions = (cartItems) => {
    apiInstance.get('/products')
      .then((res) => {
        const allProducts = res.data.products || res.data;
        
        const cartProductIds = cartItems.map(item => item.id || item.code);
        
        const availableProducts = allProducts.filter(product => 
          !cartProductIds.includes(product.id || product.code)
        );
        
        const shuffled = availableProducts.sort(() => 0.5 - Math.random());
        setSuggestedProducts(shuffled.slice(0, 4));
      })
      .catch((err) => console.error('Error loading products:', err));
  };

  const addSuggestedToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = {
      id: product.id || product.code,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || 
             (product.colorVariants?.[0]?.images?.[0]) || 
             product.image || '/placeholder-image.jpg',
      color: product.colors?.[0] || 
             (product.colorVariants?.[0]?.color) || 
             'Default',
      size: product.sizes?.[0] || 'One Size',
      quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === cartItem.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Load cart items and set suggestions
  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      
      // Update suggestions when cart changes
      getRandomSuggestions(cart);
    };
    
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  // Update quantity
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Remove item
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getSubTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getShippingFee = () => 0.0;

  const getTotal = () => getSubTotal() + getShippingFee();

  return (
    <div className="pt-30 lg:pt-40 px-3 sm:px-4 lg:px-6 max-w-[1400px] mx-auto pb-5">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 lg:mb-8">SHOPPING BAG</h1>

      <div className="flex flex-col min-[1020px]:grid min-[1020px]:grid-cols-3 gap-6 lg:gap-8">
        <div className="min-[1020px]:col-span-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <h2 className="text-base sm:text-lg lg:text-xl mb-4">Your Shopping bag is empty</h2>
              <Link
                to="/women"
                className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 inline-block text-sm sm:text-base hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden min-[1020px]:grid grid-cols-12 border-b border-gray-300 pb-3 text-sm font-medium">
                <div className="col-span-3">PRODUCT</div>
                <div className="col-span-3">DESCRIPTION</div>
                <div className="col-span-2">SIZE</div>
                <div className="col-span-2">QTY</div>
                <div className="col-span-2">PRICE</div>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 py-4 sm:py-6">
                  {/* Desktop Layout */}
                  <div className="hidden min-[1020px]:grid grid-cols-12 items-center">
                    <div className="col-span-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-40 object-cover"
                      />
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.color}</p>
                    </div>
                    <div className="col-span-2 text-sm">{item.size}</div>
                    <div className="col-span-2">
                      <div className="flex items-center border border-gray-400 w-fit">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-between items-center">
                      <span className="text-sm lg:text-base">{(item.price * item.quantity).toFixed(2)} €</span>
                      <button onClick={() => removeFromCart(item.id)}>
                        <IoClose className="text-lg sm:text-xl text-gray-600 hover:text-black" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="min-[1020px]:hidden">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-28 sm:w-24 sm:h-32 object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div>
                          <p className="text-sm sm:text-base font-medium line-clamp-2">{item.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{item.color}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span><strong>Size:</strong> {item.size}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-400">
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 text-sm hover:bg-gray-100"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 text-sm hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-sm sm:text-base font-medium">
                              {(item.price * item.quantity).toFixed(2)} €
                            </span>
                            <button onClick={() => removeFromCart(item.id)}>
                              <IoClose className="text-lg sm:text-xl text-gray-600 hover:text-black" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Sustainability Section */}
              <div className="mt-6 sm:mt-8 border border-green-500 p-3 sm:p-4 lg:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <img
                  src="https://mms.businesswire.com/media/20200730005665/en/809384/5/GUESS_ECO_TRIANGLE-01_%28002%29.jpg?download=1"
                  alt="Guess"
                  className="w-12 sm:w-14 lg:w-16 h-auto flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-green-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Reimagining packaging, leveraging for conscious actions
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    You'll receive your items in a box or bag made of{' '}
                    <strong>FSC certified recyclable materials</strong>, in line
                    with our commitment to environmental sustainability. The
                    FSC certification label guarantees that the paper used for
                    the packaging comes from reliable sources and recycled
                    materials.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right side - Summary */}
        {cartItems.length > 0 && (
          <div className="min-[1020px]:col-span-1 order-last">
            <div className="min-[1020px]:sticky min-[1020px]:top-4">
              <input
                type="text"
                placeholder="Insert here your promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border border-gray-400 px-3 sm:px-4 py-2 sm:py-3 mb-4 text-sm sm:text-base focus:outline-none focus:border-black"
              />

              <div className="border border-gray-400 p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-medium mb-4 sm:mb-6">SUMMARY</h3>

                <div className="flex justify-between text-xs sm:text-sm mb-3">
                  <span>SUB TOTAL</span>
                  <span>{getSubTotal().toFixed(2)} €</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm border-t border-gray-200 pt-3">
                  <span>
                    SHIPPING <br />
                    <span className="underline text-gray-600 text-xs">
                      Express home delivery (1-2 days)
                    </span>
                  </span>
                  <span>{getShippingFee().toFixed(2)} €</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <span>TOTAL</span>
                  <span>{getTotal().toFixed(2)} €</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-2 sm:py-3 mt-4 text-sm sm:text-base hover:bg-gray-800 transition-colors">
                Proceed to checkout
              </button>

              <div className="text-center text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                or Express Checkout
              </div>

              {/* Payment Methods */}
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                <button className="flex-1 border border-gray-400 py-2 sm:py-3 flex items-center justify-center hover:bg-gray-50">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg"
                    alt="GPay"
                    className="h-4 sm:h-5"
                  />
                </button>
                <button className="flex-1 border border-gray-400 py-2 sm:py-3 flex items-center justify-center hover:bg-gray-50">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="Card"
                    className="h-4 sm:h-5"
                  />
                  <span className="ml-2 text-xs sm:text-sm">•••• 6114</span>
                </button>
                <button className="flex-1 border border-gray-400 py-2 sm:py-3 flex items-center justify-center hover:bg-gray-50">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-4 sm:h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <div className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-4 sm:mb-6 lg:mb-8">
            Top Picks for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {suggestedProducts.slice(0, 4).map((item) => (
              <SuggestionCard 
                key={item.id || item.code} 
                product={item} 
                addSuggestedToCart={addSuggestedToCart} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;