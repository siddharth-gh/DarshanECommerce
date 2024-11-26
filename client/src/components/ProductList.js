import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.scss';
import products from './sampleProducts.json';

export default function ProductList(props) {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        setProductList(products);
    }, []);

    return (
        <div className={`${styles.Products} ${localStorage.getItem('theme') == 'light' ? styles.light : styles.dark}`}>
            {productList.map(product => (
                <ProductCard
                    key={product.id}
                    {...product}
                    addToCart={props.addToCart}
                />
            ))}
        </div>
    );
}
