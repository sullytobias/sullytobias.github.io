// src/components/Card.tsx
import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";

type CardProps = {
    lightOn: boolean;
    position: [number, number, number];
};

const Card: React.FC<CardProps> = ({ position }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <mesh position={position} ref={meshRef}>
            <boxGeometry args={[2, 2]} />
            <meshStandardMaterial color="whoat" />
            <Edges lineWidth={3}>
                <meshStandardMaterial color="black" />
            </Edges>
        </mesh>
    );
};

export default Card;
