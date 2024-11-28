"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslations } from "next-intl";

export default function RightHS() {
  const t = useTranslations("RightHS");
  return (
    <div className="flex flex-col gap-2 md:justify-end md:items-end justify-center items-center w-full text-white text-5xl md:text-6xl font-bold">
      <h1>EduMoodUp</h1>
      <div className="md:text-3xl text-xl underline text-transparent bg-clip-text bg-gradient-to-r from-indigo-950 from-10% via-sky-950 via-30% to-emerald-950 to-90%">
        <TypeAnimation
          sequence={[t("yeniNesilEğitim"), 2000, t("eğitimdePsikoloji"), 2000]}
          wrapper="span"
          speed={40}
          repeat={Infinity}
        />
      </div>
    </div>
  );
}
