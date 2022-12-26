import React from "react";
import axios from "axios";

const SearchList = ({ data, clicker, setCity }) => {
  var location = "";
  const getWeather = (event) => {
    location = event.target.innerText;
    setCity("");
    console.log(data.district, data.city, data.country);
    clicker(true);
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric`;
    const dummy = "";
    axios
      .get(URL)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div onClick={getWeather}>{data.address}</div>;
};

export default React.memo(SearchList);
