import React, { useEffect, useState } from "react";
import { Search } from "../assets";
import SearchList from "./SearchList";
import axios from "axios";

const SearchBar = () => {
  const [city, setCity] = useState("London");
  const [searchResults, setSearchResults] = useState([]);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    if (city.length <= 4) setClicked(true);

    var config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&apiKey=48b2131fa3f942de8abc6e39cbb1528f`,
      headers: {},
    };

    if (city.length != 0) {
      setTimeout(() => {
        axios(config)
          .then((resp) => {
            setSearchResults(
              resp.data.features
                .filter((item, index) => index < 4)
                .map((query, index) => ({
                  key: index,
                  address: query.properties.formatted,
                  district: query.properties.address_line1,
                  city: query.properties.city,
                  country: query.properties.country,
                  lat: query.properties.lat,
                  lon: query.properties.lon,
                }))
            );
            setClicked(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    }
  }, [city]);

  return (
    <div className="w-[380px]">
      <div className="bg-black border border-[#344347] flex justify-center items-center w-full opacity-[.39] rounded-md px-2 py-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit opacity-100 flex-1 font-satoshi font-medium text-[20px] px-2 text-darkGrey rounded-md focus:border-none focus:outline-none"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <div className="flex justify-center items-center">
          <img src={Search} className="w-[20px] h-[20px]" />
        </div>
      </div>
      {searchResults.length != 0 && !clicked ? (
        <ul className="px-2 bg-black opacity-[.39] rounded-md border border-[#344347] py-1  w-full">
          {searchResults.map((res) => (
            <li key={res.key} className="cursor-pointer rounded-md w-full py-1">
              <SearchList
                data={res}
                clicker={setClicked}
                setCity={setCity}
              ></SearchList>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
