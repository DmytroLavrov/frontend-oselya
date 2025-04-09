import starIcon from '@assets/icons/rating/star.svg';
import starEmptyIcon from '@assets/icons/rating/star-empty.svg';

const renderStars = (ratingValue) => {
  const fullStars = Math.round(ratingValue);
  const emptyStars = 5 - fullStars;

  const stars = [
    ...Array(fullStars)
      .fill()
      .map((_, index) => (
        <img key={`full-${index}`} src={starIcon} alt="star-icon" />
      )),
    ...Array(emptyStars)
      .fill()
      .map((_, index) => (
        <img key={`empty-${index}`} src={starEmptyIcon} alt="empty-star-icon" />
      )),
  ];

  return stars;
};

export default renderStars;
