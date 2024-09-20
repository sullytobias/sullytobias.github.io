import { useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import TypingText from "./components/TypingText/TypingText";
import LightButton from "./components/LightButton/LightButton";
import GroupCard from "./components/GroupCard/GroupCard";
import SpotLight from "./components/Lights/Spotlight/Spotlight";
import Space from "./components/Space/Space";

import { CATEGORIES, LOADING_TEXT } from "./utils/constants";

const App: FC = () => {
    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [lightOn, setLightOn] = useState(false);
    const [enteringSphere, setEnteringSphere] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
    const [interactionDisabled, setInteractionDisabled] = useState(false);
    const [spaceLoaded, setSpaceLoaded] = useState(false);

    const { opacity } = useSpring({
        opacity: isLoaderVisible ? 1 : 0,
        config: { duration: 2000 },
    });

    const { intensity } = useSpring({
        intensity: lightOn ? 100 : 0,
        config: { duration: 1000 },
    });

    const [{ spaceOpacity }, setSpaceOpacity] = useSpring(() => ({
        spaceOpacity: 0,
        config: { duration: 1000 },
        onRest: () => {
            if (spaceOpacity.get() === 1) setSpaceLoaded(true);
        },
    }));

    const { opacity: contentSpaceOpacity } = useSpring({
        opacity: spaceLoaded ? 1 : 0,
        config: { duration: 2000 },
    });

    const handleTextComplete = () => setShowButton(true);
    const handleButtonClick = () => setLightOn(true);

    const handleCardClick = (index: number) => {
        setActiveCardIndex(index);
        setEnteringSphere(true);

        if (!interactionDisabled) {
            setInteractionDisabled(true);
            setSpaceOpacity({ spaceOpacity: 1 });
        }
    };

    const handleCrossClick = () => {
        setEnteringSphere(false);
        setActiveCardIndex(-1);
        setSpaceLoaded(false);
        setSpaceOpacity({ spaceOpacity: 0 });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!enteringSphere && activeCardIndex === -1) {
            setInteractionDisabled(false);
        }
    }, [enteringSphere, activeCardIndex]);

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
                <SpotLight intensity={intensity} />

                <FloatingText overridedOpacity={opacity} text={loadingText} />

                <Space
                    textOpacity={contentSpaceOpacity}
                    opacity={spaceOpacity}
                    color={CATEGORIES[activeCardIndex]?.cardColor}
                    activeCategory={CATEGORIES[activeCardIndex]?.categoryTitle}
                />

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
                            categories={CATEGORIES}
                            onCardClick={lightOn ? handleCardClick : undefined}
                            activeCardIndex={activeCardIndex}
                            interactionDisabled={interactionDisabled}
                        />
                    </>
                )}
            </Canvas>
            {isLoaderVisible && <Loader />}

            {enteringSphere && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        zIndex: 1000,
                        cursor: "pointer",
                        color: "white",
                        fontSize: "2rem",
                    }}
                    onClick={handleCrossClick}
                >
                    ✖
                </div>
            )}
        </div>
    );
};

export default App;