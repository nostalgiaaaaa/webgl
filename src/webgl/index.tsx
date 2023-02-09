import React, { useEffect } from "react";
import { init, clear } from "./Init";

const WebGL = () => {
  useEffect(() => {
    init("webgl");

    return () => {
      clear();
    };
  }, []);

  return (
    <canvas
      id="webgl"
      width={window.innerWidth / 3}
      height={window.innerWidth / 3}
    ></canvas>
  );
};

export default WebGL;
