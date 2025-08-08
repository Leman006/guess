// MenCloth.jsx
import React from 'react';
import ClothingList from './ClothingList';

const MenCloth = () => {
  // Список подкатегорий для мужской одежды
  const menCategories = [
    { label: 'View all', path: 'all' },
    { label: 'Coats and Jackets', path: 'coats-and-jackets' },
    { label: 'T-shirts and Polo Shirts', path: 't-shirts-and-polo-shirts' },
    { label: 'Shirts', path: 'shirts' },
    { label: 'Knitwear', path: 'knitwear' },
    { label: 'Sweatshirts', path: 'sweatshirts' },
    { label: 'Trousers and shorts', path: 'trousers-and-shorts' },
    { label: 'Beachwear', path: 'beachwear' },
    { label: 'Underwear', path: 'underwear' },
    { label: 'Activewear', path: 'activewear' },
  ];

  return (
    // Передаем правильные данные в универсальный компонент
    <ClothingList
      gender="men"
      categories={menCategories}
      baseRoute="/men/clothing"
    />
  );
};

export default MenCloth;