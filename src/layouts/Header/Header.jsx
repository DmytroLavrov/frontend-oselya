import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from './logo.svg';
import BurgerMenu from '@components/BurgerMenu/BurgerMenu';
import searchIcon from './search.svg';
import userIcon from './user-circle.svg';
import cartIcon from './cart.svg';

import './Header.scss';
import './Nav.scss';
import './Cart.scss';

const Header = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/product')) {
      setMenu('product');
    } else if (location.pathname === '/shop') {
      setMenu('shop');
    } else if (location.pathname === '/contact-us') {
      setMenu('contact-us');
    } else if (location.pathname === '/') {
      setMenu('home');
    } else {
      setMenu('none'); // Для випадків 404 або невизначених шляхів
    }
  }, [location]);

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav nav">
          <div className="nav__logo logo">
            <Link to="/">
              <img src={Logo} alt="logo" className="logo" />
            </Link>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                className={`nav__link${menu === 'home' ? ' active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link
                className={`nav__link${menu === 'shop' ? ' active' : ''}`}
                to="/shop"
              >
                Shop
              </Link>
            </li>

            <li className="nav__item">
              <Link
                className={`nav__link${menu === 'product' ? ' active' : ''}`}
                to={
                  localStorage.getItem('lastProduct')
                    ? `/product/${localStorage.getItem('lastProduct')}`
                    : '/shop'
                }
              >
                Product
              </Link>
            </li>

            <li className="nav__item">
              <Link
                className={`nav__link${menu === 'contact-us' ? ' active' : ''}`}
                to="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="nav__buttons">
            <div className="search-icon">
              <img src={searchIcon} alt="search-icon" />
            </div>
            {/* <Link to={'/registration'} className="btn-profile">
              <div className="user-icon">
                <img src={userIcon} alt="user-icon" />
              </div>
              <button className="nav__profile-btn button-primary">
                Sign up
              </button>
            </Link> */}
            {/* <div className="user-icon">
                <img src={userIcon} alt="user-icon" />
              </div> */}
            <button
              className="nav__profile-btn button-primary"
              onClick={() => setShowLogin((prev) => !prev)}
            >
              Sign Up
            </button>
            <Link to={'/cart'}>
              <div className="nav__cart cart">
                <img src={cartIcon} alt="cart-icon" className="cart__icon" />
                <div className="cart__quantity">2</div>
              </div>
            </Link>
            <BurgerMenu setShowLogin={setShowLogin} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
