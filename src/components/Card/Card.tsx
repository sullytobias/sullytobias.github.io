import { useRef, FC } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

type CardProps = {
    positionX: number;
    positionY: number;
    onClick: () => void;
    cardColor: string;
    showText: boolean;
    categoryTitle: string;
    isActive: boolean;
    categoryLoaded: boolean;
};

const Card: FC<CardProps> = ({
    positionX,
    positionY,
    onClick,
    cardColor,
    showText,
    categoryTitle,
    isActive,
    categoryLoaded,
}) => {
    const meshRef = useRef<Mesh>(null!);

    const { scale, opacity, textOpacity } = useSpring({
        scale: isActive ? [3, 3, 3] : categoryLoaded ? [0, 0, 0] : [1, 1, 1],
        textOpacity: showText ? (categoryLoaded ? 0 : 1) : 0,
        opacity: isActive ? 0 : categoryLoaded ? 0 : 1,
        config: { duration: 1000 },
    });

    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 0.01;
    });

    return (
        <group>
            <animated.mesh
                ref={meshRef}
                position-x={positionX}
                position-y={positionY}
                onClick={onClick}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "auto")}
                scale={scale.to((x, y, z) => [x, y, z])}
            >
                <sphereGeometry args={[1.2, 32, 32]} />
                <animated.meshStandardMaterial
                    color={cardColor}
                    wireframe={true}
                    transparent
                    opacity={opacity}
                    depthWrite={false}
                />
            </animated.mesh>
            <animated.mesh>
                <Text
                    position={[positionX, positionY, 0]}
                    fontSize={0.4}
                    fontWeight={700}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    <animated.meshStandardMaterial
                        opacity={textOpacity}
                        transparent
                    />
                    {categoryTitle}
                </Text>
            </animated.mesh>
        </group>
    );
};

export default Card;