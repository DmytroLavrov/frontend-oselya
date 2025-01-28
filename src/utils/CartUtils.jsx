export const calculateCartTotal = (products, cartData, shippingMethod) => {
  const subtotal = products.reduce((total, product) => {
    if (cartData && product && cartData[product._id]) {
      return total + product.price * cartData[product._id];
    }
    return total;
  }, 0);

  const shippingCost = {
    Free: 0,
    Express: 1500,
    Worldwide: 3000,
  }[shippingMethod];

  const total = subtotal + shippingCost;

  return { subtotal, shippingCost, total };
};
