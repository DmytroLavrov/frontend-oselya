import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { getOrdersByUser } from '@features/orders/ordersSlice';

import ArrowLink from '@components/ArrowLink/ArrowLink';

import formatCurrency from '@utils/FormatCurrency';
import { useResponsive } from '@hooks/useResponsive';

import './Orders.scss';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const ordersData = useSelector((state) => state.orders.orderItems.orders);
  const isSmallScreen = useResponsive(640);

  useEffect(() => {
    if (isAuth || window.localStorage.getItem('token')) {
      dispatch(getOrdersByUser());
    } else {
      navigate('/');
    }
  }, [isAuth, navigate, dispatch]);

  const renderEmptyState = (
    <div className="orders__empty">
      <h1 className="orders__empty-title">You have no orders yet 📦</h1>
      <p className="orders__empty-message">
        Don't worry! Once you start ordering, your purchases will show up here
        😎
      </p>
      <ArrowLink href="/shop" className="orders__empty-link">
        Start Shopping 🛒
      </ArrowLink>
    </div>
  );

  return (
    <div className="account__orders orders">
      <h3 className="orders__title account-title-primary">Orders History</h3>
      <div className="orders__table">
        {!isSmallScreen ? (
          <>
            {ordersData?.length > 0 && (
              <div className="orders__header">
                <div className="orders__column">Order ID</div>
                <div className="orders__column">Date</div>
                <div className="orders__column">Status</div>
                <div className="orders__column">Price</div>
              </div>
            )}
            <div className="orders__body">
              {ordersData?.length > 0
                ? ordersData?.map((order) => {
                    const formattedDate = new Date(
                      order?.date
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    return (
                      <div key={order._id} className="orders__row">
                        <span className="orders__cell">{order?.date}</span>
                        <span className="orders__cell">{formattedDate}</span>
                        <span className="orders__cell">
                          {order?.status || 'N/A'}
                        </span>
                        <span className="orders__cell" data-value="$">
                          {formatCurrency(order?.amount) || 'N/A'}
                        </span>
                      </div>
                    );
                  })
                : renderEmptyState}
            </div>
          </>
        ) : (
          <>
            <div className="orders__list">
              {ordersData?.length > 0
                ? ordersData?.map((order) => {
                    const formattedDate = new Date(
                      order?.date
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    return (
                      <div key={order._id} className="orders__item">
                        <div className="orders__row">
                          <div className="orders__label">Order ID</div>
                          <div className="orders__value">{order?.date}</div>
                        </div>
                        <div className="orders__row">
                          <div className="orders__label">Date</div>
                          <div className="orders__value">{formattedDate}</div>
                        </div>
                        <div className="orders__row">
                          <div className="orders__label">Status</div>
                          <div className="orders__value">
                            {order?.status || 'N/A'}
                          </div>
                        </div>
                        <div className="orders__row">
                          <div className="orders__label">Price</div>
                          <div className="orders__value" data-value="$">
                            {formatCurrency(order?.amount) || 'N/A'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : renderEmptyState}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
