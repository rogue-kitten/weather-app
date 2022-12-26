import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";

const Temp = () => {
  const [city, setCity] = useState("London");
  const [searchResults, setSearchResults] = useState([]);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
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
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="p-4"
      >
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="bg-stone-200 rounded-full px-3 py-1"
        />
      </form>
      {searchResults.length != 0 && !clicked ? (
        <ul className="px-4 space-y-3">
          {searchResults.map((res) => (
            <li key={res.key} className="cursor-pointer">
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

export default Temp;
