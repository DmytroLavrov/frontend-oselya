import { useNavigate } from 'react-router-dom';

import ArrowLink from '@components/ArrowLink/ArrowLink';

import './Categories.scss';
import './Plate.scss';

const categoriesData = [
  { title: 'Living Room', bgClass: 'plate--01', tall: true },
  { title: 'Bedroom', bgClass: 'plate--02' },
  { title: 'Kitchen', bgClass: 'plate--03' },
];

const CategoryCard = ({ title, bgClass, tall }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop');
  };

  return (
    <div
      className={`categories__plate plate ${bgClass} ${
        tall ? 'plate--tall' : ''
      }`}
      onClick={handleClick}
    >
      <div className="plate__content">
        <h3 className="plate__title">{title}</h3>
        <ArrowLink>Shop Now</ArrowLink>{' '}
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <section className="categories">
      <div className="container">
        <div className="categories__grid">
          {categoriesData.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
