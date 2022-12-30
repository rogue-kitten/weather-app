import React, { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Predictions from "./components/Predictions";

const CurrentDataContext = React.createContext();
const PredictionContext = React.createContext();

function App() {
  const [current, setCurrent] = useState({});
  const [prediction, setPrediction] = useState([]);

  return (
    <div className="App w-full relative min-h-[1093px] overflow-hidden">
      <div className="px-6  sm:px-10 max-w-[1280px] flex flex-col justify-start mx-auto items-start">
        <CurrentDataContext.Provider value={{ current, setCurrent }}>
          <PredictionContext.Provider value={{ prediction, setPrediction }}>
            <NavBar />
            <Hero />
            {prediction.length === 0 ? null : <Predictions />}
          </PredictionContext.Provider>
        </CurrentDataContext.Provider>
        <div className="purple-gradient w-[628px] h-[628px] absolute bottom-[-50px] left-0" />
      </div>
    </div>
  );
}

export { CurrentDataContext };
export { PredictionContext };
export default App;
