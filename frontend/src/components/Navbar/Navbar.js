import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        Amazon Clone
      </Link>
      
      <div className="navbar__search">
        <input type="text" className="search__input" placeholder="Search products..." />
        <button className="search__button">Search</button>
      </div>
      
      <div className="navbar__links">
        <Link to="/" className="nav__link">Home</Link>
        <Link to="/products" className="nav__link">Products</Link>
        <Link to="/my-orders" className="nav__link">My Orders</Link>
        <Link to="/checkout" className="nav__link nav__cart-link">
          <ShoppingCart className="nav__cart-icon" />
          <span className="nav__cart-text">Cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;