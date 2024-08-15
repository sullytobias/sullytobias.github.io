import React, { useRef } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useSpring } from "@react-spring/three";

type GroupCardProps = {
    lightOn: boolean;
    onCardClick: (position: [number, number, number]) => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ lightOn, onCardClick }) => {
    const meshRef = useRef<Mesh>(null!);

    const { positionY } = useSpring({
        positionY: lightOn ? 0 : 5,
        config: { duration: 1000 },
    });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current)
            meshRef.current.position.y =
                positionY.get() + Math.sin(time * 2) * 0.2;
    });

    return (
        <group ref={meshRef} position={[0, positionY.get(), -2]}>
            <Card
                positionX={0}
                onClick={() => onCardClick([0, positionY.get(), -2])}
            />
            <Card
                positionX={-6}
                onClick={() => onCardClick([-6, positionY.get(), -2])}
            />
            <Card
                positionX={6}
                onClick={() => onCardClick([6, positionY.get(), -2])}
            />
        </group>
    );
};

export default GroupCard;
