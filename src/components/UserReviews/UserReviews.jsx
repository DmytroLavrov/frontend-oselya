import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserReviews, deleteReview } from '@features/reviews/reviewsSlice';
import { ClipLoader } from 'react-spinners';
import renderStars from '@utils/RenderStars';
import removeIcon from '@assets/icons/actions/remove-icon.svg';
import formatCurrency from '@utils/FormatCurrency';

import './UserReviews.scss';

const UserReviews = () => {
  const dispatch = useDispatch();
  const { userReviews, userReviewsStatus } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  if (userReviewsStatus === 'loading') {
    return (
      <div className="user-reviews__loading">
        <ClipLoader color="#141718" size={50} />
      </div>
    );
  }

  return (
    <div className="user-reviews">
      <h3 className="user-reviews__title account-title-primary">My Reviews</h3>

      {userReviews.length === 0 ? (
        <div className="user-reviews__empty">
          <h3 className="user-reviews__empty-title">
            You have no reviews yet 📝
          </h3>
          <p className="user-reviews__empty-message">
            Don't worry! Once you start reviewing products, they will show up
            here 😊
          </p>
          <Link to="/shop" className="arrow-link">
            Start Shopping 🛒 →
          </Link>
        </div>
      ) : (
        <div className="user-reviews__list">
          {userReviews.map((review) => (
            <div key={review._id} className="user-reviews__item">
              <div className="user-reviews__product">
                <div className="user-reviews__product-image">
                  <Link to={`/product/${review.productId?._id}`}>
                    <img
                      src={review.productId?.image}
                      alt={review.productId?.name}
                    />
                  </Link>
                </div>
                <div className="user-reviews__product-info">
                  <Link
                    to={`/product/${review.productId?._id}`}
                    className="user-reviews__product-name"
                  >
                    {review.productId?.name}
                  </Link>
                  <div className="user-reviews__product-price">
                    {formatCurrency(review.productId?.price)}
                  </div>
                </div>
              </div>

              <div className="user-reviews__content">
                <div className="user-reviews__header">
                  <div className="user-reviews__rating">
                    {renderStars(review.rating)}
                  </div>
                  <div className="user-reviews__date">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <button
                    className="user-reviews__delete-icon"
                    onClick={() => handleDeleteReview(review._id)}
                    aria-label="Delete review"
                  >
                    <img src={removeIcon} alt="Delete" />
                  </button>
                </div>
                <div className="user-reviews__comment">{review.comment}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
