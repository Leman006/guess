// WomenCloth.jsx
import React from 'react';
import ClothingList from './ClothingList';

const WomenCloth = () => {
  // Список подкатегорий для женской одежды
  const womenCategories = [
    { label: 'View all', path: 'all' },
    { label: 'Dresses and Jumpsuits', path: 'dresses-and-jumpsuits' },
    { label: 'Coats and Jackets', path: 'coats-and-jackets' },
    { label: 'Tops and Shirts', path: 'tops-and-shirts' },
    { label: 'T-shirts', path: 't-shirts' },
    { label: 'Knitwear', path: 'knitwear' },
    { label: 'Sweatshirts', path: 'sweatshirts' },
    { label: 'Trousers', path: 'trousers' },
    { label: 'Skirts and Shorts', path: 'skirts-and-shorts' },
    { label: 'Beachwear', path: 'beachwear' },
    { label: 'Activewear', path: 'activewear' },
    { label: 'Socks', path: 'socks' }
  ];

  return (
    // Используем универсальный компонент и передаем ему необходимые данные
    <ClothingList
      gender="women"
      categories={womenCategories}
      baseRoute="/women/clothing"
    />
  );
};

export default WomenCloth;