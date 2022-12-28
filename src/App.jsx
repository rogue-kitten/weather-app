import React, { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Predictions from "./components/Predictions";

const CurrentDataContext = React.createContext();
const PredictionContext = React.createContext();

function App() {
  const [current, setCurrent] = useState({});
  const [prediction, setPrediction] = useState([]);

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  return (
    <div className="App w-full min-h-[100vh] overflow-hidden">
      <div className="px-6  sm:px-10 max-w-[1280px] flex flex-col justify-start mx-auto items-start">
        <CurrentDataContext.Provider value={{ current, setCurrent }}>
          <PredictionContext.Provider value={{ prediction, setPrediction }}>
            <NavBar />
            {isEmpty(current) ? null : <Hero />}
            {prediction.length === 0 ? null : <Predictions />}
          </PredictionContext.Provider>
        </CurrentDataContext.Provider>
      </div>
    </div>
  );
}

export { CurrentDataContext };
export { PredictionContext };
export default App;
