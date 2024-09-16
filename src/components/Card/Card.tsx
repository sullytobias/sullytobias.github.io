import React, { useRef } from "react";
import { DoubleSide, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type CardProps = {
    positionX: number;
    onClick: () => void;
    isWireframe: boolean;
};

const Card: React.FC<CardProps> = ({ positionX, onClick, isWireframe }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 5 / 1000;
        }
    });

    return (
        <mesh ref={meshRef} position-x={positionX} onClick={onClick}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial
                side={DoubleSide}
                color="#FFFC31"
                wireframe={isWireframe}
            />
        </mesh>
    );
};

export default Card;