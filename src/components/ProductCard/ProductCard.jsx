import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth } from '@features/users/userSlice';
import { addToCart } from '@features/cart/cartSlice';

import { useLoginContext } from '@context/LoginContext';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { setShowLogin } = useLoginContext();

  const handleAddToCart = async (itemId) => {
    if (product) {
      // або з Redux

      dispatch(
        addToCart({
          // userId: '678e4b57b54c3b135f2705e4',
          itemId,
          // name: product.name,
          // price: product.price,
          // quantity: 1,
        })
      );
    }
  };

  return (
    // <Link to={`/product/${product._id}`}>
    //   <article className="card" key={product._id}>
    //     <div className="card__picture">
    //       <img src={product.image} alt={product.name} className="card__image" />
    //       <div className="card__new">New</div>
    //       <div className="card__button">
    //         <button
    //           onClick={() => handleAddToCart(product._id)}
    //           className="button-primary"
    //         >
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //     <div className="card__description">
    //       <div className="card__rating">
    //         {!product.ratingValue
    //           ? 'No rating available'
    //           : product.ratingValue !== null
    //           ? renderStars(product.ratingValue)
    //           : 'No rating available'}
    //       </div>
    //       <h4 className="card__title">{product.name}</h4>
    //       <div className="card__price" data-value="$">
    //         {formatCurrency(product.price)}
    //       </div>
    //     </div>
    //   </article>
    // </Link>
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
              : 'No rating available'}
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
