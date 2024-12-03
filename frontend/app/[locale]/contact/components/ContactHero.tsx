import Image from "next/image";
import React from "react";
import ContactForMe from "./ContactForMe";
import Motion from "@/components/motion";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("ContactHero");
  return (
    <div className="bg-red-600 w-full flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-5 py-24 md:py-0 items-center justify-center h-full mx-auto">
        <Motion
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex-1 px-10 md:px-6 lg:px-0"
        >
          <Image
            alt=""
            src={"/images/contactHero.png"}
            width={2000}
            height={2000}
            className="object-contain"
          />
        </Motion>
        <div className="flex-1 md:p-16 p-8 rounded-lg bg-gradient-to-r from-transparent  to-white">
          <h1 className="font-bold text-4xl mb-6">{t("text")}</h1>
          <Motion
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ContactForMe />
          </Motion>
        </div>
      </div>
    </div>
  );
}
