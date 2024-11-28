import React from "react";
import Result from "./Result";
import { useTranslations } from "next-intl";
import Motion from "@/components/motion";

export default function Results() {
  const t = useTranslations("Results");
  const results = [
    {
      id: 1,
      title: t("okul"),
      count: 2,
    },
    {
      id: 2,
      title: t("öğrenci"),
      count: 16380,
    },
    {
      id: 3,
      title: t("öğretmen"),
      count: 369,
    },
    {
      id: 4,
      title: t("ders"),
      count: 5637,
    },
  ];
  return (
    <div className="w-full min-h-screen bg-cyan-600">
      <div className="min-h-screen flex flex-col items-center py-8 justify-center gap-6 mx-auto max-w-6xl lg:max-w-7xl w-full">
        <h1 className="font-bold text-5xl text-white mb-8">{t("nelerYaptık")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((res) => (
            <Result key={res.id} res={res} />
          ))}
        </div>
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className=" rounded-xl shadow-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 px-3 py-4"
        >
          <p className="font-bold text-xl px-3 lg:px-0">{t("psikolojiölçtük")}</p>
        </Motion>
      </div>
    </div>
  );
}
