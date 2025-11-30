import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeroSlider.css';
import '../../index.css'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import {
  threeDtruct,
  threeDbike,
  img10,
  img13,
  img16,
  img17,
  img18,
  img1,
  img3,
  img5,
  img6,
  img7,
} from '../assets';

import peanutButter from '../assets/peanutButter.jpg';
import butcher from '../assets/butcher.jpg';
import treynet from '../assets/treynet.jpg';
import blueCorner from '../assets/blueCorner.jpg';
import ddk from '../assets/ddk.jpg';
import restaurant from '../assets/restaurant.jpg';

function HeroSlider() {
  return (
    <div id="home" className="swiper_container">
      <h1 className="section-title science-gothic2">
        OUR WORK CATALOGUE
      </h1>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="hero-swiper"
      >
        {[
          restaurant,
          threeDtruct,
          threeDbike,
          peanutButter,
          butcher,
          treynet,
          blueCorner,
          ddk,
          img10,
          img13,
          img16,
          img17,
          img18,
          img1,
          img3,
          img5,
          img6,
          img7
        ].map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="swiper-slide-custom"
          >
            {item.endsWith('.mp4') ||
            item === threeDtruct ||
            item === threeDbike ? (
              <video src={item} autoPlay loop muted className="slide-media" />
            ) : (
              <img src={item} alt={`slide_${idx}`} className="slide-media" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;
