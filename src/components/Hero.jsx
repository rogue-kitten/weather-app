import React, { useContext } from "react";
import { CurrentDataContext } from "../App";
import { House, sunrise, sunset, humidity, wind } from "../assets";

const getTemp = (current) => {
  const temp = { min: current.temp.min, max: current.temp.max };
  const time = parseInt(current.time);
  if (time <= 4)
    return {
      ...temp,
      temp: current.temp.night,
      feels_like: current.feels_like.night,
    };
  else if (time <= 11)
    return {
      ...temp,
      temp: current.temp.morning,
      feels_like: current.feels_like.morning,
    };
  else if (time <= 15)
    return {
      ...temp,
      temp: current.temp.day,
      feels_like: current.feels_like.day,
    };
  else if (time <= 19)
    return {
      ...temp,
      temp: current.temp.eve,
      feels_like: current.feels_like.eve,
    };
  else
    return {
      ...temp,
      temp: current.temp.night,
      feels_like: current.feels_like.night,
    };
};

const Hero = () => {
  const { current } = useContext(CurrentDataContext);

  const sideElements = [
    {
      src: sunrise,
      data: current.sunrise,
    },
    {
      src: sunset,
      data: current.sunset,
    },
    {
      src: humidity,
      data: `${current.humidity} %`,
    },
    {
      src: wind,
      data: `${current.wind_speed.toFixed(1)} kmph`,
    },
  ];

  return (
    <div className="flex py-6 w-full justify-between items-center">
      <div className=" flex flex-col justify-center items-start bg-darkPurple rounded-[40px] z-10 p-8 pr-12">
        <p className="text-darkGrey font-satoshi font-bold text-3xl">
          {current.location}
        </p>
        <p className="text-darkGrey font-satoshi font-medium text-2xl mt-1">
          {current.date}
        </p>
        <div className="flex justify-between space-x-20 items-start mt-8">
          <div>
            <p className="text-darkGrey font-satoshi text-3xl font-bold capitalize">
              {current.condition}
            </p>
            <p className="text-offWhite font-satoshi font-medium text-[100px] leading-none">
              {getTemp(current).temp.toFixed(1)}&deg;
            </p>
            <p className="text-offWhite font-satoshi font-medium text-xl mt-5">
              Real feel {getTemp(current).feels_like.toFixed(1)}&deg;
            </p>
            <p className="text-offWhite font-satoshi font-medium text-xl">
              {getTemp(current).min.toFixed(1)}&deg; /{" "}
              {getTemp(current).max.toFixed(1)}
              &deg;
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            {sideElements.map((element, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex justify-center items-center">
                  <img src={element.src} className="object-contain" />
                </div>
                <p className="text-offWhite font-satoshi font-medium text-xl">
                  {element.data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center relative">
        <img
          src={House}
          className="object-contain w-[440px] h-[440px] mr-4 z-[2]"
        />
        <div className="purple-gradient w-[628px] h-[628px] rounded-full absolute z-[0]" />
      </div>
    </div>
  );
};

export default React.memo(Hero);
export { getTemp };
