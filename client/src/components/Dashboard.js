import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.scss';
import { url } from '../assets'

export default function Dashboard(props) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const response = await fetch(`${url}/api/order/orders`);
                const data = await response.json();

                setOrders(data);
            } catch (error) {
                toast.error('Failed to fetch orders: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${url}/api/order/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            toast.success(`Order ${orderId} marked as ${newStatus}`);

            const updatedOrders = orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);

        } catch (error) {
            toast.error('Error updating order status: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className={`${styles.Dashboard} ${props.theme === 'light' ? styles.light : styles.dark}`}>
            <h2>Admin Dashboard</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                <div className={styles.ordersList}>
                    <table className={styles.ordersTable}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.customerName}</td>
                                    <td>${order.finalTotal.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button
                                            className={styles.statusButton}
                                            onClick={() => handleOrderStatusChange(order._id, 'Shipped')}
                                            disabled={order.status === 'Shipped'}
                                        >
                                            Mark as Shipped
                                        </button>
                                        <button
                                            className={styles.statusButton}
                                            onClick={() => handleOrderStatusChange(order._id, 'Delivered')}
                                            disabled={order.status === 'Delivered'}
                                        >
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
