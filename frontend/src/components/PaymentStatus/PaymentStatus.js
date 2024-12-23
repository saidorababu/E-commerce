import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PaymentStatus.css';

function PaymentStatus() {
  const location = useLocation();
  const { success, orderId } = location.state || {};

  return (
    <div className="payment-status">
      {success ? (
        <div className="success">
          <h2>Payment Successful!</h2>
          <p>Order ID: {orderId}</p>
          <p>Thank you for your purchase.</p>
        </div>
      ) : (
        <div className="failure">
          <h2>Payment Failed</h2>
          <p>Something went wrong with your payment.</p>
          <p>Please try again.</p>
        </div>
      )}
      <Link to="/" className="home-button">Return to Home</Link>
    </div>
  );
}

export default PaymentStatus;