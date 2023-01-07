import React from "react";
import { Logo } from "../assets";
import { SearchBar } from "./SearchBar";

const NavBar = () => {
  return (
    <div className="pt-4 md:py-6 w-full flex justify-center xs:justify-between items-center">
      <div className=" hidden xs:flex justify-start items-start">
        <img src={Logo} className="w-[88px] h-[109px] object-contain" />
      </div>
      <SearchBar />
    </div>
  );
};

export default NavBar;
