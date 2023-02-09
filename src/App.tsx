import React from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Menu from "page/Menu";
import Tunnel from "components/Tunnel";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

function App() {
  return (
    <BrowserRouter>
      {/* <AppWrapper> */}
      <Routes>
        <Route path="/" element={<Tunnel></Tunnel>} />
        <Route path="/menu/*" element={<Menu></Menu>} />
      </Routes>
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
