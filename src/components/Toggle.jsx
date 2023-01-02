import { React, useContext, useEffect } from "react";
import { CurrentDataContext, PredictionContext, UnitContext } from "../App";
import { formatToTime, formatToDate } from "./SearchList";
import axios from "axios";

const Toggle = () => {
  const { unit, setUnit } = useContext(UnitContext);
  const { current, setCurrent } = useContext(CurrentDataContext);
  const { setPrediction } = useContext(PredictionContext);

  useEffect(() => {
    if (JSON.stringify(current) != "{}") {
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${
        current.lat
      }&lon=${
        current.lon
      }&exclude=current,minutely,hourly,alerts&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=${
        unit ? "metric" : "imperial"
      }`;
      axios
        .get(URL)
        .then((resp) => {
          const timezone = resp.data.timezone;

          setCurrent((prev) => ({
            ...prev,
            date: formatToDate(resp.data.daily[0].dt),
            time: formatToTime(resp.data.daily[0].dt, timezone),
            sunrise: formatToTime(resp.data.daily[0].sunrise, timezone),
            sunset: formatToTime(resp.data.daily[0].sunset, timezone),
            feels_like: resp.data.daily[0].feels_like,
            humidity: resp.data.daily[0].humidity,
            temp: resp.data.daily[0].temp,
            wind_speed: resp.data.daily[0].wind_speed,
            condition: resp.data.daily[0].weather[0].description,
          }));

          setPrediction(
            resp.data.daily.slice(1).map((item, index) => ({
              key: index,
              date: formatToDate(item.dt),
              time: formatToTime(item.dt, timezone),
              temp: item.temp,
              feels_like: item.feels_like,
              condition: item.weather[0].description,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [unit]);
  return (
    <button
      className="w-12 h-7 rounded-full z-10 bg-darkGrey flex items-center focus:outline-none"
      onClick={() => setUnit((prev) => !prev)}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-500 transform bg-darkPurple ${
          unit ? "translate-x-6" : "-translate-x-2"
        } p-1 text-offWhite font-satoshi font-bold text-base sm:text-lg`}
      >
        &deg;{unit ? "C" : "F"}
      </div>
    </button>
  );
};

export default Toggle;
