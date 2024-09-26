import { FC, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, PointLight } from "three";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

type LightButtonProps = {
    onClick: () => void;
};

const LightButton: FC<LightButtonProps> = ({ onClick }) => {
    const [hovered, setHovered] = useState(false);

    const meshRef = useRef<Mesh>(null!);
    const lightRef = useRef<PointLight>(null!);

    const springs = useSpring({
        scale: [1, 1, 1],
        intensity: 1.5,
        from: { scale: [1.1, 1.1, 1.1] },
        config: { tension: 200, friction: 15 },
        loop: true,
    });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const radius = 3;
        const speed = 3;

        if (lightRef.current) {
            const x = Math.cos(time * speed) * radius;
            const z = Math.sin(time * speed) * radius;
            lightRef.current.position.set(x, 0, z);
        }
    });

    const { color } = useSpring({
        color: hovered ? "red" : "white",
        config: { tension: 50, friction: 10 },
    });

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        setHovered(false);
    };

    return (
        <group
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[0, -5, 0]}
        >
            <animated.mesh
                ref={meshRef}
                onClick={onClick}
                scale={springs.scale.to((x, y, z) => [x, y, z])}
            >
                <sphereGeometry args={[0.6, 32, 32]} />
                <animated.meshStandardMaterial
                    color={color}
                    roughness={0.8}
                    metalness={0.7}
                />
            </animated.mesh>

            <animated.pointLight ref={lightRef} color="white" />

            <Text
                color="white"
                fontSize={0.15}
                fontWeight={700}
                maxWidth={2}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                position={[0, 0.5, 1]}
            >
                Light on
            </Text>
        </group>
    );
};

export default LightButton;
