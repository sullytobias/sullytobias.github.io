import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { animated } from "@react-spring/three";
import { SpringValue } from "@react-spring/three";

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
            <sphereGeometry args={[100, 32, 32]} />
            <animated.meshStandardMaterial
                opacity={opacity}
                transparent
                wireframe
                wireframeLinewidth={0.2}
                color="#61dafb"
            />
        </mesh>
    );
};

export default SpinningSphere;
