import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles for Toastify
import styles from './CheckoutPage.module.scss';
import { url } from "../assets"

export default function CheckoutPage({ cartItems }) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery'); // Only one payment method for now

    // Calculate the total price, GST, and discounts
    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.price.replace('$', '')); // Assuming price is a string like "$100"
        });
        return total;
    };

    const totalPrice = calculateTotalPrice();
    const gst = totalPrice * 0.18;
    const discount = totalPrice * 0.1;
    const finalTotal = totalPrice + gst - discount;

    const handlePlaceOrder = async () => {
        const orderData = {
            cartItems,
            totalPrice,
            gst,
            discount,
            finalTotal,
            paymentMethod,
        };

        try {
            const response = await fetch(`${url}/api/order/newOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const data = await response.json();

            toast.success('Order placed successfully!', { position: "top-center" });

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error('Error placing the order: ' + error.message, { position: "top-center" });
        }
    };

    return (
        <div className={styles.CheckoutPage}>
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className={styles.cartSummary}>
                    <h3>Your Order</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <img
                                    src={item.productImage}
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
                            </li>
                        ))}
                    </ul>

                    <div className={styles.summary}>
                        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                        <p><strong>GST (18%):</strong> ${gst.toFixed(2)}</p>
                        <p><strong>Discount (10%):</strong> -${discount.toFixed(2)}</p>
                        <p><strong>Final Total:</strong> ${finalTotal.toFixed(2)}</p>
                    </div>

                    <h3>Payment Method</h3>
                    <div className={styles.paymentMethod}>
                        <label>
                            <input
                                type="radio"
                                value="cashOnDelivery"
                                checked={paymentMethod === 'cashOnDelivery'}
                                onChange={() => setPaymentMethod('cashOnDelivery')}
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    <button
                        className={styles.placeOrderButton}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
