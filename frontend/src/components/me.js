import { dp } from "@/assets";
import Image from "next/image";
import React from "react";

const Me = () => {
  return (
    <div>
      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <Image src={dp} alt="Avatar" className="h-full w-full" />
        </div>
        <div className="text-sm font-semibold mt-2">Jack Sparrow</div>
        <div className="text-xs text-gray-500">Pirates with black pearl</div>
        {/* <div className="flex flex-row items-center mt-3">
          <div className="h-3 w-3 bg-green-500 rounded-full self-end mr-1"></div>
          <div className="leading-none ml-1 text-xs">Active</div>
        </div> */}
      </div>
    </div>
  );
};

export default Me;
