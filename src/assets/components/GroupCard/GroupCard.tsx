import React, { useRef } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useSpring } from "@react-spring/three";

type GroupCardProps = {
    lightOn: boolean;
};

const GroupCard: React.FC<GroupCardProps> = ({ lightOn }) => {
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
            <Card positionX={0} />
            <Card positionX={-6} />
            <Card positionX={6} />
        </group>
    );
};

export default GroupCard;
