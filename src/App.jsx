import React from "react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App w-full h-[100vh] overflow-hidden">
      <div className="px-6  sm:px-16 max-w-[1280px] flex justify-start mx-auto items-start">
        <NavBar />
      </div>
    </div>
  );
}

export default App;
