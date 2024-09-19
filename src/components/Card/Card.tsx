import { useRef, FC } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

type CardProps = {
    positionX: number;
    onClick: () => void;
    enteringSphere: boolean;
    cardColor: string;
};

const Card: FC<CardProps> = ({
    positionX,
    onClick,
    enteringSphere,
    cardColor,
}) => {
    const meshRef = useRef<Mesh>(null!);

    const { scale } = useSpring({
        scale: enteringSphere ? [3, 3, 3] : [1, 1, 1],
        config: { duration: 1000 },
    });

    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 0.01;
    });

    return (
        <animated.mesh
            ref={meshRef}
            position-x={positionX}
            onClick={onClick}
            scale={scale}
        >
            <boxGeometry args={[2, 2, 2, 3, 3, 3]} />
            <meshStandardMaterial color={cardColor} wireframe />
        </animated.mesh>
    );
};

export default Card;