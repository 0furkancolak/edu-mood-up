"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";

export default function NewDesingSlider({ vals }: any) {
  const swiperRef = useRef<any>(null);
  return (
    <div className="w-64 md:w-72">
      <Swiper
        ref={swiperRef}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onClick={() => {
          const swiperElement = swiperRef.current;
          if (swiperElement) {
            const swiper = (swiperElement as any).swiper ?? null;
            swiper?.slideNext();
          }
        }}
      >
        {vals?.map((val: any) => (
          <SwiperSlide
            key={val.id}
            className={`w-64 md:w-72 h-96 py-6 rounded-xl bg-white`}
          >
            <div
              className={`w-64 md:w-72 h-96 py-6 rounded-xl px-4 flex justify-center gap-2 flex-col`}
            >
              <h2 className="font-bold text-xl">{val.title}</h2>
              <p>{val.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
