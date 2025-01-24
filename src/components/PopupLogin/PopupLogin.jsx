import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { signUp, signIn } from '@features/users/userSlice';

import { toast, ToastContainer } from 'react-toastify';

import './PopupLogin.scss';

import closeIcon from '@assets/icons/close.svg';

const PopupLogin = ({ setShowLogin }) => {
  const dispatch = useDispatch();

  const [currState, setCurrState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // const password = e.target.password;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const validateForm = () => {
    if (currState === 'Sign Up') {
      if (!formData.name || formData.name.length < 3) {
        toast.error('Name must be at least 3 characters long');
        return false;
      }
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please provide a valid email address');
      return false;
    }
    if (!formData.password || formData.password.length < 5) {
      toast.error('Password must be at least 5 characters long');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { name, email, password } = formData;
    const values =
      currState === 'Sign Up' ? { name, email, password } : { email, password };
    const action = currState === 'Sign Up' ? signUp(values) : signIn(values);
    const response = await dispatch(action);

    if (response.payload) {
      window.localStorage.setItem('token', response.payload.token);
      setShowLogin(false);
    } else {
      toast.error(
        currState === 'Sign Up' ? 'Registration failed!' : 'Login failed!'
      );
    }
  };

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
      <ToastContainer />
      <div className="popup-login__container">
        <div className="popup-login__modal">
          <div className="popup-login__header">
            <div className="popup-login__title title-1">
              <h2>{currState}</h2>
              <button
                onClick={() => setShowLogin((prev) => !prev)}
                className="popup-login__close"
              >
                <img src={closeIcon} alt="close-icon" />
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
            <form onSubmit={onSubmit} className="popup-login__form">
              {currState === 'Sign Up' ? (
                <>
                  <div className="popup-login__field">
                    <input
                      id="name"
                      name="name"
                      onChange={onChangeHandler}
                      value={formData.name}
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
                      onChange={onChangeHandler}
                      value={formData.email}
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
                      onChange={onChangeHandler}
                      value={formData.password}
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
                      onChange={onChangeHandler}
                      value={formData.email}
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
                      onChange={onChangeHandler}
                      value={formData.password}
                      type="password"
                      className="popup-login__input"
                      placeholder="Password"
                      required
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="popup-login__submit-btn button-primary"
              >
                {currState === 'Sign Up' ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupLogin;
