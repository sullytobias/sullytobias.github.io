import { useRef, FC } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

type CardProps = {
    positionX: number;
    onClick: () => void;
    enteringSphere: boolean;
    cardColor: string;
    lightOn: boolean;
    showText: boolean;
    categoryTitle: string;
};

const Card: FC<CardProps> = ({
    positionX,
    onClick,
    enteringSphere,
    cardColor,
    lightOn,
    showText,
    categoryTitle,
}) => {
    const meshRef = useRef<Mesh>(null!);
    const { scale, opacity, textOpacity } = useSpring({
        scale: enteringSphere ? [3, 3, 3] : [1, 1, 1],
        textOpacity: !enteringSphere && showText ? 1 : 0,
        opacity: enteringSphere ? 0 : 1,
        config: { duration: 1000 },
    });

    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 0.01;
    });

    return (
        <group key={cardColor}>
            <animated.mesh
                ref={meshRef}
                position-x={positionX}
                onClick={onClick}
                scale={scale.to((x, y, z) => [x, y, z])}
            >
                <boxGeometry args={[2, 2, 2, 3, 3, 3]} />
                <animated.meshStandardMaterial
                    color={cardColor}
                    wireframe
                    transparent
                    opacity={opacity}
                />
            </animated.mesh>
            {lightOn && (
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
            )}
        </group>
    );
};

export default Card;