import { useState, useEffect, FC, Fragment } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/web";
import { useMediaQuery } from "react-responsive";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import { Howl } from "howler";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import LightButton from "./components/LightButton/LightButton";
import GroupCard from "./components/GroupCard/GroupCard";
import SpotLight from "./components/Lights/Spotlight/Spotlight";
import Space from "./components/Space/Space";
import TypingText from "./components/TypingText/TypingText";

import { CATEGORIES, colorPalette, LOADING_TEXT } from "./utils/constants";
import { useSound } from "./context/SoundContext";

const App: FC = () => {
    const {
        isBackgroundPlaying,
        isFxPlaying,
        toggleBackgroundSound,
        toggleFxSound,
    } = useSound();

    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [lightOn, setLightOn] = useState(false);
    const [enteringSphere, setEnteringSphere] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
    const [interactionDisabled, setInteractionDisabled] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const ambientWindSound = new Howl({
            src: ["/sounds/background.mp3"],
            loop: true,
            volume: 0.03,
        });

        if (isBackgroundPlaying) ambientWindSound.play();
        else ambientWindSound.mute();

        return () => {
            ambientWindSound.stop();
        };
    }, [isBackgroundPlaying]);

    const { opacity } = useSpring({
        opacity: isLoaderVisible ? 1 : 0,
        config: { duration: 2000 },
    });

    const { intensity } = useSpring({
        intensity: lightOn ? 300 : 5,
        config: { duration: 1000 },
    });

    const [{ spaceOpacity }, setSpaceOpacity] = useSpring(() => ({
        spaceOpacity: 0,
        config: { duration: 1000 },
    }));

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        setInteractionDisabled(enteringSphere || activeCardIndex !== -1);
    }, [enteringSphere, activeCardIndex]);

    const handleTextComplete = () => setShowButton(true);
    const handleButtonClick = () => {
        const lightOnSound = new Howl({
            src: ["/sounds/lightOnClick.mp3"],
            volume: 0.3,
        });

        isFxPlaying && lightOnSound.play();

        setLightOn(true);
    };
    const handleCardClick = (index: number) => {
        const clickSound = new Howl({
            src: ["/sounds/categoryClick.mp3"],
            volume: 0.2,
        });

        isFxPlaying && clickSound.play();

        setActiveCardIndex(index);
        setEnteringSphere(true);
        if (!interactionDisabled) {
            setInteractionDisabled(true);
            setSpaceOpacity({ spaceOpacity: 1 });
        }
    };

    const handleCrossClick = () => {
        const crossClickSound = new Howl({
            src: ["/sounds/closeClick.mp3"],
            volume: 0.5,
        });

        isFxPlaying && crossClickSound.play();

        setEnteringSphere(false);
        setActiveCardIndex(-1);
        setSpaceOpacity({ spaceOpacity: 0 });
    };

    return (
        <animated.div
            style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                backgroundColor: colorPalette.black,
            }}
        >
            <button
                style={{
                    zIndex: 1,
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    backgroundColor: "transparent",
                    border: "none",
                }}
                onClick={toggleBackgroundSound}
            >
                {isBackgroundPlaying ? (
                    <FaPause color={colorPalette.lime} size={24} />
                ) : (
                    <FaPlay color={colorPalette.lime} size={24} />
                )}
            </button>

            <button
                style={{
                    zIndex: 1,
                    position: "fixed",
                    top: "20px",
                    left: "90px",
                    backgroundColor: "transparent",
                    border: "none",
                }}
                onClick={toggleFxSound}
            >
                {isFxPlaying ? (
                    <FaVolumeUp color={colorPalette.lime} size={24} />
                ) : (
                    <FaVolumeMute color={colorPalette.lime} size={24} />
                )}
            </button>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.3} />
                <SpotLight intensity={intensity} />
                <FloatingText overridedOpacity={opacity} text={loadingText} />
                <Space
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
                        top: "30px",
                        right: "30px",
                        zIndex: 1000,
                        cursor: "pointer",
                    }}
                    onClick={handleCrossClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={colorPalette.lime}
                        width={isMobile ? "1.5rem" : "2rem"}
                        height={isMobile ? "1.5rem" : "2rem"}
                    >
                        <path d="M19.3 5.71c-.39-.39-1.02-.39-1.41 0L12 11.59 6.11 5.71a.9959.9959 0 0 0-1.41 1.41l5.88 5.88-5.88 5.88a.9959.9959 0 1 0 1.41 1.41l5.88-5.88 5.88 5.88a.9959.9959 0 1 0 1.41-1.41L13.41 12l5.88-5.88c.39-.39.39-1.02 0-1.41z" />
                    </svg>
                </div>
            )}
            {activeCardIndex === 0 && (
                <Fragment>
                    <animated.div
                        style={{
                            color: colorPalette.silverLakeBlue,
                            position: "fixed",
                            top: "100px",
                            left: "20px",
                            borderRadius: "8px",
                            padding: "10px",
                            pointerEvents: "auto",
                            maxWidth: isMobile ? "90vw" : "300px",
                            background: "rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        Pro
                    </animated.div>
                    <animated.div
                        style={{
                            color: colorPalette.white,
                            position: "fixed",
                            top: "160px",
                            left: "20px",
                            borderRadius: "8px",
                            padding: "10px",
                            pointerEvents: "auto",
                            maxWidth: isMobile ? "90vw" : "300px",
                            background: "rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        Perso
                    </animated.div>
                </Fragment>
            )}
        </animated.div>
    );
};

export default App;
