import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { animated, SpringValue } from "@react-spring/three";

import { Mesh } from "three";

type SpinningSphereProps = {
    opacity: SpringValue<number>;
};

const SpinningSphere: React.FC<SpinningSphereProps> = ({ opacity }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[10, 16, 16]} />
            <animated.meshStandardMaterial
                opacity={opacity}
                transparent
                wireframe
                color="#F6F7EB"
            />
        </mesh>
    );
};

export default SpinningSphere;
