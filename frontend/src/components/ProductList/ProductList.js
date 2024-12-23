import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard.js';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 9;

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://192.168.79.27:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) return <div className="loading">Loading...</div>;

  // Slice the products array to display the required number of products per page
  const displayedProducts = products.slice(0, Math.min(products.length,page * PRODUCTS_PER_PAGE));

  return (
    <div className="product-list">
      <section className="home__products">
        <div className="home__header">
          <h2 className="home__title">Products</h2>
        </div>
        <div className="product__cards">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        {displayedProducts.length < products.length && (
          <button onClick={loadMoreProducts} className="load-more">
            Load More
          </button>
        )}
      </section>
    </div>
  );
}

export default ProductList;
