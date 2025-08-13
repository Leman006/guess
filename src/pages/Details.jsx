import React, { useContext, useEffect, useState } from 'react'
import { getProductById } from '../services/ProductServices';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import Loader from '../components/Loader';

const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { productsData } = useContext(DataContext); // if you have related products or similar items

    useEffect(() => {
        getProductById(id)
            .then(item => setProduct(item))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) {
        return <Loader />;
    }

    return (
        <div className='pt-20'>
        <h1>Details page</h1>
        <p>Subcategory: {product.subcategory}</p>
        <p>Subcategory: {product.description}</p>
        <p>Product ID: {id}</p>
      </div>
    );
}

export default Details
