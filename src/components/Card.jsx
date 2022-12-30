import React from "react";
import { getTemp } from "./Hero";

const Card = ({ item }) => {
  return (
    <div
      key={item.key}
      className="bg-darkPurple flex flex-col min-w-[230px] sm:min-w-[300px] rounded-xl sm:rounded-3xl md:rounded-[30px] px-4 py-6 sm:px-6 sm:py-8 select-none "
    >
      <p className="text-darkGrey font-satoshi font-medium text-base sm:text-xl">
        {item.date}
      </p>
      <p className="text-darkGrey font-satoshi text-xl sm:text-2xl font-bold capitalize mt-2 sm:mt-4 md:mt-6">
        {item.condition}
      </p>
      <p className="text-offWhite font-satoshi font-normal mt-0.5 text-[60px] ss:text-[70px] sm:text-[80px] leading-none">
        {getTemp(item).temp?.toFixed(1)}&deg;
      </p>
      <div className="flex justify-between items-center mt-2 sm:mt-4 md:mt-6">
        <p className="text-offWhite font-satoshi font-normal sm:font-medium text-sm sm:text-lg ">
          Real Feel {getTemp(item).feels_like?.toFixed(1)}&deg;{" "}
        </p>
        <p className="text-offWhite font-satoshi font-normal sm:font-medium text-sm sm:text-lg">
          {getTemp(item).min?.toFixed(1)}&deg; / {getTemp(item).max?.toFixed(1)}
          &deg;
        </p>
      </div>
    </div>
  );
};

export default React.memo(Card);
