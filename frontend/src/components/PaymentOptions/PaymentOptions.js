import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentOptions.css';

function PaymentOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, totalPrice } = location.state || {};  // Get state from Checkout

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [upiMethod, setUpiMethod] = useState(null); // For UPI options

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
    setUpiMethod(null); // Reset UPI method if a new primary method is selected
  };

  const handleUpiSelection = (upi) => {
    setUpiMethod(upi);
  };

  const handleCancelOrder = () => {
    navigate('/checkout'); // Go back to checkout page
  };

  const handleProceedToPayment = () => {
    if (paymentMethod) {
      // If payment method is UPI, ensure a UPI option is selected
      if (paymentMethod === 'UPI' && !upiMethod) {
        alert('Please select a UPI method!');
        return;
      }
      navigate('/confirm-payment', { 
        state: { 
          method: paymentMethod, 
          upi: upiMethod, 
          cart,          // Passing cart
          totalPrice     // Passing totalPrice
        }
      });
    } else {
      alert('Please select a payment method!');
    }
  };

  return (
    <div className="payment-options">
      <h2>Select Payment Method</h2>
      
      <div className="payment-methods">
        <div className="payment-method">
          <input 
            type="radio" 
            id="credit-card" 
            name="payment-method" 
            value="Credit Card" 
            checked={paymentMethod === 'Credit Card'}
            onChange={() => handlePaymentMethodSelection('Credit Card')} 
          />
          <label htmlFor="credit-card" className="payment-btn">
            Credit Card
          </label>
        </div>

        <div className="payment-method">
          <input 
            type="radio" 
            id="debit-card" 
            name="payment-method" 
            value="Debit Card" 
            checked={paymentMethod === 'Debit Card'}
            onChange={() => handlePaymentMethodSelection('Debit Card')} 
          />
          <label htmlFor="debit-card" className="payment-btn">
            Debit Card
          </label>
        </div>

        <div className="payment-method">
          <input 
            type="radio" 
            id="upi" 
            name="payment-method" 
            value="UPI" 
            checked={paymentMethod === 'UPI'}
            onChange={() => handlePaymentMethodSelection('UPI')} 
          />
          <label htmlFor="upi" className="payment-btn">
            UPI
          </label>

          {/* UPI Options - Conditional rendering */}
          {paymentMethod === 'UPI' && (
            <div className="upi-options">
              <input 
                type="radio" 
                id="phonepe" 
                name="upi-method" 
                value="PhonePe" 
                checked={upiMethod === 'PhonePe'}
                onChange={() => handleUpiSelection('PhonePe')} 
              />
              <label htmlFor="phonepe" className="upi-btn">PhonePe</label>

              <input 
                type="radio" 
                id="paytm" 
                name="upi-method" 
                value="Paytm" 
                checked={upiMethod === 'Paytm'}
                onChange={() => handleUpiSelection('Paytm')} 
              />
              <label htmlFor="paytm" className="upi-btn">Paytm</label>

              <input 
                type="radio" 
                id="google-pay" 
                name="upi-method" 
                value="Google Pay" 
                checked={upiMethod === 'Google Pay'}
                onChange={() => handleUpiSelection('Google Pay')} 
              />
              <label htmlFor="google-pay" className="upi-btn">Google Pay</label>
            </div>
          )}
        </div>

        <div className="payment-method">
          <input 
            type="radio" 
            id="net-banking" 
            name="payment-method" 
            value="Net Banking" 
            checked={paymentMethod === 'Net Banking'}
            onChange={() => handlePaymentMethodSelection('Net Banking')} 
          />
          <label htmlFor="net-banking" className="payment-btn">
            Net Banking
          </label>
        </div>
      </div>

      <div className="payment-actions">
        <button onClick={handleCancelOrder} className="cancel-btn">Cancel Order</button>
        <button onClick={handleProceedToPayment} className="proceed-btn">Proceed to Payment</button>
      </div>
    </div>
  );
}

export default PaymentOptions;
