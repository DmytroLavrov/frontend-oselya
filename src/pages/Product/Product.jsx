import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { addToCart } from '@features/cart/cartSlice';

import { useUIContext } from '@context/UIContext';

import axios from 'axios';

import { backendUrl } from '../../App';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import heartIcon from '@assets/icons/wishlist/heart.svg';
import minusIcon from '@assets/icons/quantity-controls/minus-icon.svg';
import addIcon from '@assets/icons/quantity-controls/add-icon.svg';

import './Product.scss';

const Product = () => {
  const { setShowLogin } = useUIContext();

  const [productCount, setProductCount] = useState(1);

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async (itemId) => {
    if (product) {
      dispatch(
        addToCart({
          itemId,
          quantity: productCount,
        })
      );
    }
  };

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
                        : 'No rating'}
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
                  <div className="product__actions-top">
                    <div className="product__quantity">
                      <button
                        onClick={() =>
                          setProductCount((prev) => Math.max(1, prev - 1))
                        }
                      >
                        <img src={minusIcon} alt="minus-icon" />
                      </button>
                      <input
                        type="number"
                        value={productCount}
                        onChange={(e) => setProductCount(e.target.value)}
                        min="1"
                        max="99"
                        className="product__count"
                      />
                      <button
                        onClick={() =>
                          setProductCount((prev) => Math.min(99, prev + 1))
                        }
                      >
                        <img src={addIcon} alt="add-icon" />
                      </button>
                    </div>
                    <button className="product__wishlist">
                      <img src={heartIcon} alt="heart-icon" />
                      Wishlist
                    </button>
                  </div>
                  <div className="product__actions-bottom">
                    {isAuth ? (
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="product__add-to-cart"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowLogin((prev) => !prev)}
                        className="product__add-to-cart"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
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
