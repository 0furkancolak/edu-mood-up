import React from "react";
import Image from "next/image";

export default function LeftHS() {
  return (
    <div>
      <Image
        src={"/images/HeroImage.png"}
        width={2000}
        height={2000}
        alt="EduMoodUp Hero Section"
      />
    </div>
  );
}
