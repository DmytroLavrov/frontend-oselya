import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
// import { getOrdersByUser } from '@features/orders/orderSlice';
import { selectLatestOrder } from '@features/orders/orderSlice';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import formatCurrency from '@utils/FormatCurrency';

import './OrderComplete.scss';

import checkIcon from '@assets/icons/check-icon.svg';

const OrderComplete = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // const { orderItems } = useSelector((state) => state.order);

  const latestOrder = useSelector(selectLatestOrder);

  // if (!latestOrder) {
  //   return <p>Loading order details...</p>;
  // }

  const formattedDate = new Date(latestOrder?.date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  // console.log(orderItems);

  // useEffect(() => {
  //   dispatch(getOrdersByUser());
  // }, []);

  useEffect(() => {
    if (!isAuth & !window.localStorage.getItem('token')) {
      navigate('/');
    } else if (!latestOrder) {
      navigate('/'); // Якщо замовлення немає, перенаправляємо на головну
    }
  }, [isAuth, latestOrder, navigate]);

  if (!latestOrder) {
    return <p>Loading order details...</p>; // Показуємо повідомлення, якщо немає замовлення
  }

  return (
    <>
      <Breadcrumbs />
      <section className="order-complete">
        <div className="container">
          <h2 className="order-complete__title title-2">Complete!</h2>
          <div className="order-complete__steps">
            <div className="order-complete__step order-complete__step--completed">
              <div className="order-complete__step-circle">
                <img src={checkIcon} alt="check-icon" />
              </div>
              <div className="order-complete__step-title">Shopping cart</div>
            </div>
            <div className="order-complete__step order-complete__step--completed">
              <div className="order-complete__step-circle">
                <img src={checkIcon} alt="check-icon" />
              </div>
              <div className="order-complete__step-title">Checkout details</div>
            </div>
            <div className="order-complete__step order-complete__step--active">
              <div className="order-complete__step-circle ">3</div>
              <div className="order-complete__step-title">Order complete</div>
            </div>
          </div>
          <div className="order-complete__details">
            <div className="order-complete__details-header">
              <h4 className="order-complete__subtitle-details">
                Thank you! 🎉
              </h4>
              <h3 className="order-complete__title-details title-1">
                Your order has been received
              </h3>
            </div>
            <div className="order-complete__details-content">
              <div className="order-complete__details-item">
                <span className="order-complete__details-label">
                  Order code:
                </span>
                <span className="order-complete__details-value">
                  {latestOrder?.date}
                </span>
              </div>
              <div className="order-complete__details-item">
                <span className="order-complete__details-label">Date:</span>
                <span className="order-complete__details-value">
                  {formattedDate}
                </span>
              </div>
              <div className="order-complete__details-item">
                <span className="order-complete__details-label">Total:</span>
                <span className="order-complete__details-value" data-value="$">
                  {formatCurrency(latestOrder?.amount)}
                </span>
              </div>
            </div>
            <div className="order-complete__details-footer">
              <button
                onClick={() => navigate('/account/orders')}
                className="order-complete__details-button"
              >
                Purchase history
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderComplete;
