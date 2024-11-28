"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";

export default function AboutSlider() {
  const t = useTranslations("About");
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
        <SwiperSlide className="md:px-16">
          <div className="flex flex-col-reverse md:flex-row px-12 md:px-0 py-3 md:py-0 items-center w-full">
            <div className="md:w-[50%] h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{t("şöyleYapacağız")}</h3>
              <p>
                EduMoodUp`a katılan üniversiteler için, web sitesinde özel bir
                portal sunuyoruz. Bu portal, üniversitelerin fakültelerini,
                bölümlerini ve derslerini sisteme eklemelerine olanak tanır.
                Ayrıca, öğretmenlerini ve öğrencilerini buraya kaydedebilirler.
                Bu adımlar, üniversitelerin EduMoodUp`ı kolayca kullanmalarını
                sağlar.
              </p>
            </div>
            <div className="relative w-[50%] h-48  md:h-96">
              <Image
                alt=""
                src={"/images/EduMoodUp.jpg"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="md:px-16">
          <div className="flex flex-col-reverse md:flex-row px-12 md:px-0 py-3 md:py-0 items-center w-full">
            <div className="md:w-[50%] h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{t("şöyleYapacağız")}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dolor repellendus quisquam aliquid asperiores maxime impedit
                alias nobis nam sapiente velit tempora suscipit, natus ad atque
                minus labore eligendi laborum!
              </p>
            </div>
            <div className="relative w-[50%] h-48  md:h-96">
              <Image
                alt=""
                src={"/images/EduMoodUp.jpg"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="md:px-16">
          <div className="flex flex-col-reverse md:flex-row px-12 md:px-0 py-3 md:py-0  items-center w-full">
            <div className="md:w-[50%] h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{t("şöyleYapacağız")}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dolor repellendus quisquam aliquid asperiores maxime impedit
                alias nobis nam sapiente velit tempora suscipit, natus ad atque
                minus labore eligendi laborum!
              </p>
            </div>
            <div className="relative w-[50%] h-48  md:h-96">
              <Image
                alt=""
                src={"/images/EduMoodUp.jpg"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
