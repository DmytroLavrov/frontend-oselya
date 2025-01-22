// Function to filter products by category and price range
export const filterProducts = (
  products,
  selectedCategory,
  selectedPriceRange
) => {
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

// Function to sort products
export const sortProducts = (products, sorterValue) => {
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
