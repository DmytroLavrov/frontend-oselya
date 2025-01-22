import ShopGreeting from '@components/ShopGreeting/ShopGreeting';
import Store from '@components/Store/Store';
import Products from '@components/Products/Products';
import Newsletter from '@components/Newsletter/Newsletter';

const Shop = () => {
  return (
    <>
      <ShopGreeting />
      {/* <Store /> */}
      <Products />
      <Newsletter />
    </>
  );
};

export default Shop;
