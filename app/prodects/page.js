// app/products/page.js
import React, { useState } from 'react';
import { products } from '../../src/utils/products';
import Product from '../../src/components/Product';
import Link from 'next/link';

const Products = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <h1>Simple E-Commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
      <Link href="/cart">
        <button>
          Go to Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})
        </button>
      </Link>
    </div>
  );
};

export default Products;
