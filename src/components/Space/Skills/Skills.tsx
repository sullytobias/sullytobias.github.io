import { FC, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Text, Shadow } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
    title: string;
}

const TextAnimated = animated(Text);

const skillsData: Skill[] = [
    { title: "JavaScript" },
    { title: "React" },
    { title: "HTML5" },
    { title: "CSS3" },
    { title: "TypeScript" },
    { title: "Node.js" },
    { title: "GraphQL" },
    { title: "MongoDB" },
    { title: "Webpack" },
    { title: "Git" },
    { title: "Redux" },
    { title: "Next.js" },
];

const getRandomPosition = () => {
    const radius = 5;
    const x = (Math.random() - 0.5) * radius * 2;
    const y = (Math.random() - 0.5) * radius * 2;
    const z = (Math.random() - 0.5) * radius * 2;
    return [x, y, z];
};

const SkillItem: FC<{ title: string; initialPosition: THREE.Vector3 }> = ({
    title,
    initialPosition,
}) => {
    const [hovered, setHovered] = useState(false);

    const { position } = useSpring({
        from: {
            position: initialPosition.toArray(),
            rotation: [0, 0, 0],
        },
        to: {
            position: getRandomPosition(),
            rotation: [
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                0,
            ],
        },
        config: { mass: 1, tension: 150, friction: 50 },
    });

    const { scale, textDepth } = useSpring({
        scale: hovered ? 1.2 : 1,
        textDepth: hovered ? 0.15 : 0.05,
        config: { mass: 10, tension: 120, friction: 20 },
    });

    return (
        <animated.group
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <animated.mesh scale={scale}>
                <TextAnimated
                    fontSize={0.5}
                    color={hovered ? "#FF6347" : "white"}
                    anchorX="center"
                    anchorY="middle"
                    depthOffset={textDepth}
                >
                    {title}
                </TextAnimated>
                <Shadow
                    position={[0, -0.2, 0]}
                    scale={[1, 1, 1]}
                    color="black"
                    opacity={0.3}
                    rotation={[Math.PI / 2, 0, 0]}
                />
            </animated.mesh>
        </animated.group>
    );
};

const SkillsCloud: FC = () => {
    const [initialPositions, setInitialPositions] = useState<THREE.Vector3[]>(
        []
    );

    useEffect(() => {
        const positions = skillsData.map(
            () => new THREE.Vector3(...getRandomPosition())
        );
        setInitialPositions(positions);
    }, []);

    return skillsData.map((skill, index) => (
        <SkillItem
            key={index}
            title={skill.title}
            initialPosition={initialPositions[index] || new THREE.Vector3()}
        />
    ));
};

export default SkillsCloud;
