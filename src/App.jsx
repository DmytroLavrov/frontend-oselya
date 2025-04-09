import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useUIContext } from '@context/UIContext';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '@features/users/userSlice';
import { selectIsAuth } from '@features/users/userSlice';
import { getUserCart } from '@features/cart/cartSlice';

import Header from '@layouts/Header/Header';
import Footer from '@layouts/Footer/Footer';
import PopupLogin from '@components/PopupLogin/PopupLogin';
import Preloader from '@components/Preloader/Preloader';
import SearchBar from '@components/SearchBar/SearchBar';

const Home = lazy(() => import('@pages/Home/Home'));
const ContactUs = lazy(() => import('@pages/ContactUs/ContactUs'));
const Shop = lazy(() => import('@pages/Shop/Shop'));
const Product = lazy(() => import('@pages/Product/Product'));
const Account = lazy(() => import('@pages/Account/Account'));
const Cart = lazy(() => import('@pages/Cart/Cart'));
const Checkout = lazy(() => import('@pages/Checkout/Checkout'));
const OrderComplete = lazy(() => import('@pages/OrderComplete/OrderComplete'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));

import ScrollToTop from '@utils/ScrollToTop';

import './App.scss';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { showLogin } = useUIContext();
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

  return (
    <div className="app">
      {showLogin && <PopupLogin />}
      <Router>
        <Suspense fallback={<Preloader />}>
          <ScrollToTop />
          <Header totalQuantity={totalQuantity} />
          <SearchBar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/orders" element={<Account />} />
              <Route path="/account/reviews" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
