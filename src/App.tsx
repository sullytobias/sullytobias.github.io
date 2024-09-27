import { useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/web";
import { useMediaQuery } from "react-responsive";

import { Howl } from "howler";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import LightButton from "./components/LightButton/LightButton";
import GroupCard from "./components/GroupCard/GroupCard";
import SpotLight from "./components/Lights/Spotlight/Spotlight";
import Space from "./components/Space/Space";
import TypingText from "./components/TypingText/TypingText";

import {
    CATEGORIES,
    LOADING_TEXT,
    PROJECT_CATEGORIES,
    projectsData,
} from "./utils/constants";

const App: FC = () => {
    const [loadingText, setLoadingText] = useState(LOADING_TEXT.loading);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [lightOn, setLightOn] = useState(false);
    const [enteringSphere, setEnteringSphere] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
    const [interactionDisabled, setInteractionDisabled] = useState(false);
    const [showProjectList, setShowProjectList] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const ambientWindSound = new Howl({
            src: ["/sounds/background.mp3"],
            loop: true,
            volume: 0.08,
        });

        ambientWindSound.play();

        return () => {
            ambientWindSound.stop();
        };
    }, []);

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

    const { opacity: projectListOpacity } = useSpring({
        opacity: showProjectList ? 1 : 0,
        config: { duration: 500 },
    });

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

    useEffect(() => {
        if (activeCardIndex === 1) {
            const timeoutId = setTimeout(() => setShowProjectList(true), 100);
            return () => clearTimeout(timeoutId);
        }
        setShowProjectList(false);
    }, [activeCardIndex]);

    const handleTextComplete = () => setShowButton(true);
    const handleButtonClick = () => setLightOn(true);
    const handleCardClick = (index: number) => {
        const clickSound = new Howl({
            src: ["/sounds/categoryClick.mp3"],
            volume: 0.2,
        });
        clickSound.play();

        setActiveCardIndex(index);
        setEnteringSphere(true);
        if (!interactionDisabled) {
            setInteractionDisabled(true);
            setSpaceOpacity({ spaceOpacity: 1 });
        }
    };

    const handleCrossClick = () => {
        const crossClickSound = new Howl({
            src: ["/sounds/click-cross.mp3"],
            volume: 0.2,
        });
        crossClickSound.play();

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
                backgroundColor: "black",
            }}
        >
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
                        top: "20px",
                        right: "20px",
                        zIndex: 1000,
                        cursor: "pointer",
                        color: "white",
                        fontSize: isMobile ? "1.5rem" : "3rem",
                    }}
                    onClick={handleCrossClick}
                >
                    ✖
                </div>
            )}
            {activeCardIndex === 1 && (
                <animated.div
                    style={{
                        position: "fixed",
                        top: isMobile ? "30px" : "100px",
                        left: "20px",
                        borderRadius: "8px",
                        padding: "10px",
                        pointerEvents: "auto",
                        opacity: projectListOpacity,
                        maxWidth: isMobile ? "90vw" : "300px",
                        background: "rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <ul
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            listStyleType: "none",
                            padding: 0,
                        }}
                    >
                        {projectsData.map((project, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            project.category === "professional"
                                                ? PROJECT_CATEGORIES
                                                      .professional.color
                                                : PROJECT_CATEGORIES.personal
                                                      .color,
                                        fontSize: isMobile ? "0.9rem" : "1rem",
                                    }}
                                >
                                    {project.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </animated.div>
            )}
        </animated.div>
    );
};

export default App;