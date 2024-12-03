"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const params = usePathname();
  const [admin, isAdmin] = useState(false);
  const t = useTranslations("Footer");

  useEffect(() => {
    const isAdminBool =
      params.split("/")[2] === "admin" || params.split("/")[2] === "university";
    if (isAdminBool) {
      isAdmin(true);
    } else {
      isAdmin(false);
    }
  }, [params]);

  const langParams = params.split("/")[1];

  const links = [
    {
      id: 1,
      name: t("ev"),
      icon: "ml",
      url: `/${langParams}`,
    },
    {
      id: 2,
      name: t("contact"),
      icon: "ml",
      url: `/${langParams}/contact`,
    },
    {
      id: 3,
      name: t("about"),
      icon: "ml",
      url: `/${langParams}/about`,
    },
  ];

  return (
    <div
      className={`${admin ? "hidden" : "flex"
        } w-full relative bg-gray-800 text-white md:h-80`}
    >
      <div className="flex md:flex-row flex-col-reverse pb-16 md:pb-0 px-8 py-8 md:py-0 gap-6 md:gap-0 md:px-0 w-full max-w-6xl mx-auto">
        <div className="flex-1 flex md:items-start justify-center flex-col gap-3">
          <Link
            href="/"
            className="flex flex-col gap-3 items-center justify-center"
          >
            <Image
              alt=""
              src={"/images/EduMoodUp.jpg"}
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="font-bold text-3xl">EduMoodUp</h2>
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center justify-center">
          {links?.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="hover:scale-105 hover:ring-1 ring-white px-3 py-2 rounded-lg transition-all duration-300 "
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 flex items-center flex-col gap-5 text-end justify-center">
          <Link href="/privacy-policy" className="hover:underline text-end"> {t('policies.privacyPolicy')} </Link>
          <Link href="/terms-of-service" className="hover:underline text-end"> {t('policies.termsOfService')} </Link>
          <Link target="_blank" href="https://github.com/0furkancolak/edu-mood-up" className="hover:underline text-end"> Github </Link>
        </div>
      </div>
      <div className="absolute bottom-2 right-0 left-0 mx-auto w-full flex justify-center opacity-75">
        <p>{t("copyright")} &copy;</p>
      </div>
    </div>
  );
}
