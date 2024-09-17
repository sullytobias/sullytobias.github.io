import { useRef, FC } from "react";
import { DoubleSide, Mesh } from "three";
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
        config: { mass: 1, tension: 100, friction: 20, duration: 1000 },
    });

    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 5 / 1000;
    });

    return (
        <animated.mesh
            ref={meshRef}
            position-x={positionX}
            onClick={onClick}
            scale={scale}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
                side={DoubleSide}
                color={cardColor}
                wireframe
            />
        </animated.mesh>
    );
};

export default Card;