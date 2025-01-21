import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import products from '@backend/products.json';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import heartIcon from '@assets/images/wishlist/heart.svg';

import './Product.scss';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(
    products.find((prod) => prod.id === id)
  );

  useEffect(() => {
    const currentProduct = products.find((prod) => prod.id === id);
    setProduct(currentProduct);

    // Оновлення `localStorage` лише після зміни продукту
    if (currentProduct) {
      localStorage.setItem('lastProduct', id);
    }
  }, [id, products]);

  if (!product) {
    return (
      <>
        <Breadcrumbs isProductPage={true} />
        <section className="product">
          <div className="container">
            <p>Loading product...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs isProductPage={true} />
      <section className="product">
        <div className="container">
          <div className="product__content">
            <div className="product__media">
              <div className="product__image">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div className="product__details">
              <div className="product__info">
                <div className="product__rating-info">
                  <div className="product__rating">
                    {product.ratingValue !== null
                      ? renderStars(product.ratingValue)
                      : 'No rating available'}
                  </div>
                  <div className="product__reviews">
                    {product.ratingCount} review
                    {product.ratingCount !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="product__title">
                  <h1>{product.title}</h1>
                </div>
                <div className="product__description">
                  <p>{product.description}</p>
                </div>
                <div className="product__price" data-value="$">
                  {formatCurrency(product.priceCents)}
                </div>
              </div>
              <div className="product__actions">
                <div>
                  <button className="product__quantity">Quantity</button>
                  <button className="product__wishlist">
                    <img src={heartIcon} alt="heart-icon" />
                    Wishlist
                  </button>
                </div>
                <button className="product__add-to-cart">Add to Cart</button>
              </div>
              <div className="product__meta">
                <span className="product__meta-label">SKU:</span>
                <span className="product__meta-value">{product.id}</span>
                <span className="product__meta-label">Category:</span>
                <span className="product__meta-value">
                  {product.category
                    .map((cat) => {
                      return cat
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ');
                    })
                    .join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
