"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";

export default function NewDesingSlider({ vals }: any) {
  return (
    <div className="w-[11rem] md:w-72">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {vals?.map((val: any) => {
          const color = val.bgColor;
          return (
            <SwiperSlide
              key={val.id}
              className={`w-[11rem] md:w-72 h-96 py-6 rounded-xl bg-white`}
            >
              <div
                className={`w-[11rem] md:w-72 h-96 py-6 rounded-xl px-4 flex justify-center gap-2 flex-col`}
              >
                <h2 className="font-bold text-xl">{val.title}</h2>
                <p>{val.description}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
