"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
import { Link } from "@/i18n/routing";

export default function MobileNav({ links, scrolled }: any) {
  const [active, setActive] = useState(false);
  const clickHandle = () => {
    setActive(!active);
  };
  return (
    <div className="flex md:hidden items-center justify-center gap-5">
      <div onClick={clickHandle} className="z-50">
        {active ? (
          <IoClose size={32} className="z-50 text-white" />
        ) : (
          <HiMenuAlt3 size={28} className="text-white" />
        )}
      </div>

      {active ? (
        <motion.div
          initial={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="z-40 absolute top-0 left-0 h-screen w-screen flex items-center justify-center flex-col bg-gray-800 "
        >
          <div
            onClick={clickHandle}
            className="flex flex-col gap-3 h-screen w-screen items-center justify-center "
          >
            {links.map((link: any) => (
              <Link
                className={`
                  font-bold text-2xl py-4 min-w-[50%] flex items-center justify-center rounded-lg shadow-sm shadow-white
                 
                  `}
                href={link.url}
                key={link.id}
              >
                {link.name}
              </Link>
            ))}
            <div className="fixed bottom-10 flex gap-3">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
