import React from "react";
import { Logo } from "../assets";
import SearchBar from "./SearchBar";
const NavBar = () => {
  return (
    <div className="py-6 w-full flex justify-between items-start">
      <div className="flex justify-start items-start">
        <img src={Logo} className="w-[88px] h-[109px] object-contain" />
      </div>
      <SearchBar />
    </div>
  );
};

export default NavBar;
