import './Values.scss';
import './Value.scss';

import value01 from './value01.svg';
import value02 from './value02.svg';
import value03 from './value03.svg';
import value04 from './value04.svg';

const valuesData = [
  {
    image: value01,
    title: 'Free Shipping',
    description: 'Order above $200',
  },
  {
    image: value02,
    title: 'Money-back',
    description: '30 days guarantee',
  },
  {
    image: value03,
    title: 'Secure Payments',
    description: 'Secured by Stripe',
  },
  {
    image: value04,
    title: '24/7 Support',
    description: 'Phone and Email support',
  },
];

const ValueCard = ({ image, title, description }) => (
  <div className="value">
    <img className="value__image" src={image} alt={image} />
    <h4 className="value__title">{title}</h4>
    <p className="value__description">{description}</p>
  </div>
);

const Values = ({ additionalClass = '' }) => {
  return (
    <section className={`values${additionalClass}`}>
      <div className="container">
        <div className="values__grid">
          {valuesData.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
