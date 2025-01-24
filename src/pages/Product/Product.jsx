import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

// import products from '@backend/products.json';
import { backendUrl } from '../../App';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import heartIcon from '@assets/images/wishlist/heart.svg';

import './Product.scss';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(backendUrl + `/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Product Not Found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      localStorage.setItem('lastProduct', product._id);
    }
  }, [product]);

  if (loading) {
    return (
      <>
        <Breadcrumbs isProductPage={true} />
        <section className="product">
          <div className="container">
            <div className="product__loading">
              <ClipLoader color="#141718" size={250} />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumbs isProductPage={true} />
        <section className="product">
          <div className="container">
            <div>Error: {error}</div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs isProductPage={true} />
      <section className="product">
        {product ? (
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
                      {!product.ratingValue
                        ? 'No rating available'
                        : product.ratingValue !== null
                        ? renderStars(product.ratingValue)
                        : 'No rating available'}
                    </div>
                    <div className="product__reviews">
                      {product.ratingCount} review
                      {product.ratingCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="product__title">
                    <h1>{product.name}</h1>
                  </div>
                  <div className="product__description">
                    <p>{product.description}</p>
                  </div>
                  <div className="product__price" data-value="$">
                    {formatCurrency(product.price)}
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
                  <span className="product__meta-value">{product._id}</span>
                  <span className="product__meta-label">Category:</span>
                  <span className="product__meta-value">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Product;
