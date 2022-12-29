import React from "react";
import { getTemp } from "./Hero";

const Card = ({ item }) => {
  return (
    <div
      key={item.key}
      className="bg-darkPurple flex flex-col min-w-[350px] rounded-[30px] px-6 py-8 pr-12 select-none"
    >
      <p className="text-darkGrey font-satoshi font-medium text-2xl mt-1">
        {item.date}
      </p>
      <p className="text-darkGrey font-satoshi text-3xl font-bold capitalize mt-6">
        {item.condition}
      </p>
      <p className="text-offWhite font-satoshi font-normal mt-0.5 text-[80px] leading-none">
        {getTemp(item).temp.toFixed(1)}&deg;
      </p>
      <div className="flex justify-between items-center">
        <p className="text-offWhite font-satoshi font-medium text-xl mt-7">
          Real Feel {getTemp(item).feels_like.toFixed(1)}&deg;{" "}
        </p>
        <p className="text-offWhite font-satoshi font-medium text-xl mt-5">
          {getTemp(item).min.toFixed(1)}&deg; / {getTemp(item).max.toFixed(1)}
          &deg;
        </p>
      </div>
    </div>
  );
};

export default React.memo(Card);
