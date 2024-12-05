"use client";
import React, { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";
import Motion from "../../motion/index";
import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
import MobileNav from "./MobileNav";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAuthContext } from "@/context/auth-provider";
import LogoutDialog from "@/components/auth/LogoutDialog";
import UserProfile from "./UserProfile";
import FooNavProvider from "../provider/FooNavProvider";

const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
 
  const links = [
    {
      id: 1,
      name: t("home"),
      icon: "ml",
      url: `/`,
    },
    {
      id: 2,
      name: t("contact"),
      icon: "ml",
      url: `/contact`,
    },
    {
      id: 3,
      name: t("about"),
      icon: "ml",
      url: `/about`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FooNavProvider>
      <Motion
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        delay={0.2}
        className={`fixed top-0 flex inset-x-0 z-50 items-center justify-center `}
      >
        <div
          className={`${scrolled
            ? "rounded-2xl shadow-md m-3 py-4 w-[95%] md:w-[75%] bg-gray-800 "
            : "bg-transparent py-8 w-full container"
            } 
        transition-all duration-300 flex justify-between text-white items-center px-8 md:px-0`}
        >
          <Link
            href={`/`}
            className={`flex md:flex-1 md:justify-center font-bold text-4xl ${dancing.className}`}
          >
            EduMoodUp
          </Link>
          <nav
            className="md:flex hidden flex-1 justify-center gap-6"
            role="navigation"
            aria-label="main navigation"
          >
            {links.map((link) => (
              <Link
                className="hover:scale-105 transition-all duration-300 hover:ring-1 ring-white rounded-lg px-3 py-2 "
                key={link.id}
                href={link.url}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex-1 md:flex items-center gap-5 justify-center">
            {user ? (
              <UserProfile />
            ) : (
              <Link
                href={`/login`}
                className="hover:underline"
              >
                {t("login")}
              </Link>
            )}
            <LanguageSwitcher />
          </div>

          <MobileNav links={links} scrolled={scrolled} />
          <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </Motion>
    </FooNavProvider>
  );
}
