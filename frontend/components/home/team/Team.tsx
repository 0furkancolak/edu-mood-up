import React from "react";
import Member from "./Member";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations("Team");

  const team = [
    {
      id: 1,
      fullName: "Furkan Çolak",
      role: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/0furkancolak/",
      img: "/images/team/Furkan.png",
      social: false,
    },
    {
      id: 2,
      fullName: "Community",
      role: "Community",
      linkedin: "https://github.com/0furkancolak/edu-mood-up",
      img: "/images/community.png",
      social: true,
    },
  ];
  return (
    <div className="w-full min-h-screen bg-cyan-600">
      <div className="min-h-screen flex flex-col items-center py-8 justify-center gap-6 mx-auto max-w-6xl lg:max-w-7xl w-full">
        <h1 className="font-bold text-5xl text-white mb-8">{t("title")}</h1>
        <div className="flex items-center justify-center gap-4">
          {team.map((t) => (
            <Member key={t.id} member={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
