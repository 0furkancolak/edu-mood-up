"use client";
import React from "react";
import Tırnak from "./Tırnak";
import Motion from "../../motion";

export default function SingleAim({ aim }: any) {
  return (
    <Motion
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + aim.id / 64 }}
      className={`
    ${aim.id % 2 == 0 ? "rounded-xl" : "rounded-lg"}
      p-5 bg-white hover:bg-gray-800 transition-all hover:scale-105 hover:text-white shadow-lg`}
    >
      <Tırnak>
        <h3 className="text-xl font-bold">{aim.title}</h3>
        <p>{aim.description}</p>
      </Tırnak>
    </Motion>
  );
}
