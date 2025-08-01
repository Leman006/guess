import React, { useRef, useEffect } from 'react';

// Ручное сопоставление нестандартных названий цветов с их HEX-значениями
const customColors = {
  'Multi beige': '#f5f5dc',
  'Multi gold': '#d4af37',
  'Dark Blue': '#00008b',
};

// Функция для получения HEX или CSS-совместимого значения цвета
const resolveColor = (color) => {
  return customColors[color] || color;
};

// Вычисление яркости цвета, чтобы понять, тёмный он или светлый
const getColorBrightness = (colorValue) => {
  const tempEl = document.createElement('div');
  tempEl.style.color = colorValue;
  document.body.appendChild(tempEl);
  const computedColor = getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);

  const match = computedColor.match(/\d+/g);
  if (!match) return 255;
  const [r, g, b] = match.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const isDarkColor = (colorValue) => getColorBrightness(colorValue) < 128;

const ColorFilter = ({
  show,
  toggleDropdown,
  uniqueColors,
  selectedColors,
  toggleColor,
  applyFilter,
  resetFilter
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleDropdown]);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown((prev) => !prev)}
        className='px-[10px] bg-[#f8f8f8] rounded-[5px] py-[12px]'
      >
        Colors
      </button>

      {show && (
        <div className='absolute top-[55px] left-0 bg-white shadow-md p-4 w-[270px] z-50 border border-gray-300 rounded'>
          {uniqueColors.length > 0 ? uniqueColors.map(color => {
            const resolvedColor = resolveColor(color);
            const dark = isDarkColor(resolvedColor);
            const checkColor = dark ? 'white' : 'black';

            return (
              <div key={color} className='flex items-center gap-2 mb-2'>
                <div
                  onClick={() => toggleColor(color)}
                  className='w-[20px] h-[20px] border border-gray-400 cursor-pointer relative flex-shrink-0 rounded-[3px]'
                  style={{ backgroundColor: resolvedColor }}
                >
                  {selectedColors.includes(color) && (
                    <div
                      className='absolute inset-0 flex items-center justify-center text-[14px] font-bold'
                      style={{ color: checkColor }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <span
                  className={`text-[14px] cursor-pointer ${selectedColors.includes(color) ? 'underline font-medium' : ''}`}
                  onClick={() => toggleColor(color)}
                >
                  {color}
                </span>
              </div>
            );
          }) : (
            <p className="text-sm text-gray-500">No colors available</p>
          )}

          <div className='flex justify-between mt-4'>
            <button onClick={resetFilter} className='px-4 py-1 border border-gray-400 rounded'>Reset</button>
            <button onClick={applyFilter} className='px-4 py-1 bg-black text-white rounded'>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
