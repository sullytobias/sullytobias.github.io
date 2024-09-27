import { FC, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import * as THREE from "three";

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

const screenBounds = { x: 5, y: 3, z: 5 };

const getRandomPosition = () => {
    return new THREE.Vector3(
        (Math.random() - 0.5) * screenBounds.x * 2,
        (Math.random() - 0.5) * screenBounds.y * 2,
        (Math.random() - 0.5) * screenBounds.z * 2
    );
};

const getRandomVelocity = () => {
    const velocityScale = 0.05;
    return new THREE.Vector3(
        (Math.random() - 0.5) * velocityScale,
        (Math.random() - 0.5) * velocityScale,
        (Math.random() - 0.5) * velocityScale
    );
};

const SkillItem: FC<{ title: string; initialPosition: THREE.Vector3 }> = ({
    title,
    initialPosition,
}) => {
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

        if (newPosition.x > screenBounds.x || newPosition.x < -screenBounds.x) {
            setVelocity((v) => new THREE.Vector3(-v.x, v.y, v.z));
        }
        if (newPosition.y > screenBounds.y || newPosition.y < -screenBounds.y) {
            setVelocity((v) => new THREE.Vector3(v.x, -v.y, v.z));
        }
        if (newPosition.z > screenBounds.z || newPosition.z < -screenBounds.z) {
            setVelocity((v) => new THREE.Vector3(v.x, v.y, -v.z));
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
                color={hovered ? "#FF6347" : "white"}
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

    useEffect(() => {
        const positions = skillsData.map(getRandomPosition);
        setInitialPositions(positions);
    }, []);

    return (
        initialPositions.length > 0 &&
        skillsData.map((skill, index) => (
            <SkillItem
                key={index}
                title={skill.title}
                initialPosition={initialPositions[index]}
            />
        ))
    );
};

export default Skills;