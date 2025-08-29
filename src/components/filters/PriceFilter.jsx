import React, { useEffect, useRef, useState } from 'react';
import { Range } from 'react-range';

const PriceFilter = ({
  show,
  toggleDropdown,
  minPrice = 0,
  maxPrice = 2000,
  selectedMinPrice,
  selectedMaxPrice,
  setSelectedMinPrice,
  setSelectedMaxPrice,
  applyFilter,
  resetFilter
}) => {
  const dropdownRef = useRef(null);

  const [sliderValues, setSliderValues] = useState([selectedMinPrice, selectedMaxPrice]);

  useEffect(() => {
    setSliderValues([selectedMinPrice, selectedMaxPrice]);
  }, [selectedMinPrice, selectedMaxPrice]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleDropdown]);

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value);
    const newMin = Math.max(minPrice, Math.min(value, sliderValues[1]));
    setSelectedMinPrice(newMin);
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value);
    const newMax = Math.min(maxPrice, Math.max(value, sliderValues[0]));
    setSelectedMaxPrice(newMax);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(prev => !prev)}
        className="px-[10px] bg-[#f8f8f8] rounded-[5px] py-[12px]"
      >
        Price
      </button>

      {show && (
        <div className="absolute top-[55px] left-0 w-[300px] bg-white border border-gray-300 shadow-md z-50 rounded p-4">
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-1 border border-gray-400 px-2 py-1 rounded w-[100px]">
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={selectedMinPrice}
                onChange={handleMinInputChange}
                className="w-full outline-none text-sm"
              />
              <span className="text-sm">€</span>
            </div>
            <div className="flex items-center gap-1 border border-gray-400 px-2 py-1 rounded w-[100px]">
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={selectedMaxPrice}
                onChange={handleMaxInputChange}
                className="w-full outline-none text-sm"
              />
              <span className="text-sm">€</span>
            </div>
          </div>

          {/* Dual-thumb slider using react-range */}
          <div className="mb-4 pt-1">
            <Range
              step={1}
              min={minPrice}
              max={maxPrice}
              values={sliderValues}
              onChange={(values) => {
                setSliderValues(values);
                setSelectedMinPrice(values[0]);
                setSelectedMaxPrice(values[1]);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: '100%'
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '6px',
                      width: '100%',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, #ccc ${
                        ((sliderValues[0] - minPrice) / (maxPrice - minPrice)) * 100
                      }%, #000 ${
                        ((sliderValues[0] - minPrice) / (maxPrice - minPrice)) * 100
                      }%, #000 ${
                        ((sliderValues[1] - minPrice) / (maxPrice - minPrice)) * 100
                      }%, #ccc ${
                        ((sliderValues[1] - minPrice) / (maxPrice - minPrice)) * 100
                      }%)`
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA'
                  }}
                />
              )}
            />
          </div>


          <div className="flex justify-between">
            <button
              onClick={resetFilter}
              className="px-4 py-1 border border-black text-black rounded w-[48%]"
            >
              Reset
            </button>
            <button
              onClick={applyFilter}
              className="px-4 py-1 bg-black text-white rounded w-[48%]"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;