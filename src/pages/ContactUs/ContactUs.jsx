import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import About from '@components/About/About';
import Values from '@components/Values/Values';

import styles from './ContactUs.module.scss';
import Contact from '@components/Contact/Contact';

const ContactUs = () => {
  return (
    <>
      <Breadcrumbs />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>
              We believe in sustainable decor. We’re passionate about life at
              home.
            </h1>
            <div className={styles.hero__text}>
              <p>
                Our features timeless furniture, with natural fabrics, curved
                lines, plenty of mirrors and classic design, which can be
                incorporated into any decor project. The pieces enchant for
                their sobriety, to last for generations, faithful to the shapes
                of each period, with a touch of the present
              </p>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Contact />
      <Values additionalClass=" contact-us-values" />
    </>
  );
};

export default ContactUs;
