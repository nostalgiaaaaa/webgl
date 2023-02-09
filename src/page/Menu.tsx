import React from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import St1 from "components/St1";
import St2 from "components/St2";
// import St3 from "components/St3";
import St4 from "components/St4";
import WebGL from "webgl";
import Tunnel from "components/Tunnel";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

function Menu() {
  return (
    <>
      <AppWrapper>
        <div
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Routes>
            {" "}
            <Route path="/" element={<Tunnel></Tunnel>} />
            <Route path="/st2" element={<WebGL></WebGL>} />
            <Route
              path="/st3"
              element={
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 15, 10]} />
                  <St1 position={[-2, 2, 0]} />
                  <St1 position={[0, 2, 0]} />
                  <St1 position={[2, 2, 0]} />
                  <St1 position={[-2, 0, 0]} />
                  <St1 position={[0, 0, 0]} />
                  <St1 position={[2, 0, 0]} />
                  <St1 position={[-2, -2, 0]} />
                  <St1 position={[0, -2, 0]} />
                  <St1 position={[2, -2, 0]} />
                </Canvas>
              }
            />
            <Route
              path="/st4"
              element={
                // <Canvas color="black">
                //   <St4></St4>
                // </Canvas>
                <Canvas>
                  <ambientLight />
                  <St2 position={[0, 0, 0]}></St2>
                </Canvas>
              }
            />
          </Routes>
        </div>

        <div className="menu-container">
          <div className="menu-wrap">
            <div>
              <Link to="/" className="menu">
                lec1
              </Link>
            </div>
            <div>
              {" "}
              <Link to="/menu/st2" className="menu">
                lec2
              </Link>
            </div>
            <div>
              {" "}
              <Link to="/menu/st3" className="menu">
                lec3
              </Link>
            </div>
            <div>
              {" "}
              <Link to="/menu/st4" className="menu">
                lec4
              </Link>
            </div>
          </div>
        </div>
      </AppWrapper>
    </>
  );
}

export default Menu;
