// src/App.tsx
import React from "react";

import { Canvas } from "@react-three/fiber";

import SpinningTriangle from "./components/SpinningTriangle/SpinningTriangle";
import Loader from "./components/Loader/Loader";
import SphereWorld from "./components/SphereWorld/SphereWorld";
import FloatingText from "./components/FloatingText/FloatingText";

const App: React.FC = () => {
    return (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[3, 3, 3]} />
                <SpinningTriangle />
                <SphereWorld />
                <FloatingText />
            </Canvas>
            <Loader />
        </div>
    );
};

export default App;
