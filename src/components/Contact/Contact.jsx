import './Contact.scss';
import './ContactInfo.scss';
import './ContactForm.scss';

import contact01 from './contact01.svg';
import contact02 from './contact02.svg';
import contact03 from './contact03.svg';

const contactDetails = [
  {
    icon: contact01,
    title: 'ADDRESS',
    text: '123 Shevchenka Blvd, Kyiv, Ukraine',
    alt: 'contact01',
  },
  {
    icon: contact02,
    title: 'CONTACT US',
    text: '+84 234 567 890',
    alt: 'contact02',
  },
  {
    icon: contact03,
    title: 'EMAIL',
    text: 'oselya@oselya.com',
    alt: 'contact03',
  },
];

const ContactInfoItem = ({ icon, title, text, alt }) => (
  <div className="contact-info__plate">
    <div className="contact-info__content">
      <div className="contact-info__icon">
        <img src={icon} alt={alt} />
      </div>
      <h3 className="contact-info__title">{title}</h3>
      <div className="contact-info__text">{text}</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="contact__title title-1">Contact Us</h2>

        <div className="contact__info contact-info">
          <div className="contact-info__grid">
            {contactDetails.map(({ icon, title, text, alt }) => (
              <ContactInfoItem
                key={title}
                icon={icon}
                title={title}
                text={text}
                alt={alt}
              />
            ))}
          </div>
        </div>

        <div className="contact__form contact-form">
          <div className="contact-form__container">
            <form className="contact-form__content">
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-form__input"
                  placeholder="Your Name"
                  aria-label="Your Full Name"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-form__input"
                  placeholder="Your Email"
                  aria-label="Your Email Address"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="message" className="contact-form__label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-form__input contact-form__input--textarea"
                  placeholder="Your Message"
                  aria-label="Your Message"
                />
              </div>
              <button type="submit" className="contact-form__submit-btn">
                Send Message
              </button>
            </form>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.3642238122006!2d30.425145576057133!3d50.39704939120795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c96beabe629f%3A0x53f92a175b86c03a!2z0LLRg9C70LjRhtGPINCo0LXQstGH0LXQvdC60LAsIDEyMywg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1734130845556!5m2!1suk!2sua"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contact-form__map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
