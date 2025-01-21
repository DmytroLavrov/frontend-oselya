import { useState, useEffect } from 'react';

import './PopupLogin.scss';

import closeIcon from '@assets/icons/close.svg';

const PopupLogin = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign Up');

  useEffect(() => {
    // Вимкнути скролінг при відкритті попапу
    document.body.style.overflow = 'hidden';

    return () => {
      // Увімкнути скролінг при закритті попапу
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="popup-login">
      <div className="popup-login__container">
        <div className="popup-login__modal">
          <div className="popup-login__header">
            <div className="popup-login__title title-1">
              <h2>{currState}</h2>
              <button className="popup-login__close">
                <img
                  src={closeIcon}
                  alt="close-icon"
                  onClick={() => setShowLogin((prev) => !prev)}
                />
              </button>
            </div>
            <div className="popup-login__text">
              {currState === 'Sign Up' ? (
                <p>
                  Already have an account?{' '}
                  <span onClick={() => setCurrState('Sign In')}>Sign in</span>
                </p>
              ) : (
                <p>
                  Don’t have an accout yet?{' '}
                  <span onClick={() => setCurrState('Sign Up')}>Sign Up</span>
                </p>
              )}
            </div>
          </div>
          <div className="popup-login__content">
            <form action="" className="popup-login__form">
              {currState === 'Sign Up' ? (
                <>
                  <div className="popup-login__field">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="popup-login__input"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="popup-login__field">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="popup-login__input"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="popup-login__field">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="popup-login__input"
                      placeholder="Password"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="popup-login__field">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="popup-login__input"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div className="popup-login__field">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="popup-login__input"
                      placeholder="Password"
                      required
                    />
                  </div>
                </>
              )}
            </form>
            <button
              type="submit"
              className="popup-login__submit-btn button-primary"
            >
              {currState === 'Sign Up' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupLogin;
