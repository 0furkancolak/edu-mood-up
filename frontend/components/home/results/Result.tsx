import React from "react";
import Motion from "../../motion";
import NumberCard from "./NumberCard";

export default function Result({ res }: any) {
  return (
    <Motion
      initial={{ opacity: 0, y: +100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.14 + res.id / 32 }}
      className="group"
    >
      <div className="w-72 h-80 rounded-xl shadow-lg bg-white flex flex-col gap-3 justify-center items-center group-hover:bg-gray-800 transition-all duration-300 group-hover:text-white ">
        <h2 className="font-bold text-3xl">{res.title}</h2>
        <div className="font-bold text-2xl px-4 py-3 rounded-lg bg-gray-800 text-white group-hover:text-black group-hover:bg-white duration-300 transition-all">
          <NumberCard number={res.count} />
        </div>
      </div>
    </Motion>
  );
}
