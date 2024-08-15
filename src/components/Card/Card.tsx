import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type CardProps = {
    positionX: number;
    onClick: () => void;
};

const Card: React.FC<CardProps> = ({ positionX, onClick }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 5 / 1000;
        }
    });

    return (
        <mesh ref={meshRef} position-x={positionX} onClick={onClick}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#FFFC31" wireframe />
        </mesh>
    );
};

export default Card;
