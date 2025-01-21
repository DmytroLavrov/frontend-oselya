import { useState } from 'react';

import products from '@backend/products.json';

import FilterCatalog from '@components/FilterCatalog/FilterCatalog';
import Catalog from '@components/Catalog/Catalog';

import './Store.scss';

const Store = () => {
  const categories = [
    { id: 'all-rooms', label: 'All Rooms' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'outdoor', label: 'Outdoor' },
  ];

  const priceRanges = [
    { id: 'all-price', label: 'All Price', value: '' },
    { id: '0-9999', label: '$0.00 - 99.99', value: '0-9999' },
    { id: '10000-19999', label: '$100.00 - 199.99', value: '10000-19999' },
    { id: '20000-29999', label: '$200.00 - 299.99', value: '20000-29999' },
    { id: '30000-39999', label: '$300.00 - 399.99', value: '30000-39999' },
    { id: '40000-plus', label: '$400.00+', value: '40000+' },
  ];

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

  const filteredProducts = () => {
    let filtered =
      selectedCategory === 'all-rooms'
        ? products
        : products.filter((product) =>
            product.category.includes(selectedCategory)
          );

    if (selectedPriceRange) {
      const [minPriceRange, maxPriceRange] = selectedPriceRange
        .split('-')
        .map((price) => parseInt(price));

      filtered = filtered.filter((product) =>
        maxPriceRange
          ? product.priceCents >= minPriceRange &&
            product.priceCents <= maxPriceRange
          : product.priceCents >= minPriceRange
      );
    }

    return filtered;
  };

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
