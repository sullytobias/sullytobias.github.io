import { useRef, FC } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

type CardProps = {
    positionX: number;
    onClick: () => void;
    cardColor: string;
    showText: boolean;
    categoryTitle: string;
    isActive: boolean;
    categoryLoaded: boolean;
};

const Card: FC<CardProps> = ({
    positionX,
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
                onClick={onClick}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "auto")}
                scale={scale.to((x, y, z) => [x, y, z])}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <animated.meshStandardMaterial
                    color={cardColor}
                    wireframe={true}
                    transparent
                    opacity={opacity}
                />
            </animated.mesh>
            <animated.mesh>
                <Text
                    position={[positionX, -2.5, 0]}
                    fontSize={0.5}
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