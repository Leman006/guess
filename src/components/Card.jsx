import React, { useState, useEffect } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function Card({ product }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(null);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsInWishlist(stored.some((item) => item.id === product.id));
  }, [product.id]);

  const handleSlide = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    if (dir === 'right') {
      setNextImg((currentImg + 1) % product.images.length);
    } else {
      setNextImg((currentImg - 1 + product.images.length) % product.images.length);
    }
  };

  const handleAnimationEnd = () => {
    setCurrentImg(nextImg);
    setNextImg(null);
    setAnimating(false);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    let updated;

    if (isInWishlist) {
      updated = stored.filter((item) => item.id !== product.id);
    } else {
      updated = [...stored, product];
    }

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="w-full group">
  <Link to={`${product.code}`}
    className="relative block aspect-[3/4] overflow-hidden"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    <img
      src={product.images[currentImg]}
      alt="current"
      className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ${
        nextImg !== null ? `slide-out-${direction}` : ''
      }`}
    />
    {nextImg !== null && (
      <img
        src={product.images[nextImg]}
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

    {/* Цвета */}
    {hovered && product.colors?.length > 1 && (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {product.colors.map((color, index) => (
          <span
            key={index}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{
              backgroundColor: color.toLowerCase().includes('white')
                ? '#f3f3f3'
                : color.toLowerCase(),
            }}
          />
        ))}
      </div>
    )}
  </Link>

  {/* Product info */}
  <div className="mt-2 px-1">
    <p className="text-sm sm:text-base font-normal text-[#1c1b1b] mb-1">{product.name}</p>
    <p className="text-sm sm:text-base text-[#1c1b1b] font-medium">{product.price.toFixed(2)} €</p>
    {product.colors?.length > 1 && (
      <p className="text-xs text-[#767676] mt-1">More colors +</p>
    )}
  </div>
</div>

  );
}

export default Card;
