import { FC, useState, useEffect } from "react";
import { Sphere, Html, Cylinder, Circle } from "@react-three/drei";
import { Vector3 } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { animated, useSpring } from "@react-spring/three";

const AnimatedSphere = animated(Sphere);

interface Project {
    title: string;
}

const projectsData: Project[] = [
    { title: "Project A" },
    { title: "Project B" },
    { title: "Project C" },
    { title: "Project D" },
    { title: "Project E" },
    { title: "Project F" },
    { title: "Project G" },
];

const getRadiusPosition = (cupRadius: number) =>
    (Math.random() - 0.5) * cupRadius;

const getRandomPosition = (cupRadius: number) => {
    const x = getRadiusPosition(cupRadius);
    const y = getRadiusPosition(cupRadius);
    const z = getRadiusPosition(cupRadius);

    return [x, y, z];
};

const ProjectCard: FC<{ title: string; initialPosition: Vector3 }> = ({
    title,
    initialPosition,
}) => {
    const [hovered, setHovered] = useState(false);

    const { scale, color, opacity } = useSpring({
        scale: hovered ? 1.1 : 1,
        color: hovered ? "yellow" : "white",
        opacity: hovered ? 1 : 0.7, // Add opacity effect for visual enhancement
        config: { tension: 200, friction: 30 },
    });

    const pointerOver = () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
    };

    const pointerOut = () => {
        document.body.style.cursor = "auto";
        setHovered(false);
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
            <group onPointerOver={pointerOver} onPointerOut={pointerOut}>
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

    const cupRadiusValue = 4;

    const { cupOpacity } = useSpring({
        from: { cupOpacity: 0 },
        to: { cupOpacity: 1 },
        config: { duration: 2000 },
    });

    useEffect(() => {
        const positions = projectsData.map(
            () => new Vector3(...getRandomPosition(cupRadiusValue))
        );
        setInitialPositions(positions);
    }, []);

    return (
        <Physics colliders="ball">
            <RigidBody type="fixed" colliders="trimesh" position={[0, -2, 0]}>
                <Cylinder
                    args={[cupRadiusValue, cupRadiusValue, 4, 64, 1, true]}
                >
                    <meshBasicMaterial opacity={0} transparent wireframe />
                </Cylinder>
                <Circle
                    args={[cupRadiusValue, 64]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                >
                    <animated.meshStandardMaterial
                        opacity={cupOpacity}
                        transparent
                        wireframe
                        color="white"
                    />
                </Circle>
            </RigidBody>

            {initialPositions.length > 0 &&
                projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        initialPosition={initialPositions[index]}
                    />
                ))}
        </Physics>
    );
};

export default Projects;
