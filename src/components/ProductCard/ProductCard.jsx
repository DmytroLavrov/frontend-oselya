import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth } from '@features/users/userSlice';
import { addToCart } from '@features/cart/cartSlice';

import { useUIContext } from '@context/UIContext';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { setShowLogin } = useUIContext();

  const handleAddToCart = async (itemId) => {
    if (product) {
      dispatch(
        addToCart({
          itemId,
        })
      );
    }
  };

  return (
    <article className="card" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <div className="card__picture">
          <img src={product.image} alt={product.name} className="card__image" />
          <div className="card__new">New</div>
        </div>
        <div className="card__description">
          <div className="card__rating">
            {!product.ratingValue
              ? 'No rating available'
              : product.ratingValue !== null
              ? renderStars(product.ratingValue)
              : 'No rating'}
          </div>
          <h4 className="card__title">{product.name}</h4>
          <div className="card__price" data-value="$">
            {formatCurrency(product.price)}
          </div>
        </div>
      </Link>
      <div className="card__button">
        {isAuth ? (
          <button
            onClick={() => handleAddToCart(product._id)}
            className="button-primary"
          >
            Add to cart
          </button>
        ) : (
          <button
            onClick={() => setShowLogin((prev) => !prev)}
            className="button-primary"
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
