import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';

import { useUIContext } from '@context/UIContext';

import disableScroll from 'disable-scroll';

import cartIcon from '@assets/icons/cart/cart-icon.svg';
// import heartIcon from '@assets/icons/wishlist/heart.svg';
import userIcon from '@assets/icons/profile/user-placeholder.svg';
import { menuMap } from '@assets/assets';

import './Mobile-nav.scss';
import './Nav-icon.scss';
// import './Wishlist.scss';
import './Cart-icon.scss';

const BurgerMenu = ({ totalQuantity }) => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.user.data);
  const { setShowLogin, isBurgerClass, toggleBurgerClass, closeMenu } =
    useUIContext();

  const [menu, setMenu] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (isBurgerClass) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
        disableScroll.off();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isBurgerClass]);

  useEffect(() => {
    const currentMenu = Object.keys(menuMap).find((path) =>
      location.pathname.includes(path)
    );
    setMenu(currentMenu ? menuMap[currentMenu] : 'none');
  }, [location]);

  return (
    <>
      <button
        className={`mobile-nav-btn ${
          isBurgerClass ? 'mobile-nav-btn--active' : ''
        }`}
        onClick={toggleBurgerClass}
      >
        <div
          className={`nav-icon ${isBurgerClass ? 'nav-icon--active' : ''}`}
        ></div>
      </button>

      <div className={`mobile-nav ${isBurgerClass ? 'mobile-nav--open' : ''}`}>
        <ul className="mobile-nav__list">
          <li className={`mobile-nav__item${menu === 'home' ? ' active' : ''}`}>
            <Link className="nav__link" to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li className={`mobile-nav__item${menu === 'shop' ? ' active' : ''}`}>
            <Link className="nav__link" to="/shop" onClick={closeMenu}>
              Shop
            </Link>
          </li>

          <li
            className={`mobile-nav__item${menu === 'product' ? ' active' : ''}`}
          >
            <Link
              className="nav__link"
              to={
                localStorage.getItem('lastProduct')
                  ? `/product/${localStorage.getItem('lastProduct')}`
                  : '/shop'
              }
              onClick={closeMenu}
            >
              Product
            </Link>
          </li>

          <li
            className={`mobile-nav__item${
              menu === 'contact-us' ? ' active' : ''
            }`}
          >
            <Link className="nav__link" to="/contact-us" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="mobile-nav__buttons">
          <Link
            className="mobile-nav__btn"
            to={isAuth ? '/cart' : '#'}
            onClick={(e) => {
              if (!isAuth) {
                e.preventDefault();
                setShowLogin(true);
                closeMenu();
              } else {
                closeMenu();
              }
            }}
          >
            <span className="mobile-nav__btn-text">Cart</span>
            <div className="mobile-nav__btn-icons">
              <div className="cart-icon">
                <img
                  src={cartIcon}
                  alt="cart-icon"
                  className="cart-icon__icon"
                />
                <div className="cart-icon__quantity">{totalQuantity}</div>
              </div>
            </div>
          </Link>
          {/* <Link className="mobile-nav__btn" to="/wishlist" onClick={closeMenu}>
            <span className="mobile-nav__btn-text">Wishlist</span>
            <div className="mobile-nav__btn-icons">
              <div className="wishlist">
                <img
                  src={heartIcon}
                  alt="wishlist-icon"
                  className="wishlist__icon"
                />
                <div className="wishlist__quantity">2</div>
              </div>
            </div>
          </Link> */}
          {isAuth ? (
            <Link className="mobile-nav__btn" to="/account" onClick={closeMenu}>
              <span className="mobile-nav__btn-text">Account</span>
              <div className="mobile-nav__btn-icons">
                <div className="user">
                  <img
                    src={userData?.avatarUrl || userIcon}
                    alt="user-icon"
                    className="user__icon user-icon"
                  />
                </div>
              </div>
            </Link>
          ) : (
            <button
              className="button-primary"
              onClick={() => {
                closeMenu();
                setShowLogin((prev) => !prev);
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
