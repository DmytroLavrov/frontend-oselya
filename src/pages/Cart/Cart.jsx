import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { fetchProducts } from '@features/products/productSlice';
import { getUserCart } from '@features/cart/cartSlice';
import { updateCart } from '@features/cart/cartSlice';
import { removeFromCart } from '@features/cart/cartSlice';

import { useResponsive } from '@hooks/useResponsive';

import ArrowLink from '@components/ArrowLink/ArrowLink';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import formatCurrency from '@utils/FormatCurrency';
import { calculateCartTotal } from '@utils/CartUtils';

import './Cart.scss';

import iconRemove from '@assets/icons/actions/remove-icon.svg';
import minusIcon from '@assets/icons/quantity-controls/minus-icon.svg';
import addIcon from '@assets/icons/quantity-controls/add-icon.svg';

const Cart = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState(() => {
    return localStorage.getItem('selectedShipping') || 'Free';
  });
  const products = useSelector((state) => state.product.items);
  const cartData = useSelector((state) => state.cart.items?.cartData);

  const isCartEmpty = !cartData || Object.keys(cartData).length === 0;

  const { subtotal, total } = useMemo(() => {
    return calculateCartTotal(products, cartData, shippingMethod);
  }, [products, cartData, shippingMethod]);

  useEffect(() => {
    const savedShippingMethod = localStorage.getItem('selectedShipping');
    if (savedShippingMethod) {
      setShippingMethod(savedShippingMethod);
    } else {
      setShippingMethod('Free');
      localStorage.setItem('selectedShipping', shippingMethod);
    }

    dispatch(fetchProducts());
    dispatch(getUserCart());
  }, []);

  const handleUpdateQuantity = (itemId, quantity) => {
    if (isAuth && quantity > 0) {
      dispatch(updateCart({ itemId, quantity }));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    if (isAuth) {
      dispatch(removeFromCart({ itemId }));
    }
  };

  const handleShippingChange = (event) => {
    const selectedShipping = event.target.value;
    setShippingMethod(selectedShipping);

    localStorage.setItem('selectedShipping', selectedShipping);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const isSmallScreen = useResponsive(640);

  useEffect(() => {
    if (!isAuth && !window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Breadcrumbs />
      <section className="cart">
        <div className="container">
          {isCartEmpty ? (
            <div className="cart__empty">
              <h1 className="cart__empty-title">Your cart is empty 🛒</h1>
              <p className="cart__empty-message">
                No worries! Start adding some stylish furniture to fill up that
                space 😊
              </p>
              <ArrowLink href="/shop" className="cart__empty-link">
                Shop Now 🛍️
              </ArrowLink>
            </div>
          ) : (
            <>
              <h2 className="cart__title title-2">Cart</h2>
              <div className="cart__steps">
                <div className="cart__step cart__step--active">
                  <div className="cart__step-circle">1</div>
                  <div className="cart__step-title">Shopping cart</div>
                </div>
                <div className="cart__step">
                  <div className="cart__step-circle">2</div>
                  <div className="cart__step-title">Checkout details</div>
                </div>
                <div className="cart__step">
                  <div className="cart__step-circle">3</div>
                  <div className="cart__step-title">Order complete</div>
                </div>
              </div>
              <div className="cart__content">
                <div className="cart__table">
                  <div className="cart__header">
                    <div className="cart__header-left">
                      <span>Product</span>
                    </div>
                    <div className="cart__header-right">
                      <span>Quantity</span>
                      <span>Subtotal</span>
                    </div>
                  </div>

                  <div className="cart__list">
                    {products.map((product) => {
                      if (cartData && product && cartData[product._id] > 0) {
                        return !isSmallScreen ? (
                          <div className="cart__item" key={product._id}>
                            <div className="cart__item-left">
                              <div className="cart__item-info">
                                <div className="cart__item-picture">
                                  <img src={product.image} alt="item-image" />
                                </div>
                                <div className="cart__item-content">
                                  <h4
                                    className="cart__item-title"
                                    title={product.name}
                                  >
                                    {product.name}
                                  </h4>
                                  <div className="cart__item-price">
                                    Price:{' '}
                                    <span data-value="$">
                                      {formatCurrency(product.price)}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleRemoveFromCart(product._id)
                                    }
                                    className="cart__item-btn-remove"
                                  >
                                    <img src={iconRemove} alt="icon-remove" />
                                    <span>Remove</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="cart__item-right">
                              <div className="cart__item-quantity">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product._id,
                                      cartData[product._id] - 1
                                    )
                                  }
                                >
                                  <img src={minusIcon} alt="minus-icon" />
                                </button>
                                <span className="cart__item-count">
                                  {cartData[product._id]}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product._id,
                                      cartData[product._id] + 1
                                    )
                                  }
                                >
                                  <img src={addIcon} alt="add-icon" />
                                </button>
                              </div>
                              <span
                                className="cart__item-subtotal"
                                data-value="$"
                              >
                                {formatCurrency(
                                  product.price * cartData[product._id]
                                )}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="cart__item" key={product._id}>
                            <div className="cart__item-left">
                              <div className="cart__item-info">
                                <div className="cart__item-picture">
                                  <img src={product.image} alt="item-image" />
                                </div>
                                <div className="cart__item-content">
                                  <h4
                                    className="cart__item-title"
                                    title={product.name}
                                  >
                                    {product.name}
                                  </h4>
                                  <div className="cart__item-price">
                                    Price:{' '}
                                    <span data-value="$">{product.price}</span>
                                  </div>

                                  <div className="cart__item-quantity">
                                    <button
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          product._id,
                                          cartData[product._id] - 1
                                        )
                                      }
                                    >
                                      <img src={minusIcon} alt="minus-icon" />
                                    </button>
                                    <span className="cart__item-count">
                                      {cartData[product._id]}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          product._id,
                                          cartData[product._id] + 1
                                        )
                                      }
                                    >
                                      <img src={addIcon} alt="add-icon" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cart__item-right">
                              <span
                                className="cart__item-subtotal"
                                data-value="$"
                              >
                                {formatCurrency(
                                  product.price * cartData[product._id]
                                )}
                              </span>
                              <button
                                onClick={() =>
                                  handleRemoveFromCart(product._id)
                                }
                                className="cart__item-btn-remove"
                              >
                                <img src={iconRemove} alt="icon-remove" />
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                <div className="cart__summary">
                  <h3 className="cart__summary-title">Cart Summary</h3>
                  <div className="cart__shipping-method">
                    <label className="cart__shipping-option cart__shipping-option--active">
                      <input
                        type="radio"
                        name="shipping"
                        value="Free"
                        checked={shippingMethod === 'Free'}
                        onChange={handleShippingChange}
                        className="real-radio"
                      />
                      <span className="custom-radio"></span>
                      Free shipping
                      <span>$0.00</span>
                    </label>
                    <label className="cart__shipping-option">
                      <input
                        type="radio"
                        name="shipping"
                        value="Express"
                        checked={shippingMethod === 'Express'}
                        onChange={handleShippingChange}
                        className="real-radio"
                      />
                      <span className="custom-radio"></span>
                      Express shipping
                      <span>+$15.00</span>
                    </label>
                    <label className="cart__shipping-option">
                      <input
                        type="radio"
                        name="shipping"
                        value="Worldwide"
                        checked={shippingMethod === 'Worldwide'}
                        onChange={handleShippingChange}
                        className="real-radio"
                      />
                      <span className="custom-radio"></span>
                      Worldwide shipping
                      <span>+$30.00</span>
                    </label>
                  </div>
                  <div className="cart__summary-subtotal">
                    Subtotal:
                    <span data-value="$">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="cart__summary-total">
                    Total:
                    <strong data-value="$">{formatCurrency(total)}</strong>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="cart__checkout-btn button-primary"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
