import { useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/web";

import Loader from "./components/Loader/Loader";
import FloatingText from "./components/FloatingText/FloatingText";
import LightButton from "./components/LightButton/LightButton";
import GroupCard from "./components/GroupCard/GroupCard";
import SpotLight from "./components/Lights/Spotlight/Spotlight";
import Space from "./components/Space/Space";

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
    }));
    const { opacity: projectListOpacity } = useSpring({
        opacity: showProjectList ? 1 : 0,
        config: { duration: 500 },
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingText(LOADING_TEXT.loaded);
            setIsLoaderVisible(false);
        }, 0);

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
        setSpaceOpacity({ spaceOpacity: 0 });
    };

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
                    opacity={spaceOpacity}
                    color={CATEGORIES[activeCardIndex]?.cardColor}
                    activeCategory={CATEGORIES[activeCardIndex]?.categoryTitle}
                />
                {!isLoaderVisible && (
                    <>
                        {!showButton && !lightOn && (
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
            {activeCardIndex === 1 && (
                <animated.div
                    style={{
                        position: "fixed",
                        top: "100px",
                        left: "20px",
                        borderRadius: "8px",
                        padding: "10px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                        pointerEvents: "auto",
                        opacity: projectListOpacity,
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
                                        fontSize: "1rem",
                                    }}
                                >
                                    {project.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </animated.div>
            )}
        </div>
    );
};

export default App;