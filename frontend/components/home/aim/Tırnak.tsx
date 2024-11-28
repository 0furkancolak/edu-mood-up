import Image from "next/image";
import React from "react";

export default function Tırnak({ children }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full justify-start">
        <Image
          alt=""
          src="/images/tırnak.png"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
      <div>{children}</div>
      <div className="flex w-full justify-end">
        <Image
          alt=""
          src="/images/tırnak.png"
          width={36}
          height={36}
          className="object-contain rotate-180"
        />
      </div>
    </div>
  );
}
