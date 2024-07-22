import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { useSpring } from "@react-spring/three";

import SpinningSphere from "./components/SpinningSphere/SpinningSphere";
import Loader from "./components/Loader/Loader";
import SphereWorld from "./components/SphereWorld/SphereWorld";
import FloatingText from "./components/FloatingText/FloatingText";
import { LOADING_TEXT } from "./utils/constants";

const App: React.FC = () => {
    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);

    const { opacity } = useSpring({
        opacity: isLoaderVisible ? 1 : 0,
        config: { duration: 2000 },
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[3, 3, 3]} />
                <SpinningSphere opacity={opacity} />
                <SphereWorld />
                <FloatingText text={loadingText} />
            </Canvas>
            {isLoaderVisible && <Loader />}
        </div>
    );
};

export default App;
