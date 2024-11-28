"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function CarouselHW() {
  const t = useTranslations("CarouselHW");
  const hw = [
    {
      id: 1,
      title: t("universite"),
      text: t("nasıluni"),
      imgUrl: "/images/howWork/3.png",
    },
    {
      id: 2,
      title: t("ogretmen"),
      text: t("nasılogretmen"),
      imgUrl: "/images/howWork/4.png",
    },
    {
      id: 3,
      title: t("ogrenci"),
      text: t("nasılogrenci"),
      imgUrl: "/images/howWork/1.png",
    },
  ];
  return (
    <div>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper md:h-96 bg-white w-full rounded-xl flex justify-center items-center md:p-10"
      >
        {hw.map((h) => (
          <SwiperSlide key={h.id} className="md:px-16 py-4">
            <div className="flex flex-col-reverse md:flex-row px-12 md:px-0 py-3 md:py-0 items-center w-full">
              <div className="md:w-[50%] h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{h.title}</h3>
                <p>{h.text}</p>
              </div>
              <div className="relative w-[50%] h-48  md:h-96">
                <Image
                  alt=""
                  src={h.imgUrl}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
