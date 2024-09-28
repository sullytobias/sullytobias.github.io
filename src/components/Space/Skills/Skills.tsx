import { FC, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import { colorPalette } from "../../../utils/constants";

interface Skill {
    title: string;
}

const TextAnimated = animated(Text);

const skillsData: Skill[] = [
    { title: "HTML5" },
    { title: "CSS" },
    { title: "JavaScript" },
    { title: "React" },
    { title: "Redux" },
    { title: "MobX" },
    { title: "Handlebar" },
    { title: "NodeJs" },
    { title: "AEM" },
    { title: "TS" },
    { title: "GraphQL" },
    { title: "Jest" },
    { title: "NextJS" },
    { title: "MongoDB" },
    { title: "GSAP" },
    { title: "ThreeJS" },
    { title: "OpenAI" },
    { title: "Lightroom" },
];

const getScreenBounds = (isMobile: boolean) => ({
    x: isMobile ? 3 : 5,
    y: isMobile ? 2 : 3,
    z: isMobile ? 3 : 5,
});

const getRandomPosition = (bounds: { x: number; y: number; z: number }) =>
    new THREE.Vector3(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        (Math.random() - 0.5) * bounds.z * 2
    );

const getRandomVelocity = () => {
    const velocityScale = 0.05;
    return new THREE.Vector3(
        (Math.random() - 0.5) * velocityScale,
        (Math.random() - 0.5) * velocityScale,
        (Math.random() - 0.5) * velocityScale
    );
};

const SkillItem: FC<{
    title: string;
    initialPosition: THREE.Vector3;
    bounds: { x: number; y: number; z: number };
}> = ({ title, initialPosition, bounds }) => {
    const [velocity, setVelocity] = useState(getRandomVelocity());
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState(initialPosition);

    const { opacity } = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { mass: 10, tension: 120, friction: 20 },
        delay: 300,
    });

    useFrame(() => {
        const newPosition = position.clone().add(velocity);

        if (newPosition.x > bounds.x || newPosition.x < -bounds.x) {
            setVelocity((v) => new THREE.Vector3(-v.x, v.y, v.z));
            newPosition.x = Math.max(
                Math.min(newPosition.x, bounds.x),
                -bounds.x
            );
        }

        if (newPosition.y > bounds.y || newPosition.y < -bounds.y) {
            setVelocity((v) => new THREE.Vector3(v.x, -v.y, v.z));
            newPosition.y = Math.max(
                Math.min(newPosition.y, bounds.y),
                -bounds.y
            );
        }

        if (newPosition.z > bounds.z || newPosition.z < -bounds.z) {
            setVelocity((v) => new THREE.Vector3(v.x, v.y, -v.z));
            newPosition.z = Math.max(
                Math.min(newPosition.z, bounds.z),
                -bounds.z
            );
        }

        setPosition(newPosition);
    });

    return (
        <animated.group
            position={position.toArray()}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <TextAnimated
                fontSize={0.5}
                color={hovered ? colorPalette.mintGreen : colorPalette.white}
                anchorX="center"
                anchorY="middle"
                fillOpacity={opacity}
            >
                {title}
            </TextAnimated>
        </animated.group>
    );
};

const Skills: FC = () => {
    const [initialPositions, setInitialPositions] = useState<THREE.Vector3[]>(
        []
    );

    const isMobile = useMediaQuery({ maxWidth: 1024 });
    const bounds = getScreenBounds(isMobile);

    useEffect(() => {
        const positions = skillsData.map(() => getRandomPosition(bounds));
        setInitialPositions(positions);
    }, [bounds]);

    return (
        initialPositions.length > 0 &&
        skillsData.map((skill, index) => (
            <SkillItem
                key={index}
                title={skill.title}
                initialPosition={initialPositions[index]}
                bounds={bounds}
            />
        ))
    );
};

export default Skills;