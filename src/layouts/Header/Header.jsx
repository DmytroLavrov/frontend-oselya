import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
// import { getUserCart } from '@features/cart/cartSlice';

import { useLoginContext } from '@context/LoginContext';

import Logo from './logo.svg';
import BurgerMenu from '@components/BurgerMenu/BurgerMenu';
import searchIcon from './search.svg';
import userIcon from './user-circle.svg';
import cartIcon from './cart.svg';

import './Header.scss';
import './Nav.scss';

import styles from './Cart.module.scss';

const Header = ({ totalQuantity }) => {
  const { setShowLogin, isBurgerClass, closeMenu } = useLoginContext();
  const isAuth = useSelector(selectIsAuth);

  // const dispatch = useDispatch();
  // const cartData = useSelector((state) => state.cart.items?.cartData);

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

  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(getUserCart());
  //   }
  // }, [isAuth, dispatch]);

  // const totalQuantity = cartData
  //   ? Object.values(cartData).reduce((sum, quantity) => sum + quantity, 0)
  //   : 0;

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav nav">
          <div className="nav__logo logo">
            <Link to="/" onClick={isBurgerClass ? closeMenu : null}>
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

            {isAuth ? (
              <Link
                to="/profile"
                className="nav__icon-link nav__icon-link--profile"
              >
                <div className="user-icon">
                  <img src={userIcon} alt="user-icon" />
                </div>
              </Link>
            ) : (
              <button
                className="nav__profile-btn button-primary"
                onClick={() => setShowLogin((prev) => !prev)}
              >
                Sign Up
              </button>
            )}

            {isAuth ? (
              <Link
                to={'/cart'}
                className="nav__icon-link  nav__icon-link--cart"
              >
                <div className={`nav__cart ${styles.cart}`}>
                  <img
                    src={cartIcon}
                    alt="cart-icon"
                    className={styles.cart__icon}
                  />
                  <div className={styles.cart__quantity}>{totalQuantity}</div>
                </div>
              </Link>
            ) : (
              <div
                onClick={() => setShowLogin((prev) => !prev)}
                className={`nav__cart ${styles.cart}`}
              >
                <img
                  src={cartIcon}
                  alt="cart-icon"
                  className={styles.cart__icon}
                />
                <div className={styles.cart__quantity}>0</div>
              </div>
            )}

            {/* <BurgerMenu setShowLogin={setShowLogin} /> */}
            <BurgerMenu totalQuantity={totalQuantity} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
