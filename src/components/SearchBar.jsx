import React, { useEffect, useState } from "react";
import { Search } from "../assets";
import SearchList from "./SearchList";
import axios from "axios";

const SearchBar = () => {
  const [city, setCity] = useState("London");
  const [searchResults, setSearchResults] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (city.length <= 2) setClicked(true);

    var config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&apiKey=48b2131fa3f942de8abc6e39cbb1528f`,
      headers: {},
    };

    if (city.length != 0) {
      axios(config)
        .then((resp) => {
          setSearchResults(
            resp.data.features
              .filter((_, index) => index < 4)
              .map((query, index) => ({
                key: index,
                address: query.properties.formatted,
                district: query.properties.address_line1,
                city: query.properties.city,
                country: query.properties.country,
                lat: query.properties.lat,
                lon: query.properties.lon,
                isCity: query.properties.result_type === "city" ? true : false,
              }))
          );
          setClicked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [city]);

  return (
    <div className="w-[250px] sm:w-[380px] z-[5]">
      <div className="bg-black relative border border-[#344347] flex justify-center items-center w-full opacity-[.39] rounded-md px-2 py-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit opacity-100 flex-1 font-satoshi font-medium text-base sm:text-lg px-2 text-darkGrey rounded-md focus:border-none focus:outline-none"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <div className="flex justify-center items-center">
          <img src={Search} className="min-w-[25px] min-h-[25px]" />
        </div>
      </div>
      {searchResults.length != 0 && !clicked ? (
        <ul className="glass border border-[#344347] px-2 absolute rounded-md py-1 mr-6 w-[250px] sm:min-w-[380px]">
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

export default React.memo(SearchBar);
