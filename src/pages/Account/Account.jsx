import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { logout } from '@features/users/userSlice';
// import { getOrdersByUser } from '@features/orders/orderSlice';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import UpdateUserForm from '@components/UpdateUserForm/UpdateUserForm';
import AvatarUpload from '@components/AvatarUpload/AvatarUpload';
import Orders from '@components/Orders/Orders';
import UserReviews from '@components/UserReviews/UserReviews';

import './Account.scss';
import './Profile.scss';
import './Account-details.scss';

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.user.data);

  const isAccountPage = location.pathname === '/account';
  const isOrdersPage = location.pathname === '/account/orders';
  const isReviewsPage = location.pathname === '/account/reviews';
  // const isWishlistPage = location.pathname === '/account/wishlist';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!isAuth && !window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Breadcrumbs />
      <section className="account">
        <div className="container">
          <h2 className="account__title title-2">My account</h2>
          <div className="account__content">
            <aside className="account__sidebar">
              <div className="account__profile profile">
                <AvatarUpload />
                <div className="profile__info">
                  <h2 className="profile__login">{userData?.login || ''}</h2>
                </div>
              </div>
              <nav>
                <ul className="account__menu">
                  <li
                    onClick={() => navigate('/account')}
                    className={isAccountPage ? 'active' : ''}
                  >
                    Account
                  </li>
                  <li
                    onClick={() => navigate('/account/orders')}
                    className={isOrdersPage ? 'active' : ''}
                  >
                    Orders
                  </li>
                  <li
                    onClick={() => navigate('/account/reviews')}
                    className={isReviewsPage ? 'active' : ''}
                  >
                    My Reviews
                  </li>
                  <li onClick={handleLeave}>Log Out</li>
                </ul>
              </nav>
            </aside>
            <div className="account__main">
              {!isOrdersPage && !isReviewsPage && isAccountPage && (
                <div className="account__account-details account-details">
                  <div className="account-details__group">
                    <h3 className="account-details__title account-title-primary">
                      Account Details
                    </h3>
                    <div className="account-details__info">
                      <div className="account-details__item">
                        <span className="account-details__label">Login:</span>
                        <span className="account-details__value">
                          {userData?.login || ''}
                        </span>
                      </div>
                      <div className="account-details__item">
                        <span className="account-details__label">Email:</span>
                        <span className="account-details__value">
                          {userData?.email || ''}
                        </span>
                      </div>
                      <div className="account-details__item">
                        <span className="account-details__label">
                          Registered:
                        </span>
                        <span className="account-details__value">
                          {formatDate(userData?.createdAt) || ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details__group">
                    <h3 className="account-details__title account-title-primary">
                      Update Your Details
                    </h3>
                    <UpdateUserForm />
                  </div>
                </div>
              )}
              {isOrdersPage && <Orders />}
              {isReviewsPage && <UserReviews />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
