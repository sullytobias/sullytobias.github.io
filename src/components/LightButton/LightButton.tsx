import { FC, useRef } from "react";
import { PointLight } from "three";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { colorPalette } from "../../utils/constants";

type LightButtonProps = {
    onClick: () => void;
};

const LightButton: FC<LightButtonProps> = ({ onClick }) => {
    const lightRef = useRef<PointLight>(null!);

    const { scale, positionY } = useSpring({
        from: { scale: 1, positionY: -0.4 },
        to: { scale: 1.4, positionY: 0.4 },
        config: { duration: 800 },
        loop: true,
    });

    return (
        <group
            onClick={onClick}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            position={[0, -5, 0]}
        >
            <animated.mesh scale={scale}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial
                    color={colorPalette.white}
                    opacity={0.2}
                    transparent
                />
            </animated.mesh>

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial
                    color={colorPalette.white}
                    emissive={colorPalette.lime}
                />
            </mesh>

            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
                <meshStandardMaterial
                    color={colorPalette.mintGreen}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {[...Array(3)].map((_, i) => (
                <mesh key={i} position={[0, -0.8 + i * 0.15, 0]}>
                    <cylinderGeometry args={[0.32, 0.32, 0.05, 32]} />
                    <meshStandardMaterial
                        color={colorPalette.mintGreen}
                        metalness={0.8}
                    />
                </mesh>
            ))}

            <animated.pointLight
                ref={lightRef}
                color={colorPalette.lime}
                intensity={1.5}
                distance={5}
                position-y={positionY}
            />

            <animated.group position={[0, 1.5, 0]}>
                <Text
                    font="https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhzQ.woff"
                    color={colorPalette.white}
                    fontSize={0.25}
                    maxWidth={2}
                    lineHeight={1}
                    letterSpacing={0.1}
                    textAlign="center"
                >
                    Turn On
                </Text>
            </animated.group>
        </group>
    );
};

export default LightButton;
