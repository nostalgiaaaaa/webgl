import React, { useEffect } from "react";
import init from "./Init";

const WebGL = () => {
  useEffect(() => {
    init("webgl");
  });

  return (
    <canvas
      id="webgl"
      width="400px"
      height="400"
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default WebGL;
