import React from "react";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";
import Motion from "../../motion";
import { Link } from "@/i18n/routing";

export default function Member({ member }: any) {
  return (
    <Motion
      initial={{ opacity: 0, y: +100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.14 + member.id / 32 }}
      className="bg-white rounded-lg px-5 py-4 flex flex-col gap-3 items-center"
    >
      <div className="relative ">
        <Image
          alt=""
          src={member.img}
          width={150}
          height={150}
          className=" rounded-full"
        />
      </div>
      <div className="w-full">
        <h2 className="font-bold text-2xl text-center">{member.fullName}</h2>
        <p className="text-xs opacity-80 mb-3 ps-1 text-center">
          {member.role}
        </p>
        <Link
          target="_blank"
          className="font-bold text-white bg-zinc-800 transition-colors duration-300 hover:bg-sky-800 px-2 py-2 rounded-lg flex flex-1 items-center justify-center gap-3 "
          href={member.linkedin}
        >
          <BsLinkedin />
          Linkedin
        </Link>
      </div>
    </Motion>
  );
}
