import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import './ShopGreeting.scss';

const ShopGreeting = () => {
  return (
    <section className="shop-greeting">
      <div className="container">
        <div className="shop-greeting__content">
          <Breadcrumbs isContainer={false} />
          <h2 className="shop-greeting__title">Shop Page</h2>
          <div className="shop-greeting__text">
            <p>Let’s design the place you always imagined.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopGreeting;
