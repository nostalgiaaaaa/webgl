import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { memo } from "react";

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref as any}
      position={[0, 0.5, 0]}
    >
      <boxGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref as any} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

const St2 = memo(() => {
  return (
    <>
      <OrbitControls />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </>
  );
});

export default St2;
