import React from "react";
import AboutSlider from "./AboutSlider.jsx";
import Motion from "@/components/motion";

export default function AboutEMU() {
  return (
    <div className="bg-violet-600 w-full h-screen">
      <div className="flex items-center justify-center h-full px-4">
        <Motion
          initial={{ opacity: 0, y: +100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85 }}
          className="max-w-6xl w-full relative mx-auto"
        >
          <AboutSlider />
        </Motion>
      </div>
    </div>
  );
}
