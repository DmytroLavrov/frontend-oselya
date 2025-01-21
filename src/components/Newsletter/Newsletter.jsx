import { MdOutlineEmail } from 'react-icons/md';

import './Newsletter.scss';
import './Form-newsletter.scss';

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter__content">
        <h2 className="newsletter__title title-1">Join Our Newsletter</h2>
        <p className="newsletter__description">
          Sign up for deals, new products and promotions
        </p>
        <form className="form-newsletter">
          <MdOutlineEmail alt="email-icon" className="form-newsletter__icon" />
          <input
            type="text"
            className="form-newsletter__input"
            placeholder="Email address"
          />
          <button className="form-newsletter__submit">Signup</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
