import { useState } from 'react';

import ProductCard from '@components/ProductCard/ProductCard';
import SortCatalog from '@components/SortCatalog/SortCatalog';

import './Catalog.scss';
import './Toolbar.scss';

const Catalog = ({
  products,
  visibleCount,
  handleShowMore,
  selectedCategoryLabel,
}) => {
  const [sorterValue, setSorterValue] = useState('bestRating');

  const handleSort = (key) => {
    setSorterValue(key);
  };

  const sortedProducts = () => {
    if (!sorterValue) return products;

    const sorted = [...products];
    switch (sorterValue) {
      case 'bestRating':
        return sorted.sort((a, b) => b.ratingValue - a.ratingValue);
      case 'worstRating':
        return sorted.sort((a, b) => a.ratingValue - b.ratingValue);
      case 'highPrice':
        return sorted.sort((a, b) => b.priceCents - a.priceCents);
      case 'lowPrice':
        return sorted.sort((a, b) => a.priceCents - b.priceCents);
      default:
        return products;
    }
  };

  return (
    <div className="store__catalog catalog">
      <div className="catalog__toolbar toolbar">
        <h3 className="toolbar__title">{selectedCategoryLabel()}</h3>
        <div className="toolbar__sort">
          <SortCatalog handleSort={handleSort} />
        </div>
      </div>
      <div
        className={`catalog__products${products.length === 0 ? ' empty' : ''}`}
      >
        {sortedProducts()
          .slice(0, visibleCount)
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}

        {products.length === 0 && (
          <div className="catalog__empty">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
      {products.length > visibleCount && (
        <button className="catalog__button" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
};

export default Catalog;
