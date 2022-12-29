import React, { useContext, useEffect, useRef, useState } from "react";
import { PredictionContext } from "../App";
import Card from "./Card";
import { motion } from "framer-motion";

const Predictions = () => {
  const { prediction } = useContext(PredictionContext);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.offsetWidth - carousel.current.scrollWidth);
  }, []);

  return (
    <motion.div
      ref={carousel}
      className="mt-28 w-full mb-52 cursor-grab overflow-hidden"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: width }}
        className="flex space-x-8"
      >
        {prediction.map((item) => (
          <Card key={item.key} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Predictions);
