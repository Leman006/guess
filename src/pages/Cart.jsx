import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import apiInstance from '../api/axiosInstance';

// Suggestion Card Component
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
      <div className="text-center group max-w-[338px]">
        <Link to={`/${product.code || product.id}`} className="block relative">
          <img 
            src={getFirstImage()}
            alt={product.name}
            className="w-[338px] h-[452px] object-cover transition-opacity group-hover:opacity-90"
          />
        </Link>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-black line-clamp-2">{product.name}</p>
        <p className="text-xs sm:text-sm font-semibold mb-2">{product.price?.toFixed(2) || 'N/A'} €</p>
      </div>
    );
  };

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Function to get random products not in cart using API
  const getRandomSuggestions = (cartItems) => {
    apiInstance.get('/products')
      .then((res) => {
        const allProducts = res.data.products || res.data;
        
        // Get cart product IDs
        const cartProductIds = cartItems.map(item => item.id || item.code);
        
        // Filter products not in cart
        const availableProducts = allProducts.filter(product => 
          !cartProductIds.includes(product.id || product.code)
        );
        
        // Shuffle and take first 4
        const shuffled = availableProducts.sort(() => 0.5 - Math.random());
        setSuggestedProducts(shuffled.slice(0, 4));
      })
      .catch((err) => console.error('Error loading products:', err));
  };

  // Add suggested product to cart
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

  // Totals
  const getSubTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getShippingFee = () => 0.0;

  const getTotal = () => getSubTotal() + getShippingFee();

  return (
    <div className="pt-40 px-6 max-w-[1400px] mx-auto pb-5">
      <h1 className="text-xl font-medium mb-8">SHOPPING BAG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-lg mb-4">Your Shopping bag is empty</h2>
              <Link
                to="/women"
                className="bg-black text-white px-6 py-3 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="grid grid-cols-12 border-b border-gray-300 pb-3 text-sm font-medium">
                <div className="col-span-3">PRODUCT</div>
                <div className="col-span-3">DESCRIPTION</div>
                <div className="col-span-2">SIZE</div>
                <div className="col-span-2">QTY</div>
                <div className="col-span-2">PRICE</div>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center border-b border-gray-200 py-6"
                >
                  <div className="col-span-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-40 object-cover"
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
                        className="px-2"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-between items-center">
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    <button onClick={() => removeFromCart(item.id)}>
                      <IoClose className="text-xl text-gray-600 hover:text-black" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Sustainability */}
              <div className="mt-8 border border-green-500 p-4 flex items-start gap-4">
                <img
                  src="https://mms.businesswire.com/media/20200730005665/en/809384/5/GUESS_ECO_TRIANGLE-01_%28002%29.jpg?download=1"
                  alt="Guess"
                  className="w-16 h-auto"
                />
                <div>
                  <h3 className="text-green-700 text-sm font-medium mb-1">
                    Reimagining packaging, leveraging for conscious actions
                  </h3>
                  <p className="text-xs text-gray-700">
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
          <div className="lg:col-span-1">
            <input
              type="text"
              placeholder="Insert here your promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 mb-4"
            />

            <div className="border border-gray-400 p-6">
              <h3 className="text-sm font-medium mb-6">SUMMARY</h3>

              <div className="flex justify-between text-sm mb-3">
                <span>SUB TOTAL</span>
                <span>{getSubTotal().toFixed(2)} €</span>
              </div>

              <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                <span>
                  SHIPPING <br />
                  <span className="underline text-gray-600 text-xs">
                    Express home delivery (1-2 days)
                  </span>
                </span>
                <span>{getShippingFee().toFixed(2)} €</span>
              </div>

              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-4 mt-4">
                <span>TOTAL</span>
                <span>{getTotal().toFixed(2)} €</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 mt-4">
              Proceed to checkout
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              or Express Checkout
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 border border-gray-400 py-3 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg"
                  alt="GPay"
                  className="h-5"
                />
              </button>
              <button className="flex-1 border border-gray-400 py-3 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                  alt="Card"
                  className="h-5"
                />
                <span className="ml-2 text-sm">•••• 6114</span>
              </button>
              <button className="flex-1 border border-gray-400 py-3 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-5"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
  <div className="mt-12 sm:mt-16 lg:mt-20">
    <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">Top Picks for you</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
      {suggestedProducts.slice(0, 4).map((item) => (
        <SuggestionCard key={item.id || item.code} product={item} addSuggestedToCart={addSuggestedToCart} />
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Cart;