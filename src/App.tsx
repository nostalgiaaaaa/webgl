import React from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import St1 from "components/St1";
import St2 from "components/St2";
// import St3 from "components/St3";
import St4 from "components/St4";
import WebGL from "webgl";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">lec1</Link>
        <Link to="/st2">lec2</Link>
        <Link to="/st3">lec3</Link>
        <Link to="/st4">lec4</Link>
      </div>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<WebGL></WebGL>} />
          <Route
            path="/st2"
            element={
              <Canvas>
                <ambientLight />
                <St2 position={[0, 0, 0]}></St2>
              </Canvas>
            }
          />
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
              <Canvas color="black">
                <St4></St4>
              </Canvas>
            }
          />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();
