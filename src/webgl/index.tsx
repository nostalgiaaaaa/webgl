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
      width="1000px"
      height="1000px"
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default WebGL;
