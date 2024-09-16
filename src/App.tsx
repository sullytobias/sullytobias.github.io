import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import TypingText from "./components/TypingText/TypingText";
import LightButton from "./components/LightButton/LightButton";
import GroupCard from "./components/GroupCard/GroupCard";
import CameraController from "./components/CameraController/CameraController";
import SpotLight from "./components/Lights/Spotlight/Spotlight";

import { CATEGORIES, LOADING_TEXT } from "./utils/constants";

const App: React.FC = () => {
    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [lightOn, setLightOn] = useState(false);
    const [enteringSphere, setEnteringSphere] = useState(false);
    const [targetPosition, setTargetPosition] = useState<
        [number, number, number]
    >([0, 0, 10]);

    const { opacity } = useSpring({
        opacity: isLoaderVisible ? 1 : 0,
        config: { duration: 2000 },
    });

    const { intensity } = useSpring({
        intensity: lightOn ? 100 : 0,
        config: { duration: 1000 },
    });

    const handleTextComplete = () => setShowButton(true);
    const handleButtonClick = () => setLightOn(true);

    const handleCardClick = (position: [number, number, number]) => {
        setTargetPosition(position);
        setEnteringSphere(true);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                backgroundColor: "#171717",
            }}
        >
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.2} />
                {!enteringSphere && <SpotLight intensity={intensity} />}
                <CameraController
                    enteringSphere={enteringSphere}
                    targetPosition={targetPosition}
                />
                <FloatingText overridedOpacity={opacity} text={loadingText} />
                {!isLoaderVisible && (
                    <>
                        {!lightOn && (
                            <TypingText
                                text="Hello, I'm a front-end developer passionate about creating stunning web experiences."
                                onComplete={handleTextComplete}
                            />
                        )}
                        {showButton && !lightOn && (
                            <LightButton onClick={handleButtonClick} />
                        )}
                        <GroupCard
                            lightOn={lightOn}
                            onCardClick={lightOn ? handleCardClick : undefined}
                            categories={CATEGORIES}
                        />
                    </>
                )}
            </Canvas>
            {isLoaderVisible && <Loader />}
        </div>
    );
};

export default App;
