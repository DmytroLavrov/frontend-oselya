import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { addToCart } from '@features/cart/cartSlice';
import {
  fetchProductReviews,
  createReview,
} from '@features/reviews/reviewsSlice';

import { useUIContext } from '@context/UIContext';

import axios from 'axios';

import { backendUrl } from '../../App';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import heartIcon from '@assets/icons/wishlist/heart.svg';
import minusIcon from '@assets/icons/quantity-controls/minus-icon.svg';
import addIcon from '@assets/icons/quantity-controls/add-icon.svg';
import userIcon from '@assets/icons/profile/user-placeholder.svg';

import './Product.scss';

const MAX_COMMENT_LENGTH = 500;

const Product = () => {
  const { setShowLogin } = useUIContext();

  const [productCount, setProductCount] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const reviews = useSelector((state) => state.reviews.items);
  const reviewStatus = useSelector((state) => state.reviews.status);

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      setShowLogin(true);
      return;
    }

    await dispatch(
      createReview({
        productId: id,
        rating: newReview.rating,
        comment: newReview.comment,
      })
    );

    setNewReview({ rating: 5, comment: '' });
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
      dispatch(fetchProductReviews(product._id));
    }
  }, [product, dispatch]);

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

            <div className="product__reviews-section">
              <h2>Customer Reviews</h2>

              {isAuth && (
                <form
                  onSubmit={handleSubmitReview}
                  className="product__review-form"
                >
                  <div className="product__review-rating">
                    <label>Rating:</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          rating: Number(e.target.value),
                        }))
                      }
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                  <div className="product__review-comment">
                    <label>Your Review:</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => {
                        const comment = e.target.value;
                        if (comment.length <= MAX_COMMENT_LENGTH) {
                          setNewReview((prev) => ({ ...prev, comment }));
                        }
                      }}
                      required
                      placeholder="Write your review here..."
                      maxLength={MAX_COMMENT_LENGTH}
                    />
                    <div className="product__review-char-count">
                      {newReview.comment.length}/{MAX_COMMENT_LENGTH} characters
                    </div>
                  </div>
                  <button type="submit" className="product__submit-review">
                    Submit Review
                  </button>
                </form>
              )}

              <div className="product__reviews-list">
                {reviewStatus === 'loading' ? (
                  <div className="product__reviews-loading">
                    <ClipLoader color="#141718" size={50} />
                  </div>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="product__review-item">
                      <div className="product__review-avatar">
                        <img
                          src={review.userId?.avatarUrl || userIcon}
                          alt={review.userId?.login || 'Anonymous'}
                        />
                      </div>
                      <div className="product__review-content">
                        <div className="product__review-header">
                          <div className="product__review-user">
                            {review.userId?.login || 'Anonymous'}
                          </div>
                          <div className="product__review-date">
                            {new Date(review.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </div>
                        </div>
                        <div className="product__review-rating">
                          {renderStars(review.rating)}
                        </div>
                        <div className="product__review-comment">
                          {review.comment}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Product;
