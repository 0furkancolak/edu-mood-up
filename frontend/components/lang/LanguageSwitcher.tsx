"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "tr" : "en";
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [localeChange, setLocaleChange] = useState(locale);

  const handleLocaleSwitch = () => {
    startTransition(() => {
      setLocaleChange(otherLocale);
    });
  };

  return (
    <>
      <Link
        className={`p-1 ${isPending ? "opacity-50" : ""} hover:underline`}
        href={pathname}
        locale={otherLocale}
        onClick={handleLocaleSwitch}
      >
        {t("switchLocale", { locale: otherLocale })}
      </Link>

      <AnimatePresence>
        {isPending && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="loader"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
