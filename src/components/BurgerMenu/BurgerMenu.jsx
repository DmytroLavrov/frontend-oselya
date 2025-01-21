import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import disableScroll from 'disable-scroll';

import cartIcon from './cart.svg';
import heartIcon from '@assets/images/wishlist/heart.svg';

import './Mobile-nav.scss';
import './Nav-icon.scss';
import './Wishlist.scss';

const BurgerMenu = ({ setShowLogin }) => {
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
              <div className="cart">
                <img src={cartIcon} alt="cart-icon" className="cart__icon" />
                <div className="cart__quantity">2</div>
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
          <button
            className="button-primary"
            onClick={() => {
              closeMenu();
              setShowLogin((prev) => !prev);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
