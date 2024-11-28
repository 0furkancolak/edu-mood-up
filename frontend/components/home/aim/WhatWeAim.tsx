import React from "react";
import SingleAim from "./SingleAim";
import { useTranslations } from "next-intl";

export default function WhatWeAim() {
  const t = useTranslations("WhatWeAim");
  const aims = [
    {
      id: 1,
      title: t("education.text"),
      description: t("education.description"),
    },
    {
      id: 2,
      title: t("work.text"),
      description: t("work.description"),
    },
    {
      id: 3,
      title: t("life.text"),
      description: t("life.description"),
    },
    {
      id: 4,
      title: t("world.text"),
      description: t("world.description"),
    },
  ];
  return (
    <div className="w-full min-h-screen bg-emerald-500">
      <div className="min-h-screen flex py-10 md:py-0 px-5 md:px-0 flex-col items-center justify-center gap-6 mx-auto max-w-6xl w-full">
        <h1 className="font-bold text-5xl text-white mb-8">
          {t("neyiamaçlıyoruz")}?
        </h1>
        <div className="grid md:grid-cols-2 gap-4">
          {aims.map((aim) => (
            <SingleAim key={aim.id} aim={aim} />
          ))}
        </div>
      </div>
    </div>
  );
}
