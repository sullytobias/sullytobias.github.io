// src/components/SpinningTriangle.tsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const SpinningTriangle: React.FC = () => {
    const meshRef = useRef<Mesh>(null!);

    useFrame((state, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 2;
    });

    return (
        <mesh ref={meshRef}>
            <coneGeometry args={[1.5, 2.5, 4]} />
            <meshPhongMaterial color={"#61dafb"} />
        </mesh>
    );
};

export default SpinningTriangle;
