import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import TypingText from "./components/TypingText/TypingText";
import LightButton from "./components/LightButton/LightButton";

import { LOADING_TEXT } from "./utils/constants";
import { animated } from "@react-spring/three";

const App: React.FC = () => {
    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [lightOn, setLightOn] = useState(false);

    const { opacity } = useSpring({
        opacity: isLoaderVisible ? 1 : 0,
        config: { duration: 2000 },
    });

    const { intensity } = useSpring({
        intensity: lightOn ? 10 : 0.1,
        config: { duration: 10000 },
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleTextComplete = () => {
        setShowButton(true);
    };

    const handleButtonClick = () => {
        setLightOn(true);
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                backgroundColor: "black",
            }}
        >
            <Canvas camera={{ position: [0, 0, 10] }}>
                <animated.ambientLight intensity={intensity} />
                <FloatingText overridedOpacity={opacity} text={loadingText} />
                {!isLoaderVisible && (
                    <>
                        <TypingText
                            text="Hello, I'm a front-end developer passionate about creating stunning web experiences."
                            onComplete={handleTextComplete}
                        />
                        {showButton && (
                            <LightButton onClick={handleButtonClick} />
                        )}
                    </>
                )}
            </Canvas>
            {isLoaderVisible && <Loader />}
        </div>
    );
};

export default App;
