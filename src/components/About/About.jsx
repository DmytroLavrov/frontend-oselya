import ArrowLink from '@components/ArrowLink/ArrowLink';

import './About.scss';

const About = () => {
  return (
    <section className="about">
      <div className="about__container container">
        <div className="about__background"></div>
        <div className="about__content">
          <div className="about__description">
            <h2 className="about__title title-1">About Us</h2>
            <p className="about__text">
              Oselya is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019. Our customer service is always prepared to support you
              24/7
            </p>
          </div>
          <div className="about__link">
            <ArrowLink href="/shop">Shop Now</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
