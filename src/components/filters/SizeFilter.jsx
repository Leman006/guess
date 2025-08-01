import React, { useRef, useEffect } from 'react';

const SizeFilter = ({
  show,
  toggleDropdown,
  uniqueSizes,
  selectedSizes,
  toggleSize,
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
        Size
      </button>
      {show && (
        <div className='absolute top-[55px] left-0 bg-white shadow-md p-4 w-[270px] z-50 border border-gray-300 rounded'>
          {uniqueSizes.length > 0 ? uniqueSizes.map(size => (
            <div key={size} className='flex items-center gap-2 mb-2'>
              <input
                type='checkbox'
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              <span
                className={`text-[14px] cursor-pointer ${selectedSizes.includes(size) ? 'underline font-medium' : ''}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </span>
            </div>
          )) : (
            <p className="text-sm text-gray-500">No sizes available</p>
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

export default SizeFilter;
