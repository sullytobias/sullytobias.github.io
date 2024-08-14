import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import Loader from "./assets/components/Loader/Loader";
import FloatingText from "./assets/components/FloatingText/FloatingText";
import TypingText from "./assets/components/TypingText/TypingText";
import LightButton from "./assets/components/LightButton/LightButton";

import { LOADING_TEXT } from "./utils/constants";
import { animated } from "@react-spring/three";
import GroupCard from "./assets/components/GroupCard/GroupCard";

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
        intensity: lightOn ? 100 : 0,
        config: { duration: 1000 },
    });

    const handleTextComplete = () => setShowButton(true);
    const handleButtonClick = () => setLightOn(true);

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
                <animated.spotLight
                    intensity={intensity}
                    position={[0, 7, 0]}
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
                        <GroupCard lightOn={lightOn} />
                    </>
                )}
            </Canvas>
            {isLoaderVisible && <Loader />}
        </div>
    );
};

export default App;
