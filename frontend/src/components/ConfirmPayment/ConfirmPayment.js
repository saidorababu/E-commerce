import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './ConfirmPayment.css';
import axios from 'axios';

function ConfirmPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { method, upi, cart, totalPrice } = location.state || {};

  const paymentMethod = location.state?.method;
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);


  const handlePaymentConfirmation = async () => {
    // Simulate payment process here
    const paymentSuccess = Math.random() > 0.7; // Random success/failure for demo purposes

    if (paymentSuccess) {
        try {
            // Prepare order data
            const orderData = {
              products: cart.map(item => ({
                product: item.id, // Assuming item.id is the product ID
                quantity: item.quantity
              })),
              totalPrice: totalAmount,
              paymentId: 'some-payment-id', // Replace with actual payment ID if available
            };
    
            // Store the order in the database
            const response = await axios.post('http://192.168.79.27:5000/api/orders/create', orderData);
    
            if (response.data.success) {
              navigate('/payment-status', { state: { success: true } });
            } else {
              navigate('/payment-status', { state: { success: false } });
            }
          } catch (error) {
            console.error('Error storing order:', error);
            navigate('/payment-status', { state: { success: false } });
          }
    } else {
      navigate('/payment-status', { state: { success: false } });
    }
  };

  const handleBackButtonClick = () => {
    navigate('/payment-options', { state: { cart, totalPrice } }); // Pass cart and totalPrice to the previous page
  };

  return (
    <div className="confirm-payment">
      <h2>Confirm Your Payment</h2>
      <p>Payment Method: {method}</p>
      {method === 'UPI' && <p>UPI Method: {upi}</p>}
      <p>Total Amount: ${totalPrice}</p>

      <div className="order-summary">
        <h3>Your Order:</h3>
        {cart.map(item => (
          <div key={item.id}>
            <p>{item.name} x {item.quantity} = ${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="payment-actions">
        <button onClick={handleBackButtonClick} className="back-btn">Back</button>
        <button onClick={handlePaymentConfirmation} className="pay-btn">Pay Now</button>
      </div>
    </div>
  );
}

export default ConfirmPayment;