// WomenBag.jsx
import React from 'react';
import BagsList from './BagsList';

const WomenBag = () => {
  // Список подкатегорий для женских сумок
  const womenBagCategories = [
    { label: 'View all', path: 'all' },
    { label: 'Handbags', path: 'handbags' },
    { label: 'Crossbody Bags', path: 'crossbody-bags' },
    { label: 'Shoulder Bags', path: 'shoulder-bags' },
    { label: 'Tote Bags', path: 'tote-bags' },
    { label: 'Backpacks', path: 'backpacks' },
    { label: 'Clutches', path: 'clutches' },
    { label: 'Belt Bags', path: 'belt-bags' },
    { label: 'Evening Bags', path: 'evening-bags' },
    { label: 'Travel Bags', path: 'travel-bags' },
    { label: 'Wallets', path: 'wallets' },
    { label: 'Card Holders', path: 'card-holders' }
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