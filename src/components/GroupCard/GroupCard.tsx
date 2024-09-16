import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

type CategoriesTypes = {
    cardPositionX: number;
    categoryTitle: string;
};

type GroupCardProps = {
    lightOn: boolean;
    onCardClick?: (position: [number, number, number]) => void;
    categories: CategoriesTypes[];
};

const GroupCard: React.FC<GroupCardProps> = ({
    lightOn,
    onCardClick,
    categories,
}) => {
    const meshRef = useRef<Mesh>(null!);
    const [showText, setShowText] = useState(false);

    const { positionY } = useSpring({
        positionY: lightOn ? 0 : 5,
        config: { duration: 1000 },
        onRest: () => setShowText(true),
    });

    const { opacity } = useSpring({
        opacity: showText ? 1 : 0,
        config: { duration: 1000 },
    });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current)
            meshRef.current.position.y =
                positionY.get() + Math.sin(time * 2) * 0.2;
    });

    return (
        <animated.group ref={meshRef} position={[0, positionY.get(), -2]}>
            {categories.map(({ cardPositionX, categoryTitle }) => (
                <group key={categoryTitle}>
                    <Card
                        positionX={cardPositionX}
                        onClick={() =>
                            onCardClick?.([cardPositionX, positionY.get(), -2])
                        }
                        isWireframe={!lightOn} // Ensure wireframe is off when light is on
                    />
                    {lightOn && (
                        <animated.mesh>
                            <Text
                                position={[cardPositionX, -2.5, 0]} // Adjust the Y position to appear below the sphere
                                fontSize={0.5}
                                color="white"
                                anchorX="center"
                                anchorY="middle"
                            >
                                <animated.meshStandardMaterial
                                    opacity={opacity}
                                    transparent
                                />
                                {categoryTitle}
                            </Text>
                        </animated.mesh>
                    )}
                </group>
            ))}
        </animated.group>
    );
};

export default GroupCard;
