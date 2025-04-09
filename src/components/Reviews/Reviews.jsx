import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { createReview, deleteReview } from '@features/reviews/reviewsSlice';
import { ClipLoader } from 'react-spinners';
import { useUIContext } from '@context/UIContext';
import renderStars from '@utils/RenderStars';
import userIcon from '@assets/icons/profile/user-placeholder.svg';
import { useResponsive } from '../../hooks/useResponsive';
import longArrowRight from '@assets/icons/arrows/long-arrow-right.svg';
import starIcon from '@assets/icons/rating/star.svg';
import starEmptyIcon from '@assets/icons/rating/star-empty.svg';
import removeIcon from '@assets/icons/actions/remove-icon.svg';

import './Reviews.scss';

const MAX_COMMENT_LENGTH = 500;

const Reviews = ({ productId, reviews, reviewStatus, productRating }) => {
  const initialRating = productRating ? Math.round(productRating) : 5;
  const [newReview, setNewReview] = useState({
    rating: initialRating,
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useSelector((state) => state.user.data);
  const { setShowLogin } = useUIContext();
  const isMobile = useResponsive(640, '<=');

  useEffect(() => {
    setNewReview((prev) => ({ ...prev, rating: initialRating }));
  }, [initialRating]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      setShowLogin(true);
      return;
    }

    await dispatch(
      createReview({
        productId,
        rating: newReview.rating,
        comment: newReview.comment,
      })
    );

    setNewReview({ rating: initialRating, comment: '' });
  };

  const handleStarClick = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  const isOwner = (review) => {
    return isAuth && currentUser && review.userId?._id === currentUser._id;
  };

  return (
    <div className="reviews">
      <h2>Customer Reviews</h2>

      {isAuth && (
        <>
          <div className="reviews__rating-selector">
            <label>Your Rating:</label>
            <div className="reviews__stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="reviews__star-button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  <img
                    src={
                      star <= (hoverRating || newReview.rating)
                        ? starIcon
                        : starEmptyIcon
                    }
                    alt={`${star} star`}
                    className="reviews__star-icon"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="reviews__input-container">
            <input
              type="text"
              className="reviews__input"
              placeholder="Share your thoughts"
              value={newReview.comment}
              onChange={(e) => {
                const comment = e.target.value;
                if (comment.length <= MAX_COMMENT_LENGTH) {
                  setNewReview((prev) => ({ ...prev, comment }));
                }
              }}
              onClick={() => {
                if (!isAuth) {
                  setShowLogin(true);
                }
              }}
            />
            <button
              className="reviews__write-button"
              onClick={(e) => {
                e.preventDefault();
                if (isAuth && newReview.comment.trim()) {
                  handleSubmitReview(e);
                } else if (!isAuth) {
                  setShowLogin(true);
                }
              }}
            >
              {isMobile ? (
                <img src={longArrowRight} alt="Submit" />
              ) : (
                'Write Review'
              )}
            </button>
          </div>
        </>
      )}

      <h2>
        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
      </h2>

      <div className="reviews__list">
        {reviewStatus === 'loading' ? (
          <div className="reviews__loading">
            <ClipLoader color="#141718" size={50} />
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="reviews__item">
              <div className="reviews__meta">
                <div className="reviews__avatar">
                  <img
                    src={review.userId?.avatarUrl || userIcon}
                    alt={review.userId?.login || 'Anonymous'}
                  />
                </div>
                <div className="reviews__header">
                  <div className="reviews__user">
                    {review.userId?.login || 'Anonymous'}
                  </div>
                  <div className="reviews__date">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="reviews__rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                {isOwner(review) && (
                  <button
                    className="reviews__delete-icon"
                    onClick={() => handleDeleteReview(review._id)}
                    aria-label="Delete review"
                  >
                    <img src={removeIcon} alt="Delete" />
                  </button>
                )}
              </div>
              <div className="reviews__content">
                <div className="reviews__comment-text">{review.comment}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
