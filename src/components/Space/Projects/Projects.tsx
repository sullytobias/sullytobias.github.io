import { FC, useState, useEffect } from "react";
import { Sphere, Html, Cylinder, Circle } from "@react-three/drei";
import { Vector3 } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { animated, useSpring } from "@react-spring/three";

const AnimatedSphere = animated(Sphere);

interface Project {
    title: string;
    link: string;
}

const projectsData: Project[] = [
    { title: "Renault", link: "https://www.renault.fr/" },
    { title: "Radley", link: "https://www.radley.co.uk/" },
    { title: "Airbus", link: "https://www.airbus.com/en" },
    {
        title: "Crypto",
        link: "https://sullivantobias.github.io/Crypto-Tracker/",
    },
    {
        title: "Solar System 3D",
        link: "https://sullytobias.github.io/geovisu/",
    },
    {
        title: "Solar System 2D",
        link: "https://sullivantobias.github.io/solar-system/",
    },
    {
        title: "React Firebase Chat",
        link: "https://sullivantobias.github.io/login",
    },
    { title: "Weather", link: "https://sullivantobias.github.io/weather-app/" },
    { title: "Lunar", link: "https://sullivantobias.github.io/moon-phase/" },
    {
        title: "Github",
        link: "https://sullivantobias.github.io/github-resume/",
    },
];

const getRadiusPosition = (cupRadius: number) =>
    (Math.random() - 0.5) * cupRadius;

const getRandomPosition = (cupRadius: number) => {
    const x = getRadiusPosition(cupRadius);
    const y = getRadiusPosition(cupRadius);
    const z = getRadiusPosition(cupRadius);

    return [x, y, z];
};

const ProjectCard: FC<{
    title: string;
    link: string;
    initialPosition: Vector3;
}> = ({ title, link, initialPosition }) => {
    const [hovered, setHovered] = useState(false);
    const [bumped, setBumped] = useState(false);

    const { scale, color, opacity } = useSpring({
        scale: bumped ? 1.2 : 1,
        color: hovered ? "yellow" : "white",
        opacity: hovered || bumped ? 1 : 0.7,
        config: { tension: 200, friction: 10 },
    });

    const pointerOver = () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
    };

    const pointerOut = () => {
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
                onPointerOver={pointerOver}
                onPointerOut={pointerOut}
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
            <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
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
                        link={project.link}
                        initialPosition={initialPositions[index]}
                    />
                ))}

            {/* Floating HTML list of projects */}
            <Html position={[0, 5, 0]} center>
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        padding: "10px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                        pointerEvents: "auto",
                    }}
                >
                    <h3 style={{ margin: "0 0 10px", fontSize: "1.2rem" }}>
                        Projects
                    </h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {projectsData.map((project, index) => (
                            <li key={index}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        color: "#0077cc",
                                        fontSize: "1rem",
                                        display: "block",
                                        padding: "5px 0",
                                    }}
                                >
                                    {project.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Html>
        </Physics>
    );
};

export default Projects;