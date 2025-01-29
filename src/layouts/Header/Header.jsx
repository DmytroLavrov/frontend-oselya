import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';

import { useUIContext } from '@context/UIContext';

import BurgerMenu from '@components/BurgerMenu/BurgerMenu';

import Logo from '@assets/logos/logo.svg';
import searchIcon from '@assets/icons/actions/search-icon.svg';
import userIcon from '@assets/icons/profile/user-placeholder.svg';
import cartIcon from '@assets/icons/cart/cart-icon.svg';
import { menuMap } from '@assets/assets';

import './Header.scss';
import './Nav.scss';
import styles from './Cart.module.scss';

const Header = ({ totalQuantity }) => {
  const { setShowLogin, isBurgerClass, closeMenu, setShowSearch } =
    useUIContext();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.user.data);

  const [menu, setMenu] = useState('home');
  const location = useLocation();

  const handleSearchIconClick = () => {
    setShowSearch(true);
    navigate('/shop');
  };

  useEffect(() => {
    const currentMenu = Object.keys(menuMap).find((path) =>
      location.pathname.includes(path)
    );
    setMenu(currentMenu ? menuMap[currentMenu] : 'none');
  }, [location]);

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
            <div
              onClick={handleSearchIconClick}
              className="nav__icon-link search-icon"
            >
              <img src={searchIcon} alt="search-icon" />
            </div>

            {isAuth ? (
              <Link
                to="/account"
                className="nav__icon-link nav__icon-link--account"
              >
                <div className="user-icon">
                  <img src={userData?.avatarUrl || userIcon} alt="user-icon" />
                </div>
              </Link>
            ) : (
              <button
                className="nav__account-btn button-primary"
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

            <BurgerMenu totalQuantity={totalQuantity} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
