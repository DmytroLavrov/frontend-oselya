// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import ArrowLeft from '@assets/icons/arrow-left.svg?react';
import ArrowRight from '@assets/icons/arrow-right.svg?react';

import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__slider">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide>
              <div className="hero__image" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero__image" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero__image" />
            </SwiperSlide>

            <div className="swiper-button-prev">
              <ArrowLeft alt="arrow-left" />
            </div>
            <div className="swiper-button-next">
              <ArrowRight alt="arrow-right" />
            </div>
          </Swiper>
        </div>
        <div className="hero__content">
          <div className="hero__title">
            <p>
              Simply Unique<span>/</span>
            </p>
            <p>
              Simply Better<span>.</span>
            </p>
          </div>
          <div className="hero__description">
            <span>3legant</span> is a gift & decorations store based in HCMC,
            Vietnam. Est since 2019.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
