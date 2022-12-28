import React, { useContext } from "react";
import axios from "axios";
import { CurrentDataContext, PredictionContext } from "../App";
import { DateTime } from "luxon";

const SearchList = ({ data, clicker, setCity }) => {
  var location = "";
  if (data.isCity) location = `${data.city}, ${data.country}`;
  else location = `${data.district}, ${data.city}, ${data.country}`;

  const { setCurrent } = useContext(CurrentDataContext);
  const { setPrediction } = useContext(PredictionContext);

  const formatToDate = (secs, format = "cccc, dd LLL yyyy") =>
    DateTime.fromSeconds(secs).setZone(0).toFormat(format);

  const formatToTime = (secs, timezone, format = "HH:mm") =>
    DateTime.fromSeconds(secs).setZone(timezone).toFormat(format);

  const getWeather = () => {
    setCity("");
    clicker(true);
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric`;
    axios
      .get(URL)
      .then((resp) => {
        const timezone = resp.data.timezone;

        setCurrent({
          location: location,
          date: formatToDate(resp.data.daily[0].dt),
          time: formatToTime(resp.data.daily[0].dt, timezone),
          sunrise: formatToTime(resp.data.daily[0].sunrise, timezone),
          sunset: formatToTime(resp.data.daily[0].sunset, timezone),
          feels_like: resp.data.daily[0].feels_like,
          humidity: resp.data.daily[0].humidity,
          temp: resp.data.daily[0].temp,
          wind_speed: resp.data.daily[0].wind_speed,
          condition: resp.data.daily[0].weather[0].description,
        });

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
  };

  return (
    <div
      onClick={getWeather}
      className="px-2 py-2 text-offWhite font-satoshi text-[16px] rounded-md hover:bg-[#2e2945] w-[80%] overflow-hidden "
    >
      {data.address}
    </div>
  );
};

export default React.memo(SearchList);
