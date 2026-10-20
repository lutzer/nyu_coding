import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";

export default function App() {
  return (
    <div className="viewer">
      <Canvas camera={{ position: [2, 2, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
          <Edges color="black" />
        </mesh>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}
