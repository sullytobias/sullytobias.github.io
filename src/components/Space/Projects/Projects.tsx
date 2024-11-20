import { FC, useState, useEffect } from "react";
import { Sphere, Html, Cylinder, Circle } from "@react-three/drei";
import { Vector3 } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { animated, useSpring } from "@react-spring/three";

import { useMediaQuery } from "react-responsive";
import { Howl } from "howler";

import {
    colorPalette,
    PROJECT_CATEGORIES,
    projectsData,
    ProjectCategory,
} from "../../../utils/constants";
import { useSound } from "../../../context/SoundContext";

const AnimatedSphere = animated(Sphere);
const getRandomPosition = (cupRadius: number) => {
    const randomOffset = () => (Math.random() - 0.5) * cupRadius;
    return [randomOffset(), -12, randomOffset()];
};

const ProjectCard: FC<{
    title: string;
    link: string;
    category: ProjectCategory;
    initialPosition: Vector3;
    isMobile: boolean;
    isFxPlaying: boolean;
}> = ({ title, link, category, initialPosition, isMobile, isFxPlaying }) => {
    const [hovered, setHovered] = useState(false);
    const [bumped, setBumped] = useState(false);
    const [collisionCount, setCollisionCount] = useState(0);
    const sphereColor = PROJECT_CATEGORIES[category]?.color;

    const { scale, color, opacity } = useSpring({
        scale: bumped ? 2 : 1.2,
        color: hovered ? colorPalette.lime : sphereColor,
        opacity: hovered || bumped ? 1 : 0.8,
        config: { tension: 200, friction: 10 },
    });

    const playCollisionSound = () => {
        if (collisionCount < 3) {
            const collisionSound = new Howl({
                src: ["/sounds/ballColliding.mp3"],
                volume: 0.01,
            });

            isFxPlaying && collisionSound.play();

            setCollisionCount(collisionCount + 1);
        }
    };

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        setHovered(false);
    };

    const handleClick = () => {
        setBumped(true);

        const projectClickSound = new Howl({
            src: ["/sounds/projectClick.mp3"],
            volume: 0.5,
        });

        isFxPlaying && projectClickSound.play();

        setTimeout(() => {
            setBumped(false);
            window.open(link, "_blank");
        }, 500);
    };

    return (
        <RigidBody
            colliders="ball"
            position={[
                initialPosition.x,
                15 + initialPosition.y,
                initialPosition.z,
            ]}
            mass={1}
            restitution={0.8}
            onCollisionEnter={playCollisionSound}
        >
            <group
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <AnimatedSphere
                    args={[isMobile ? 0.5 : 0.6, 64, 64]}
                    scale={scale}
                >
                    <animated.meshStandardMaterial
                        color={color}
                        opacity={opacity}
                        transparent
                        wireframe
                        roughness={0.7}
                        metalness={1}
                    />
                </AnimatedSphere>
                <Html position={[0, 0, 0]} center>
                    <div
                        onClick={handleClick} // Add click handler here
                        style={{
                            fontSize: isMobile ? "0.6rem" : "0.9rem",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            color: colorPalette.white,
                            cursor: "pointer",
                        }}
                    >
                        {title}
                    </div>
                </Html>
            </group>
        </RigidBody>
    );
};

const Projects: FC = () => {
    const { isFxPlaying } = useSound();
    const [initialPositions, setInitialPositions] = useState<Vector3[]>([]);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const cupRadiusValue = isMobile ? 3 : 5;

    useEffect(() => {
        const positions = projectsData.map(
            () => new Vector3(...getRandomPosition(cupRadiusValue))
        );
        setInitialPositions(positions);
    }, [cupRadiusValue]);

    return (
        <Physics colliders="ball">
            <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
                <Cylinder
                    position={[0, 1, 0]}
                    args={[cupRadiusValue, cupRadiusValue, 6, 64, 1, true]}
                >
                    <meshBasicMaterial
                        opacity={0}
                        color={colorPalette.white}
                        transparent
                        depthWrite={false}
                    />
                </Cylinder>
                <Circle
                    args={[cupRadiusValue, 64]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                >
                    <meshStandardMaterial opacity={0} transparent />
                </Circle>
            </RigidBody>

            {initialPositions.length > 0 &&
                projectsData.map((project, index) => (
                    <ProjectCard
                        isFxPlaying={isFxPlaying}
                        isMobile={isMobile}
                        key={index}
                        category={project.category}
                        title={project.title}
                        link={project.link}
                        initialPosition={initialPositions[index]}
                    />
                ))}
        </Physics>
    );
};

export default Projects;