// Function to filter products by category and price range
export const filterProducts = (
  products,
  selectedCategory,
  selectedPriceRange
) => {
  let filtered =
    selectedCategory === 'All Rooms'
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
        ? product.price >= minPriceRange && product.price <= maxPriceRange
        : product.price >= minPriceRange
    );
  }

  return filtered;
};

// Function to sort products
export const sortProducts = (products, sorterValue) => {
  if (!sorterValue) return products;

  const sorted = [...products];
  switch (sorterValue) {
    case 'newest':
      return sorted.sort((a, b) => b.date - a.date);
    case 'oldest':
      return sorted.sort((a, b) => a.date - b.date);
    // case 'bestRating':
    //   return sorted.sort((a, b) => b.ratingValue - a.ratingValue);
    // case 'worstRating':
    //   return sorted.sort((a, b) => a.ratingValue - b.ratingValue);
    case 'highPrice':
      return sorted.sort((a, b) => b.price - a.price);
    case 'lowPrice':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};
