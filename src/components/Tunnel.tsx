import * as THREE from "three";
import React, { useEffect } from "react";
import { ThreeElements } from "@react-three/fiber";
import { Link } from "react-router-dom";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  clock: THREE.Clock,
  tube: THREE.Mesh<any, THREE.MeshBasicMaterial>;

let raf = 0;

function init() {
  const assetPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/";

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  const envMap = new THREE.CubeTextureLoader()
    .setPath(`${assetPath}skybox1_`)
    .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
  scene.background = envMap;

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 70); //wide position
  camera.lookAt(0, 1.5, 0);

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 10, 6);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 20, 0),
    new THREE.Vector3(-30, 20, 0),
    new THREE.Vector3(-20, 0, 0),
    new THREE.Vector3(-15, 20, 20),
    new THREE.Vector3(10, 10, 10),
    new THREE.Vector3(-10, -10, -10),
    new THREE.Vector3(15, -20, -20),
    new THREE.Vector3(20, 0, 0),
    new THREE.Vector3(30, 20, 0),
    new THREE.Vector3(0, 20, 0),
  ]);

  const geometry = new THREE.TubeGeometry(curve as any, 100, 1.5, 10, true);
  const material = new THREE.MeshBasicMaterial({
    // color: "#3f7b9d",
    wireframe: true,
    side: THREE.DoubleSide,
  });
  tube = new THREE.Mesh(geometry, material);
  scene.add(tube);
  window.addEventListener("resize", resize, false);

  update();
}

function updateCamera() {
  const time = clock.getElapsedTime();
  const loopTimeSec = 20;
  const t = (time % loopTimeSec) / loopTimeSec;
  const t2 = ((time + 0.1) % loopTimeSec) / loopTimeSec;
  const pos = tube.geometry.parameters.path.getPoint(t);
  const pos2 = tube.geometry.parameters.path.getPoint(t2);
  camera.position.copy(pos);
  camera.lookAt(pos2);
}

function update() {
  raf = requestAnimationFrame(update);
  updateCamera();
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
const St3 = () => {
  useEffect(() => {
    init();
    return () => {
      window.cancelAnimationFrame(raf);
      scene.clear();
      scene.remove();
      clock.stop();
      renderer.clear();
      renderer.renderLists.dispose();
      renderer.dispose();
      camera.clear();
      camera.remove();
      tube.clear();
      tube.remove();
    };
  }, []);

  return (
    <>
      <div className="main-wrap">
        <div className="content__title-wrap">
          <span className="content__pretitle">WebGL</span>
          <h2 className="content__title">Nostalgia</h2>
          <Link className="content__link" to="/menu/st2">
            Enter
          </Link>
        </div>
      </div>
    </>
  );
};

export default St3;
