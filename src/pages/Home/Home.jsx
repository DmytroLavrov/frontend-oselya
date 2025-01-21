import Hero from '@components/Hero/Hero';
import Categories from '@components/Categories/Categories';
import Arrivals from '@components/Arrivals/Arrivals';
import Promotion from '@components/Promotion/Promotion';
import Values from '@components/Values/Values';
import Newsletter from '@components/Newsletter/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Arrivals />
      <Promotion />
      <Values />
      <Newsletter />
    </>
  );
};

export default Home;
