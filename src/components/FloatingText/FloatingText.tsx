// src/components/MovingText.tsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Vector3, Mesh } from "three";

const FloatingText: React.FC = () => {
    const meshRef = useRef<Mesh>(null!);

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
        }
    });

    return (
        <mesh ref={meshRef}>
            <Text
                color="white"
                fontSize={0.4}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={1}
                textAlign="center"
            >
                Loading Space
            </Text>
        </mesh>
    );
};

export default FloatingText;
