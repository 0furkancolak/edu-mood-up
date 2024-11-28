"use client";
import React from "react";
import CarouselHW from "./CarouselHW";
import Motion from "../../motion";
import { useTranslations } from "next-intl";

export default function HowWork() {
  const t = useTranslations("HowWork");
  return (
    <div className="w-full min-h-screen bg-zinc-100 py-6 lg:py-0">
      <div className="min-h-screen flex px-5 md:px-0 flex-col items-center justify-center gap-6 mx-auto max-w-6xl w-full">
        <h1 className="font-bold text-5xl mb-8">{t("nasılYapacağız")}</h1>
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="w-full"
        >
          <CarouselHW />
        </Motion>
      </div>
    </div>
  );
}
