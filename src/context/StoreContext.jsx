import { createContext, useState, useEffect, useContext } from 'react';
import { categories, priceRanges } from '@assets/assets';
import { useResponsive } from '@hooks/useResponsive';

const StoreContext = createContext();

export const useShopContext = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Filter state and functions
  const [selectedCategory, setSelectedCategory] = useState('All Rooms');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const handleCategoryChange = (categoryId) => setSelectedCategory(categoryId);
  const handlePriceChange = (priceValue) =>
    setSelectedPriceRange((prev) => (prev === priceValue ? '' : priceValue));

  // Responsive state for visible count
  const isSmallScreen = useResponsive(768);
  const [visibleCount, setVisibleCount] = useState(isSmallScreen ? 6 : 9);
  const [showMoreClicked, setShowMoreClicked] = useState(false);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isSmallScreen ? 6 : 9));
    setShowMoreClicked(true);
  };

  useEffect(() => {
    if (!showMoreClicked) {
      setVisibleCount(isSmallScreen ? 6 : 9);
    }
  }, [isSmallScreen, showMoreClicked]);

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
