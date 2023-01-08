import { Switch } from "@headlessui/react";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { CurrentDataContext, PredictionContext, UnitContext } from "../App";
import { formatToDate, formatToTime } from "./SearchBar";

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
      }&exclude=current,minutely,hourly,alerts&appid=895284fb2d2c50a520ea537456963d9c&units=${
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

  useEffect(() => {
    function toggleUnit(e) {
      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setUnit((prev) => !prev);
      }
    }
    window.addEventListener("keydown", toggleUnit);
    return () => {
      window.removeEventListener("keydown", toggleUnit);
    };
  }, []);

  return (
    <Switch
      checked={unit}
      onChange={setUnit}
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#2e2945] "
    >
      <span className="sr-only">Enable notifications</span>
      <div
        className={`${
          unit ? "translate-x-6" : "translate-x-1"
        } flex justify-center items-center h-7 w-7 transform rounded-full bg-darkPurple font-satoshi font-medium text-offWhite transition`}
      >
        <span>&deg;{unit ? "C" : "F"}</span>
      </div>
    </Switch>
  );
};

export default Toggle;
