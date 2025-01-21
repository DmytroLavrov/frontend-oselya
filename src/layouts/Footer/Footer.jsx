import { Link } from 'react-router-dom';

import Logo from './logo.svg';
import instagramIcon from './instagram.svg';
import facebookIcon from './facebook.svg';
import youtubeIcon from './youtube.svg';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          <div className="footer__title">
            <div className="footer__logo logo">
              <Link to="/">
                <img src={Logo} alt="logo" className="logo" />
              </Link>
            </div>
            <div className="footer__separator"></div>
            <div className="footer__slogan">Gift & Decoration Store</div>
          </div>
          <nav className="footer__nav">
            <ul className="footer__list">
              {['Home', 'Shop', 'About Us', 'Contact Us'].map((item, index) => (
                <li key={index} className="footer__item">
                  <Link
                    to={
                      item === 'Home'
                        ? '/'
                        : item === 'About Us'
                        ? '/contact-us'
                        : `/${item.toLowerCase().replace(' ', '-')}`
                    }
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <div className="footer__legal">
            <div className="footer__copyright">
              Copyright © 2024 Oselya. All rights reserved.
            </div>
            <div className="footer__links">
              <Link to="/contact-us">Privacy Policy</Link>
              <Link to="/contact-us">Terms of Use</Link>
            </div>
            {/* <div className="footer__language">
              <span>Language: </span>
              <a href="#" className="footer__link">
                English
              </a>
            </div> */}
          </div>
          <div className="footer__socials">
            {[
              { href: '/contact-us', icon: instagramIcon, alt: 'Instagram' },
              { href: '/contact-us', icon: facebookIcon, alt: 'Facebook' },
              { href: '/contact-us', icon: youtubeIcon, alt: 'YouTube' },
            ].map(({ href, icon, alt }, index) => (
              <Link
                key={index}
                to={href}
                aria-label={alt}
                className="footer__social-link"
              >
                <img src={icon} alt={alt} className="footer__social-icon" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
