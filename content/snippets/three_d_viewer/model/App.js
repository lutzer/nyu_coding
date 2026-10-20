import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

const MODEL_URL =
  "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

export default function App() {
  return (
    <div className="viewer">
      <Canvas camera={{ position: [0, 1, 4] }}>
        <Suspense fallback={null}>
          <Stage>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
