import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard.js';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    // Fetch products from the API and set them to state
    axios.get('http://192.168.79.27:5000/api/products')
      .then(response => {
        // Select the first six products as featured products
        setFeaturedProducts(response.data.slice(0, 6));
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__banner">
        <h1>Welcome to Our Store</h1>
        <p>Find amazing products at great prices</p>
      </div>

      <section className="home__products">
        <div className="home__header">
          <h2 className="home__title">Featured Products</h2>
          <Link to="/products" className="home__view-all">
            View All <ArrowRight className="home__arrow" />
          </Link>
        </div>
        <div className="product__cards">
          {featuredProducts.map((product) => (
            
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
            
          ))}
        </div>
      </section>

      {/* <div className="home__categories">
        <h2>Shop by Category</h2>
        <div className="categories__grid">
          <Link to="/products?category=electronics" className="category__card">
            Electronics
          </Link>
          <Link to="/products?category=clothing" className="category__card">
            Clothing
          </Link>
          <Link to="/products?category=books" className="category__card">
            Books
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
