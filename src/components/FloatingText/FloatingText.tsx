// src/components/MovingText.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Vector3, Mesh } from "three";

import { useSpring, animated } from "@react-spring/three";

type FloatingTextTypes = {
    text: string;
};

const FloatingText = ({ text }: FloatingTextTypes) => {
    const meshRef = useRef<Mesh>(null!);
    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
    });

    // Add mouse movement interaction
    useFrame(({ pointer }) => {
        if (meshRef.current) {
            // Adjust the movement scale based on mouse position
            const movementScale = 0.5;
            const targetPosition = new Vector3(
                pointer.x * movementScale,
                -5 + pointer.y * movementScale,
                0
            );

            // Smoothly move the mesh towards the target position
            meshRef.current.position.lerp(targetPosition, 0.1);

            meshRef.current.children.forEach((child: any) => {
                if (child.material) {
                    child.material.opacity = opacity.get();
                }
            });
        }
    });

    return (
        <animated.mesh ref={meshRef} material={{ transparent: true }}>
            <Text
                color="white"
                fontSize={0.4}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.5}
                textAlign="center"
            >
                {text}
            </Text>
        </animated.mesh>
    );
};

export default FloatingText;
