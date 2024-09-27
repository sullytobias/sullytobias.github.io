import { FC, useState, useEffect } from "react";
import { Sphere, Html, Cylinder, Circle } from "@react-three/drei";
import { Vector3 } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { animated, useSpring } from "@react-spring/three";
import {
    PROJECT_CATEGORIES,
    ProjectCategory,
    projectsData,
} from "../../../utils/constants";

const AnimatedSphere = animated(Sphere);
const cupRadiusValue = 5;

const getRandomPosition = (cupRadius: number) => {
    const randomOffset = () => (Math.random() - 0.5) * cupRadius;
    return [randomOffset(), randomOffset(), randomOffset()];
};

const ProjectCard: FC<{
    title: string;
    link: string;
    category: ProjectCategory;
    initialPosition: Vector3;
}> = ({ title, link, category, initialPosition }) => {
    const [hovered, setHovered] = useState(false);
    const [bumped, setBumped] = useState(false);
    const sphereColor = PROJECT_CATEGORIES[category]?.color;

    const { scale, color, opacity } = useSpring({
        scale: bumped ? 1.2 : 1,
        color: hovered ? "yellow" : sphereColor,
        opacity: hovered || bumped ? 1 : 0.8,
        config: { tension: 200, friction: 10 },
    });

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
                10 + initialPosition.y,
                initialPosition.z,
            ]}
            mass={1}
            restitution={0.05}
        >
            <group
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <AnimatedSphere args={[0.5, 32, 32]} scale={scale}>
                    <animated.meshStandardMaterial
                        color={color}
                        opacity={opacity}
                        transparent
                        roughness={0.7}
                        metalness={1}
                    />
                </AnimatedSphere>
                <Html position={[0, 0.6, 0]} center>
                    <div
                        style={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            color: "white",
                            background: "rgba(0, 0, 0, 0.5)",
                            padding: "2px 8px",
                            borderRadius: "5px",
                            pointerEvents: "none",
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
    const [initialPositions, setInitialPositions] = useState<Vector3[]>([]);

    useEffect(() => {
        const positions = projectsData.map(
            () => new Vector3(...getRandomPosition(cupRadiusValue))
        );
        setInitialPositions(positions);
    }, []);

    return (
        <Physics colliders="ball">
            {/* Fixed RigidBody for the transparent cup */}
            <RigidBody type="fixed" colliders="trimesh" position={[0, -1, 0]}>
                <Cylinder
                    args={[cupRadiusValue, cupRadiusValue, 4, 64, 1, true]}
                >
                    <meshBasicMaterial
                        opacity={0}
                        color="white"
                        transparent
                        depthWrite={false}
                    />
                </Cylinder>
                <Circle
                    args={[cupRadiusValue, 64]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                >
                    <meshStandardMaterial
                        opacity={0.1}
                        transparent
                        color="black"
                        depthWrite={false}
                    />
                </Circle>
            </RigidBody>

            {/* Render all spheres for projects */}
            {initialPositions.length > 0 &&
                projectsData.map((project, index) => (
                    <ProjectCard
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