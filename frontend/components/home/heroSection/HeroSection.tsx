import React from "react";
import RightHS from "./RightHS";
import LeftHS from "./LeftHS";
import AppLinks from "./AppLinks";
import Motion from "../../motion";

export default function HeroSection() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-60px)] md:h-screen relative bg-orange-500">
      <div className="flex flex-col md:flex-row justify-center md:justify-betwen items-center w-full h-[calc(100vh-70px)] md:h-screen mx-auto max-w-6xl">
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }} 
          className="flex w-[70%] md:w-[50%]"
        >
          <LeftHS />
        </Motion>
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85 }}
          className="flex md:w-[50%]"
        >
          <RightHS />
        </Motion>
      </div>
      <Motion
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.87 }}
        className="flex justify-center w-full"
      >
        <AppLinks />
      </Motion>
    </div>
  );
}
