import { createContext, useState, useContext } from 'react';
import { categories, priceRanges } from '@assets/assets';

const StoreContext = createContext();

export const useShopContext = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Filter state and functions
  const [selectedCategory, setSelectedCategory] = useState('All Rooms');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const handleCategoryChange = (categoryId) => setSelectedCategory(categoryId);
  const handlePriceChange = (priceValue) =>
    setSelectedPriceRange((prev) => (prev === priceValue ? '' : priceValue));

  // Catalog state and functions
  const [visibleCount, setVisibleCount] = useState(9);
  const handleShowMore = () => setVisibleCount((prev) => prev + 9);

  return (
    <StoreContext.Provider
      value={{
        // Filter context
        categories,
        priceRanges,
        selectedCategory,
        selectedPriceRange,
        handleCategoryChange,
        handlePriceChange,
        // Catalog context
        visibleCount,
        handleShowMore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
