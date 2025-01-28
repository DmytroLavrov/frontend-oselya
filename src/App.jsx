import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useLoginContext } from '@context/LoginContext';

import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '@features/users/userSlice';
import { selectIsAuth } from '@features/users/userSlice';
import { getUserCart } from '@features/cart/cartSlice';

import Header from '@layouts/Header/Header';
import Footer from '@layouts/Footer/Footer';
import Home from '@pages/Home/Home';
import ContactUs from '@pages/ContactUs/ContactUs';
import Shop from '@pages/Shop/Shop';
import Product from '@pages/Product/Product';
import PopupLogin from '@components/PopupLogin/PopupLogin';
import Account from '@pages/Account/Account';
import Cart from '@pages/Cart/Cart';
import Checkout from '@pages/Checkout/Checkout';
import OrderComplete from '@pages/OrderComplete/OrderComplete';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import ScrollToTop from '@utils/ScrollToTop';

import './App.scss';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { showLogin } = useLoginContext();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const cartData = useSelector((state) => state.cart.items?.cartData);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserCart());
    }
  }, [isAuth]);

  const totalQuantity = cartData
    ? Object.values(cartData).reduce((sum, quantity) => sum + quantity, 0)
    : 0;

  // const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {/* {showLogin && <PopupLogin setShowLogin={setShowLogin} />} */}
      {showLogin && <PopupLogin />}
      <Router>
        <ScrollToTop />
        {/* <Header setShowLogin={setShowLogin} /> */}
        <Header totalQuantity={totalQuantity} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
