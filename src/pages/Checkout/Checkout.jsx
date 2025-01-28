import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
// import { fetchProducts } from '@features/products/productSlice';
import { placeOrder } from '../../features/orders/orderSlice';
import { getUserCart } from '@features/cart/cartSlice';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import formatCurrency from '@utils/FormatCurrency';
import { calculateCartTotal } from '@utils/CartUtils';

// import { backendUrl } from '../../App';

import './Checkout.scss';

import checkIcon from '@assets/icons/check-icon.svg';
import stripeLogo from './stripe-logo.png';
import codIcon from './cod-icon.svg';

const Checkout = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const shippingMethod = localStorage.getItem('selectedShipping');
  const [methodPayment, setMethodPayment] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    country: '',
    city: '',
    zipCode: '',
  });
  const products = useSelector((state) => state.product.items);
  const cartData = useSelector((state) => state.cart.items?.cartData);

  const { subtotal, total } = calculateCartTotal(
    products,
    cartData,
    shippingMethod
  );

  useEffect(() => {
    if (!cartData || Object.keys(cartData).length === 0) {
      navigate('/cart'); // Якщо кошик порожній, перенаправити на сторінку cart
    }
  }, [cartData, navigate]);

  // const subtotal = products.reduce((total, product) => {
  //   if (cartData && product && cartData[product._id]) {
  //     return total + product.price * cartData[product._id];
  //   }
  //   return total;
  // }, 0);

  // const shippingCost = {
  //   Free: 0,
  //   Express: 1500,
  //   Worldwide: 3000,
  // }[shippingMethod]; // Dynamically set shipping cost based on selected method

  // const total = subtotal + shippingCost; // Add shipping cost to total

  const handleShippingChange = (e) => {
    setMethodPayment(e.target.value); // Оновлюємо стан на значення вибраної опції
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartData) {
        if (cartData[items] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );

          if (itemInfo) {
            itemInfo.quantity = cartData[items];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: total,
      };

      // const token = localStorage.getItem('token');

      switch (methodPayment) {
        case 'cod':
          // const response = await axios.post(
          //   backendUrl + '/orders/place',
          //   orderData,
          //   {
          //     headers: {
          //       // Authorization: `Bearer ${token}`,
          //       Authorization: token,
          //     },
          //   }
          // );

          // if (response.data.success) {
          //   // cartData = {};
          //   // cartData повинен стати пустим
          //   localStorage.removeItem('selectedShipping');
          //   dispatch(getUserCart());
          //   navigate('/');
          // } else {
          //   console.log('error');
          // }
          dispatch(placeOrder(orderData))
            .unwrap()
            .then(() => {
              localStorage.removeItem('selectedShipping');
              dispatch(getUserCart());
              navigate('/order-complete');
            })
            .catch((error) => {
              console.error('Order placement failed:', error);
            });
          break;
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (!isAuth & !window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  // useEffect(() => {
  //   if (!products || products.length === 0) {
  //     dispatch(fetchProducts());
  //   }
  // }, [products, dispatch]);

  // useEffect(() => {
  //   const fromCart = localStorage.getItem('fromCart');
  //   if (!fromCart) {
  //     navigate('/cart'); // Перенаправити назад на cart, якщо користувач не перейшов через cart
  //   }
  // }, []);

  return (
    <>
      <Breadcrumbs />
      <section className="checkout">
        <div className="container">
          <h2 className="checkout__title title-2">Check Out</h2>
          <div className="checkout__steps">
            <div className="checkout__step checkout__step--completed">
              <div className="checkout__step-circle">
                <img src={checkIcon} alt="check-icon" />
              </div>
              <div className="checkout__step-title">Shopping cart</div>
            </div>
            <div className="checkout__step checkout__step--active">
              <div className="checkout__step-circle">2</div>
              <div className="checkout__step-title">Checkout details</div>
            </div>
            <div className="checkout__step">
              <div className="checkout__step-circle">3</div>
              <div className="checkout__step-title">Order complete</div>
            </div>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="checkout__content">
              <div className="checkout__info">
                <div className="checkout__form">
                  <div className="checkout__section checkout__section--contact">
                    <h3 className="checkout__form-title">Contact Infomation</h3>
                    <div className="checkout__form-groups">
                      <div className="checkout__form-row">
                        <div className="checkout__form-group">
                          <label
                            htmlFor="firstName"
                            className="checkout__label"
                          >
                            First name
                          </label>
                          <input
                            className="checkout__input"
                            onChange={onChangeHandler}
                            name="firstName"
                            value={formData.firstName}
                            type="text"
                            id="firstName"
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div className="checkout__form-group">
                          <label htmlFor="lastName" className="checkout__label">
                            Last name
                          </label>
                          <input
                            className="checkout__input"
                            onChange={onChangeHandler}
                            name="lastName"
                            value={formData.lastName}
                            type="text"
                            id="lastName"
                            placeholder="Last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="checkout__form-group">
                        <label htmlFor="email" className="checkout__label">
                          Email address
                        </label>
                        <input
                          className="checkout__input"
                          onChange={onChangeHandler}
                          name="email"
                          value={formData.email}
                          type="email"
                          id="email"
                          placeholder="Email address"
                          required
                        />
                      </div>
                      <div className="checkout__form-group">
                        <label htmlFor="phone" className="checkout__label">
                          Phone number
                        </label>
                        <input
                          className="checkout__input"
                          // onChange={(e) => setName(e.target.value)}
                          // value={name}
                          type="number"
                          id="phone"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__section checkout__section--shipping">
                    <h3 className="checkout__form-title">Shipping Address</h3>
                    <div className="checkout__form-groups">
                      <div className="checkout__form-group">
                        <label htmlFor="street" className="checkout__label">
                          Street address
                        </label>
                        <input
                          className="checkout__input"
                          onChange={onChangeHandler}
                          name="street"
                          value={formData.street}
                          type="text"
                          id="street"
                          placeholder="Street street"
                          required
                        />
                      </div>
                      <div className="checkout__form-group">
                        <label htmlFor="country" className="checkout__label">
                          Country
                        </label>
                        <input
                          className="checkout__input"
                          onChange={onChangeHandler}
                          name="country"
                          value={formData.country}
                          type="text"
                          id="country"
                          placeholder="Country"
                          required
                        />
                      </div>
                      <div className="checkout__form-row">
                        <div className="checkout__form-group">
                          <label htmlFor="city" className="checkout__label">
                            City
                          </label>
                          <input
                            className="checkout__input"
                            onChange={onChangeHandler}
                            name="city"
                            value={formData.city}
                            type="text"
                            id="city"
                            placeholder="City"
                            required
                          />
                        </div>
                        <div className="checkout__form-group">
                          <label htmlFor="zipCode" className="checkout__label">
                            Zip code
                          </label>
                          <input
                            className="checkout__input"
                            onChange={onChangeHandler}
                            name="zipCode"
                            value={formData.zipCode}
                            type="number"
                            id="zipCode"
                            placeholder="Zip code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="checkout__section checkout__section--payment">
                    <h3 className="checkout__form-title">Payment method</h3>
                    <label className="checkout__payment-option checkout__payment-option--active">
                      <input
                        type="radio"
                        name="stripe"
                        value="stripe"
                        checked={methodPayment === 'stripe'}
                        onChange={handleShippingChange}
                        className="real-radio"
                      />
                      <span className="custom-radio"></span>
                      Stripe
                      <img
                        className="checkout__payment-icon"
                        src={stripeLogo}
                        alt="stripe-logo"
                      />
                    </label>
                    <label className="checkout__payment-option checkout__payment-option--active">
                      <input
                        type="radio"
                        name="cod"
                        value="cod"
                        checked={methodPayment === 'cod'}
                        onChange={handleShippingChange}
                        className="real-radio"
                      />
                      <span className="custom-radio"></span>
                      Cash of delivery
                      <img
                        className="checkout__payment-icon"
                        src={codIcon}
                        alt="cod-icon"
                      />
                    </label>
                  </div>
                </div>
                <div className="checkout__summary">
                  <h3 className="checkout__summary-title">Order summary</h3>
                  <div className="checkout__summary-fields">
                    <div className="checkout__field">
                      <h4 className="checkout__field-title">Shipping</h4>
                      <span className="checkout__field-amount">
                        {shippingMethod}
                      </span>
                    </div>
                    <div className="checkout__field">
                      <h4 className="checkout__field-title">Subtotal</h4>
                      <span className="checkout__field-amount" data-value="$">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="checkout__field">
                      <h4 className="checkout__field-title checkout__field-title--total">
                        Total
                      </h4>
                      <span
                        className="checkout__field-amount checkout__field-amount--total"
                        data-value="$"
                      >
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                // onClick={() => navigate('/orders')}
                className="checkout__btn-submit button-primary"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
