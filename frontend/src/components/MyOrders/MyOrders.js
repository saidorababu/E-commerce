import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://192.168.79.27:5000/api/orders');
        setOrders(response.data);

        // Fetch product details for each order
        const productIds = response.data.flatMap(order => 
          order.products.map(item => item.product)  // Get the product IDs (not _id)
        );

        const uniqueProductIds = [...new Set(productIds)];

        // Fetch product details only for unique product IDs
        const productResponses = await Promise.all(
          uniqueProductIds.map(id => axios.get(`http://192.168.79.27:5000/api/products/${id}`))
        );

        const productsById = productResponses.reduce((acc, res) => {
          acc[res.data._id] = res.data;  // Map product details by product ID
          return acc;
        }, {});

        setProductDetails(productsById);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>Your Orders</h2>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice}</p>
              <p>Status: <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
