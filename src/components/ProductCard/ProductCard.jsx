import { Link, NavLink } from 'react-router-dom';

import renderStars from '@utils/RenderStars';
import formatCurrency from '@utils/FormatCurrency';

import './ProductCard.scss';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <article className="card" key={product.id}>
        <div className="card__picture">
          <img
            src={product.image}
            alt={product.title}
            className="card__image"
          />
          <div className="card__new">New</div>
          <div className="card__button">
            <button className="button-primary">Add to cart</button>
          </div>
        </div>
        <div className="card__description">
          <div className="card__rating">
            {product.ratingValue !== null
              ? renderStars(product.ratingValue)
              : 'No rating available'}
          </div>
          <h4 className="card__title">{product.title}</h4>
          <div className="card__price" data-value="$">
            {formatCurrency(product.priceCents)}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
