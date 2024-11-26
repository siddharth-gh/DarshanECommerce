import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './ProductPage.module.scss';
import products from './sampleProducts.json';

export default function ProductPage(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find(product => product.id === parseInt(id));
        setProduct(selectedProduct);
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const generateRandomReviews = () => {
        const reviews = [
            { user: 'John Doe', rating: 5, text: 'Excellent product! Highly recommend.' },
            { user: 'Jane Smith', rating: 4, text: 'Very good, but could use some improvements.' },
            { user: 'Samuel L', rating: 3, text: 'It’s okay, not great but not bad either.' },
            { user: 'Alice W', rating: 2, text: 'Not what I expected, disappointed with the quality.' },
            { user: 'Bob J', rating: 1, text: 'Very poor quality. Would not recommend.' }
        ];
        return reviews;
    };

    const randomReviews = generateRandomReviews();

    const getCategoryRecommendations = () => {
        const category = product.category;
        const relatedProducts = products.filter(p => p.category === category && p.id !== parseInt(id));
        return relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
    };

    const relatedProducts = getCategoryRecommendations();

    return (
        <div className={`${styles.ProductPage} ${props.theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.main}>
                <div className={styles.images}>
                    <img src={`/${product.productImage}`} alt={product.title} />
                </div>
                <div className={styles.info}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>Explore our extensive collection of high-quality products designed to meet a variety of needs. Whether you're looking for functionality, style, or innovation, each item is crafted with attention to detail, ensuring durability, reliability, and top-notch performance. Perfect for everyday use or special occasions, our products offer excellent value, combining modern design with practicality, all at affordable prices. Elevate your lifestyle with products that are made to last and enhance your experience.</p>
                    <span className={styles.rating}>
                        <Icon icon="material-symbols:star" width="1.2em" height="1.2em" />
                        <p>{product.rating}</p>
                    </span>
                    <p>{product.price}</p>
                    <div className={styles.actions}>
                        <button onClick={() => props.addToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            </div>

            <div className={styles.reviews}>
                <h4>Customer Reviews</h4>
                {randomReviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <p><strong>{review.user}</strong> - {review.rating} stars</p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>

            <div className={styles.recommendations}>
                <h4>Related Products</h4>
                <div className={styles.relatedProducts}>
                    {relatedProducts.map(product => (
                        <div key={product.id} className={styles.relatedProduct}>
                            <img src={`/${product.productImage}`} alt={product.title} />
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
