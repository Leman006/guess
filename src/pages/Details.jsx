import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByCode } from '../services/ProductServices';
import Loader from '../components/Loader';

const Details = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductByCode(code)
      .then(item => {
        setProduct(item);
      })
      .catch(err => console.error(err));
  }, [code]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="pt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
      {/* Левая колонка со всеми картинками */}
      <div className="flex flex-col gap-6">
        {product.images.map((img, idx) => (
          <div key={idx} className="aspect-square overflow-hidden border">
            <img
              src={img}
              alt={`${product.name} ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Правая колонка с деталями */}
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-lg mt-2">{product.price} €</p>
        <p className="text-sm text-gray-500 mt-1">
          Color: {product.colors.join(', ')}
        </p>

        {/* Размеры */}
        <div className="mt-4">
          <p className="font-medium">Size</p>
          <div className="flex gap-2 mt-2">
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                className="border px-4 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Промо */}
        <div className="mt-4 text-sm text-orange-600">
          Welcome Promo: 10% off applying the promocode GUESSWELCOMEYOU
        </div>

        {/* Кнопки */}
        <button className="mt-6 bg-black text-white py-3 px-6 w-full hover:bg-gray-800 transition">
          Add to bag
        </button>

        {/* Описание */}
        <div className="mt-6">
          <p className="font-medium">Description</p>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
