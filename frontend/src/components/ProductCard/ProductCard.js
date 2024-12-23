import React, { useState } from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // New state for "Added to Cart" effect

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    onAddToCart(product); // Call the parent function to add to cart
    setIsAdded(true); // Set isAdded to true to trigger the "Added to Cart" text

    // Reset to default after 1 second
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card group relative">
      <Link to={`/products/${product._id}`} className="product-card__image-link">
        <div className="product-card__image">
          <img
            src={"/" + product.imageUrl}
            alt={product.name}
            className="product-card__img"
          />
        </div>
      </Link>
      <div className="product-card__content">
        <div className="product-card__header">
          <h3 className="product-card__title">{product.name}</h3>
          <div className="product-card__rating">
            <Star className="product-card__star" />
            <span className="product-card__rating-text">{product.rating}</span>
          </div>
        </div>
        <p className="product-card__description">
          {showFullDescription ? product.description : `${product.description.substring(0, 50)}...`}
          <button onClick={toggleDescription} className="product-card__toggle">
            {showFullDescription ? 'View Less' : 'View More'}
          </button>
        </p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className={`product-card__add-to-cart ${isAdded ? 'added' : ''}`}
          >
            {isAdded ? (
              <>
                <Check className="product-card__check-icon" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="product-card__cart-icon" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      {product.stock < 5 && (
        <div className="product-card__stock-warning">
          Only {product.stock} left!
        </div>
      )}
    </div>
  );
}

export default ProductCard;
