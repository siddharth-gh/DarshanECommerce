import React from 'react';
import styles from './SideCart.module.scss';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function SideCart({ cartItems, removeFromCart, toggleCart }) {
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.price.replace('$', ''));
        });
        return total;
    };

    const totalPrice = calculateTotalPrice();
    const gst = totalPrice * 0.18;
    const discount = totalPrice * 0.1;
    const finalTotal = totalPrice + gst - discount;

    const handleCheckoutClick = () => {
        navigate('/checkoutpage');
    };

    return (
        <div className={styles.SideCart}>
            <Icon
                icon="fluent-emoji-flat:cross-mark"
                width="1.2em"
                height="1.2em"
                onClick={toggleCart}
                className={styles.closeCart}
            />
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <div className={styles.empty}>
                    <img src="/emptyCart.png" alt="Empty cart" />
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                        >
                            <img
                                src={`/${item.productImage}`}
                                alt={item.title}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    objectFit: 'cover',
                                    marginRight: '10px',
                                }}
                            />
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.price}</p>
                            </div>
                            <div
                                className={styles.removeItem}
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Icon
                                    icon="fluent-emoji-flat:cross-mark"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length === 0 ? (
                <p></p>
            ) : (
                <>
                    <div className={styles.cartSummary}>
                        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                        <p><strong>GST (18%):</strong> ${gst.toFixed(2)}</p>
                        <p><strong>Discount (10%):</strong> -${discount.toFixed(2)}</p>
                        <p><strong>Final Total:</strong> ${finalTotal.toFixed(2)}</p>
                    </div>
                    <button className={styles.checkoutButton} onClick={handleCheckoutClick}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}
