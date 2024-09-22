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

    const { scale, opacity } = useSpring({
        scale: enteringSphere ? [3, 3, 3] : [1, 1, 1],
        opacity: enteringSphere ? 0 : 1,
        config: { duration: 1000 },
    });

    const click = () => {
        onClick();
    };

    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 0.01;
    });

    return (
        <animated.mesh
            ref={meshRef}
            position-x={positionX}
            onClick={click}
            scale={scale.to((x, y, z) => [x, y, z])}
        >
            <boxGeometry args={[2, 2, 2, 3, 3, 3]} />
            <animated.meshStandardMaterial
                color={cardColor}
                wireframe
                transparent
                opacity={opacity}
            />
        </animated.mesh>
    );
};

export default Card;