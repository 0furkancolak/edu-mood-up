import React from "react";
import NewDesingSlider from "./NewDesingSlider";
import Motion from "@/components/motion";
import { useTranslations } from "next-intl";

export default function AboutExtra() {
  const t = useTranslations("AboutExtra");
  const vals1 = [
    {
      id: 1,
      title: t("duygusalzeka"),
      description: t("duygusalzekatext"),
      bgColor: "008cff",
    },
    {
      id: 2,
      title: t("erisilebilirogrenim"),
      description: t("erisilebilirogrenimtext"),
      bgColor: "0ab86f",
    },
    {
      id: 3,
      title: t("isteesitlik"),
      description: t("isteesitliktext"),
      bgColor: "d37a07",
    },
    {
      id: 4,
      title: t("ishayatindaesitlik"),
      description: t("ishayatindaesitliktext"),
      bgColor: "76a30c",
    },
    {
      id: 5,
      title: t("geleceginisgucu"),
      description: t("geleceginisgucutext"),
      bgColor: "b40a2f",
    },
  ];
  const vals2 = [
    {
      id: 1,
      title: t("adilisdunyasi"),
      description: t("adilisdunyasietext"),
      bgColor: "008cff",
    },
    {
      id: 2,
      title: t("duygusalzekavekariyer"),
      description: t("duygusalzekavekariyeretext"),
      bgColor: "0ab86f",
    },
    {
      id: 3,
      title: t("degisimeuyum"),
      description: t("degisimeuyumtext"),
      bgColor: "d37a07",
    },
    {
      id: 4,
      title: t("cesitlilikteguc"),
      description: t("cesitliliktegucetext"),
      bgColor: "76a30c",
    },
    {
      id: 5,
      title: t("toplumsaladalet"),
      description: t("toplumsaladalettext"),
      bgColor: "b40a2f",
    },
  ];
  return (
    <div className="bg-lime-100 w-full md:h-screen min-h-screen p-5 md:p-0 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-evenly h-full">
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className=""
        >
          <NewDesingSlider vals={vals1} />
        </Motion>
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className=""
        >
          <NewDesingSlider vals={vals2} />
        </Motion>
      </div>
    </div>
  );
}
