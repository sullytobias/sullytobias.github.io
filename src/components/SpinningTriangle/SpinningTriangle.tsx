import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { animated, useSpring } from "@react-spring/three";

type SpinningTriangleProps = {
    isLoadingComplete: boolean;
    onClick: () => void;
};

const SpinningTriangle: React.FC<SpinningTriangleProps> = ({
    isLoadingComplete,
    onClick,
}) => {
    const meshRef = useRef<Mesh>(null!);
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        if (isLoadingComplete) setClickable(true);
    }, [isLoadingComplete]);

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 2;
    });

    const { emissiveIntensity } = useSpring({
        emissiveIntensity: isLoadingComplete ? 0 : 1,
        config: { duration: 1500 },
    });

    const handleClick = () => {
        if (clickable && onClick) onClick();
    };

    return (
        <mesh ref={meshRef} onClick={handleClick}>
            <coneGeometry args={[1.5, 2.5, 4]} />
            <animated.meshStandardMaterial
                color="#61dafb"
                emissive="#61dafb"
                emissiveIntensity={emissiveIntensity}
            />
        </mesh>
    );
};

export default SpinningTriangle;
