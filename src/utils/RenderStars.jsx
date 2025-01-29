import starIcon from '@assets/icons/rating/star.svg';

const renderStars = (ratingValue) => {
  // const fullStars = Math.max(0, Math.min(5, Math.round(ratingValue)));

  const fullStars = Math.round(ratingValue);

  // const halfStar = ratingValue % 1 >= 0.5 ? 1 : 0;
  // const emptyStars = 5 - fullStars - halfStar;

  const stars = [
    ...Array(fullStars)
      .fill()
      .map((_, index) => (
        <img key={`full-${index}`} src={starIcon} alt="star-icon" />
      )),
    // ...(halfStar > 0
    //   ? [<img key="half" src={starIcon} alt="half-star-icon" />]
    //   : []),
    // ...Array(emptyStars)
    //   .fill()
    //   .map((_, index) => (
    //     <img key={`empty-${index}`} src={starIcon} alt="empty-star-icon" />
    //   )),
  ];

  return stars;
};

export default renderStars;
