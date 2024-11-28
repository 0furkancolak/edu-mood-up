import React from "react";
import { FaAppStore } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

export default function AppLinks({ footer }: any) {
  return (
    <div
      className={`
      ${footer ? "md:flex-col" : ""}
      flex justify-center items-center gap-3 md:gap-6 mb-10 md:mb-8 flex-col md:flex-row
    `} 
    >
      <div
        className={`
        ${footer && "text-black hover:ring-2 ring-white"}
        rounded-lg flex items-center text-lg justify-center gap-2 hover:bg-gray-800 transition-all duration-300 hover:text-white bg-white px-4 py-3 w-60`}
      >
        <FaGooglePlay />
        For Android
      </div>
      <div
        className={`
        ${footer && "text-black hover:ring-2 ring-white"}
      rounded-lg flex items-center text-lg justify-center gap-2 hover:bg-gray-800 transition-all duration-300 hover:text-white bg-white px-4 py-3 w-60`}
      >
        <FaAppStore />
        For Iphone
      </div>
    </div>
  );
}
