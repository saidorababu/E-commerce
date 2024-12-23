import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {

    const totalPrice = calculateTotal();
    
    // Navigate to payment options with cart and total price as state
    navigate('/payment-options', {
      state: { cart, totalPrice }
    });

    // try {
    //   const response = await axios.post('http://localhost:5000/api/orders', {
    //     products: cart,
    //     totalPrice: calculateTotal(),
    //   });
      
    //   if (response.data) {
    //     clearCart(); // Clear the cart after successful checkout
    //     navigate('/payment-status', {
    //       state: { success: true, orderId: response.data._id },
    //     });
    //   }
    // } catch (error) {
    //   console.error('Checkout error:', error);
    //   navigate('/payment-status', { state: { success: false } });
    // }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="item-image"/>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total: ${calculateTotal()}</p>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
