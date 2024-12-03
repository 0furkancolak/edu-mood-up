"use client";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import { useAuthContext } from "@/context/auth-provider";
import UserProfile from "./UserProfile";
import { useTranslations } from "next-intl";

export default function MobileNav({ links, scrolled }: any) {
  const t = useTranslations("Layout");
  const { user } = useAuthContext();
  return (
    <Sheet>

      <SheetTrigger className="md:hidden">
        <HiMenuAlt3 size={28} className="text-white" />
      </SheetTrigger>

      <SheetContent side="right" className="p-4 pt-14 flex flex-col gap-2">

        {links.map((link: any) => (
          <SheetClose key={link.id} asChild>
            <Link
              className="px-2 py-1.5 rounded-lg hover:bg-gray-200"
              href={link.url}
            >
              {link.name}
            </Link>
          </SheetClose>
        ))}

        <div className="fixed bottom-10 flex items-center justify-between gap-3 w-full max-w-56">
          <LanguageSwitcher />
          {user ? <UserProfile /> : <SheetClose asChild><Link href="/login">{t("login")}</Link></SheetClose>}
        </div>

      </SheetContent>
    </Sheet>
  );
}
