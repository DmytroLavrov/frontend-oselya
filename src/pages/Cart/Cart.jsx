import { useEffect, useState } from 'react';

import './Cart.scss';

import productImg from './product.jpg';
import iconRemove from './icon-remove.svg';
import minusIcon from '@assets/icons/minus-icon.svg';
import addIcon from '@assets/icons/add-icon.svg';
import { useResponsive } from '../../hooks/useResponsive';

const Cart = () => {
  const [shippingMethod, setShippingMethod] = useState('free');

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value); // Оновлюємо стан на значення вибраної опції
  };

  const isSmallScreen = useResponsive(640);

  const products = [
    {
      id: 1,
      name: 'Tray Table',
      color: 'Black',
      price: '19.00',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Tray Table',
      color: 'Red',
      price: '19.00',
      quantity: 2,
    },
    {
      id: 3,
      name: 'Table ssssssssssssslamp',
      color: 'Gold',
      price: '39000.00',
      quantity: 22,
    },
    // {
    //   id: 4,
    //   name: 'Table lamp',
    //   color: 'Gold',
    //   price: '39.00',
    //   quantity: 1,
    // },
    // {
    //   id: 5,
    //   name: 'Table lamp',
    //   color: 'Gold',
    //   price: '39.00',
    //   quantity: 1,
    // },
  ];

  return (
    <section className="cart">
      <div className="container">
        <h2 className="cart__title title-2">Cart</h2>
        <div className="cart__steps">
          <div className="cart__step cart__step--active">
            <span className="cart__step-circle">1</span> Shopping cart
          </div>
          <div className="cart__step">
            <span className="cart__step-circle">2</span> Checkout details
          </div>
          <div className="cart__step">
            <span className="cart__step-circle">3</span> Order complete
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
                {/* <span>Price</span> */}
                <span>Subtotal</span>
              </div>
            </div>
            {!isSmallScreen ? (
              <div className="cart__list">
                {products.map((product) => (
                  <div className="cart__item" key={product.id}>
                    <div className="cart__item-left">
                      <div className="cart__item-info">
                        <div className="cart__item-picture">
                          <img src={productImg} alt="item-image" />
                        </div>
                        <div className="cart__item-content">
                          <h4 className="cart__item-title" title={product.name}>
                            {product.name}
                          </h4>
                          <div className="cart__item-price">
                            Price: <span data-value="$">{product.price}</span>
                          </div>
                          <button className="cart__item-btn-remove">
                            <img src={iconRemove} alt="icon-remove" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart__item-right">
                      <div className="cart__item-quantity">
                        <button>
                          <img src={minusIcon} alt="minus-icon" />
                        </button>
                        <span className="cart__item-count">
                          {product.quantity}
                        </span>
                        <button>
                          <img src={addIcon} alt="add-icon" />
                        </button>
                      </div>
                      {/* <span className="cart__item-price" data-value="$">
                        {product.price}
                      </span> */}
                      <span className="cart__item-subtotal" data-value="$">
                        {product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cart__list">
                {products.map((product) => (
                  <div className="cart__item" key={product.id}>
                    <div className="cart__item-left">
                      <div className="cart__item-info">
                        <div className="cart__item-picture">
                          <img src={productImg} alt="item-image" />
                        </div>
                        <div className="cart__item-content">
                          <h4 className="cart__item-title" title={product.name}>
                            {product.name}
                          </h4>
                          <div className="cart__item-price">
                            Price: <span data-value="$">{product.price}</span>
                          </div>

                          <div className="cart__item-quantity">
                            <button>
                              <img src={minusIcon} alt="minus-icon" />
                            </button>
                            <span className="cart__item-count">
                              {product.quantity}
                            </span>
                            <button>
                              <img src={addIcon} alt="add-icon" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="cart__item-right">
                      <span className="cart__item-subtotal" data-value="$">
                        {product.price}
                      </span>
                      <button className="cart__item-btn-remove">
                        <img src={iconRemove} alt="icon-remove" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart__summary">
            <h3 className="cart__summary-title">Cart Summary</h3>
            <div className="cart__shipping-method">
              <label className="cart__shipping-option cart__shipping-option--active">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={shippingMethod === 'free'}
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
                  value="express"
                  checked={shippingMethod === 'express'}
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
                  value="international"
                  checked={shippingMethod === 'international'}
                  onChange={handleShippingChange}
                  className="real-radio"
                />
                <span className="custom-radio"></span>
                International shipping
                <span>+$30.00</span>
              </label>
            </div>
            <div className="cart__summary-subtotal">
              Subtotal:
              <span>$1234.00</span>
            </div>
            <div className="cart__summary-total">
              Total:
              <strong>$1345.00</strong>
            </div>
            <button className="cart__checkout-btn button-primary">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
