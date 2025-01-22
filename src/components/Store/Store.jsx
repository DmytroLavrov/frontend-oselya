import { useState } from 'react';

import products from '@backend/products.json';

import { filterProducts } from '@utils/FilterAndSortCatalog';

import FilterCatalog from '@components/FilterCatalog/FilterCatalog';
import Catalog from '@components/Catalog/Catalog';

import { categories, priceRanges } from '@assets/assets';

import './Store.scss';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all-rooms');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const handleCategoryChange = (categoryId) => setSelectedCategory(categoryId);

  const handlePriceChange = (priceValue) =>
    setSelectedPriceRange((prev) => (prev === priceValue ? '' : priceValue));

  const handleShowMore = () => setVisibleCount((prev) => prev + 9);

  const selectedCategoryLabel = () =>
    categories.find((category) => category.id === selectedCategory)?.label ||
    'All Rooms';

  const filteredProducts = () =>
    filterProducts(products, selectedCategory, selectedPriceRange);

  return (
    <section className="store">
      <div className="container">
        <div className="store__grid">
          <FilterCatalog
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            priceRanges={priceRanges}
            selectedPriceRange={selectedPriceRange}
            handlePriceChange={handlePriceChange}
          />
          <Catalog
            products={filteredProducts()}
            visibleCount={visibleCount}
            handleShowMore={handleShowMore}
            selectedCategoryLabel={selectedCategoryLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default Store;
