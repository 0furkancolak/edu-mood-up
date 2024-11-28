import Image from "next/image";
import React from "react";
import Motion from "@/components/motion";
import { useTranslations } from "next-intl";

export default function AboutHome({ bg }: any) {
  const t = useTranslations("AboutHome");
  return (
    <div className={`${bg ? bg : "bg-gray-100"} min-h-screen w-full`}>
      <div
        className={`${
          bg ? "py-24 md:py-0 px-4 md:px-0" : "p-8"
        }  min-h-screen flex flex-col items-center  md:p-0 justify-center gap-6 mx-auto max-w-6xl w-full `}
      >
        <h1
          className={`${
            bg ? "text-white hidden md:block" : "text-black"
          } text-5xl font-bold`}
        >
          {t("text")}
        </h1>
        <div className="flex flex-col-reverse md:flex-row gap-6">
          <Motion
            initial={{ opacity: 0, y: +100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-lg bg-white w-full md:w-[50%] px-5 md:px-10 py-10 min-h-unit-7xl "
          >
            <p>{t("description")}</p>
          </Motion>
          <Motion
            initial={{ opacity: 0, y: +100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-lg relative bg-white w-full md:w-[50%] px-5 md:px-6 py-4 min-h-unit-7xl "
          >
            <Image
              alt=""
              src={"/images/EduMoodUp.jpg"}
              fill
              className="object-contain"
            />
          </Motion>
        </div>
      </div>
    </div>
  );
}
