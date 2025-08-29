// WomenBag.jsx
import React from 'react';
import BagsList from './BagsList';

const WomenBag = () => {
  // Список подкатегорий для женских сумок
  const womenBagCategories = [
    { label: 'View all', path: 'all' },
    { label: 'Crossbody Bags', path: 'crossbody-bags' },
    { label: 'Handbags', path: 'handbags' },
    { label: 'Shoppers', path: 'shoppers' },
    { label: 'Shoulder Bags', path: 'shoulder-bags' },
    { label: 'Mini Bags', path: 'mini-bags' },
    { label: 'Clutches and Evening Bags', path: 'clutches' },
    { label: 'Backpacks', path: 'backpacks' },
    { label: 'Travel Bags', path: 'travel-bags' }
  ];

  return (
    // Используем универсальный компонент и передаем ему необходимые данные
    <BagsList
      gender="women"
      categories={womenBagCategories}
      baseRoute="/women/bags"
    />
  );
};

export default WomenBag;