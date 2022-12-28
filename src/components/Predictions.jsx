import React, { useContext } from "react";
import { PredictionContext } from "../App";
import Card from "./Card";

const Predictions = () => {
  const { prediction } = useContext(PredictionContext);
  console.log(prediction);
  return (
    <div className="flex space-x-8 mt-28">
      {prediction.map((item) => (
        <Card key={item.key} item={item} />
      ))}
    </div>
  );
};

export default Predictions;
