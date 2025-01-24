import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@features/products/productSlice';

// import products from '@backend/products.json';

import ArrowLink from '@components/ArrowLink/ArrowLink';
import ProductCard from '@components/ProductCard/ProductCard';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Scrollbar } from 'swiper/modules';

import './Arrivals.scss';

const Arrivals = () => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector((state) => state.product);
  const [spaceBetween, setSpaceBetween] = useState(24);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpaceBetween(16);
        setIsMobile(true);
      } else {
        setSpaceBetween(24);
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const limitedProducts = items.sort((a, b) => b.id - a.id).slice(0, 6);

  const limitedProducts = [...items]
    .sort((a, b) => b._id.toString().localeCompare(a._id.toString()))
    .slice(0, 6);

  return (
    <section className="arrivals">
      <div className="container">
        <div className="arrivals__row">
          <h2 className="arrivals__title title-1">New Arrivals</h2>
          {!isMobile && <ArrowLink href="/shop">More Products</ArrowLink>}
        </div>
      </div>
      <div className="container-right">
        <div className="arrivals__slider">
          <Swiper
            // install Swiper modules
            modules={[Scrollbar]}
            spaceBetween={spaceBetween}
            slidesPerView={'auto'}
            scrollbar={{
              el: '.swiper-scrollbar',
              hide: false,
              draggable: true,
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {limitedProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-scrollbar"></div>
        </div>
        {isMobile && <ArrowLink href="/shop">More Products</ArrowLink>}
      </div>
    </section>
  );
};

export default Arrivals;
