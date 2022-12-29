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
    <div className="flex flex-col-reverse sm:flex-row py-2 md:py-6 w-full justify-between items-start sm:items-center">
      <div className=" flex flex-col justify-center items-start bg-darkPurple rounded-xl ss:rounded-2xl sm:rounded-3xl md:rounded-[35px] z-10 px-4 py-8 xs:p-8 mt-5 sm:mt-0 sm:pr-12">
        <p className="text-darkGrey font-satoshi font-bold text-2xl md:text-3xl">
          {current.location}
        </p>
        <p className="text-darkGrey font-satoshi font-medium text-lg sm:text-xl md:text-2xl mt-1">
          {current.date}
        </p>
        <div className="flex justify-center xs:justify-between space-x-14 ss:space-x-20 items-start mt-8">
          <div>
            <p className="text-darkGrey font-satoshi text-xl ss:text-2xl md:text-3xl font-bold capitalize">
              {current.condition}
            </p>
            <p className="text-offWhite font-satoshi font-medium text-[70px] ss:text-[80px] md:text-[100px] leading-none">
              {getTemp(current).temp.toFixed(1)}&deg;
            </p>
            <p className="text-offWhite font-satoshi font-medium text-base ss:text-lg md:text-xl mt-5">
              Real feel {getTemp(current).feels_like.toFixed(1)}&deg;
            </p>
            <p className="text-offWhite font-satoshi font-medium text-base ss:text-lg md:text-xl">
              {getTemp(current).min.toFixed(1)}&deg; /{" "}
              {getTemp(current).max.toFixed(1)}
              &deg;
            </p>
          </div>
          <div className="flex flex-col space-y-2 ss:space-y-4">
            {sideElements.map((element, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 xs:space-x-4"
              >
                <div className="flex justify-center -ml-8 sm:ml-0 items-center">
                  <img src={element.src} className="object-contain" />
                </div>
                <p className="text-offWhite font-satoshi font-medium text-base ss:text-lg md:text-xl">
                  {element.data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center ml-4 relative">
        <img
          src={House}
          className="object-contain w-[440px] h-[440px] md:mr-4 z-[2]"
        />
        <div className="purple-gradient w-[628px] h-[628px] rounded-full absolute z-[0] scale-75:scale-90 sm:scale-100 " />
      </div>
    </div>
  );
};

export default React.memo(Hero);
export { getTemp };
