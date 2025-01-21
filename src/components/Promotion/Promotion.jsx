import { useState, useEffect } from 'react';
import ArrowLink from '@components/ArrowLink/ArrowLink';
import './Promotion.scss';

const Promotion = () => {
  const [isTabletView, setisTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setisTabletView(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="promotion">
      <div
        className={`promotion__container${
          isTabletView ? '' : ' container-left'
        }`}
      >
        <div className="promotion__background"></div>
        <div className="promotion__content">
          <div className="promotion__description">
            <p className="promotion__tagline">SALE UP TO 35% OFF</p>
            <h2 className="promotion__title title-1">
              HUNDREDS of New lower prices!
            </h2>
            <p className="promotion__text">
              It’s more affordable than ever to give every room in your home a
              stylish makeover
            </p>
          </div>
          <div className="promotion__link">
            <ArrowLink href="/shop">Shop Now</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
