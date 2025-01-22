import { StoreProvider } from '@context/StoreContext';
import ShopGreeting from '@components/ShopGreeting/ShopGreeting';
import Store from '@components/Store/Store';
import Newsletter from '@components/Newsletter/Newsletter';

const Shop = () => {
  return (
    <StoreProvider>
      <ShopGreeting />
      <Store />
      <Newsletter />
    </StoreProvider>
  );
};

export default Shop;
