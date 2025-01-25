import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';

import disableScroll from 'disable-scroll';

import cartIcon from './cart.svg';
import heartIcon from '@assets/images/wishlist/heart.svg';
import userIcon from './user-circle.svg';

import './Mobile-nav.scss';
import './Nav-icon.scss';
import './Wishlist.scss';
import './Cart-icon.scss';

const BurgerMenu = ({ setShowLogin }) => {
  const isAuth = useSelector(selectIsAuth);

  const [isBurgerClass, setIsBurgerClass] = useState(false);

  const toggleBurgerClass = () => {
    setIsBurgerClass((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsBurgerClass(false);
  };

  useEffect(() => {
    if (isBurgerClass) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsBurgerClass(false);
        disableScroll.off();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isBurgerClass]);

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
          {['Home', 'Shop', 'Product', 'Contact Us'].map((item, index) => (
            <li key={index} className="mobile-nav__item">
              <Link
                className="nav__link"
                to={
                  item === 'Home'
                    ? '/'
                    : item === 'Product'
                    ? '/shop/product'
                    : `/${item.toLowerCase().replace(' ', '-')}`
                }
                onClick={closeMenu}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav__buttons">
          <Link className="mobile-nav__btn" to="/cart" onClick={closeMenu}>
            <span className="mobile-nav__btn-text">Cart</span>
            <div className="mobile-nav__btn-icons">
              <div className="cart-icon">
                <img
                  src={cartIcon}
                  alt="cart-icon"
                  className="cart-icon__icon"
                />
                <div className="cart-icon__quantity">2</div>
              </div>
            </div>
          </Link>
          <Link className="mobile-nav__btn" to="/wishlist" onClick={closeMenu}>
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
          </Link>
          {isAuth ? (
            <Link className="mobile-nav__btn" to="/profile" onClick={closeMenu}>
              <span className="mobile-nav__btn-text">Profile</span>
              <div className="mobile-nav__btn-icons">
                <div className="user">
                  <img src={userIcon} alt="user-icon" className="user__icon" />
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
