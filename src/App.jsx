import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '@layouts/Header/Header';
import Footer from '@layouts/Footer/Footer';
import Home from '@pages/Home/Home';
import ContactUs from '@pages/ContactUs/ContactUs';
import Shop from '@pages/Shop/Shop';
import Product from '@pages/Product/Product';
import PopupLogin from '@components/PopupLogin/PopupLogin';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import ScrollToTop from '@utils/ScrollToTop';

import './App.scss';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {showLogin && <PopupLogin setShowLogin={setShowLogin} />}
      <Router>
        <ScrollToTop />
        <Header setShowLogin={setShowLogin} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
