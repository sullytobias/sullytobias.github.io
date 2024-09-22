import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

type LightButtonProps = {
    onClick: () => void;
};

const LightButton: FC<LightButtonProps> = ({ onClick }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.set(
                Math.cos(time) * 0.1,
                Math.sin(time) * 0.1 - 5,
                0
            );
        }
    });

    return (
        <mesh ref={meshRef} onClick={onClick}>
            <boxGeometry args={[2, 2, 0]} />
            <meshBasicMaterial wireframe />
            <Text
                color="white"
                fontSize={0.3}
                maxWidth={2}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                position={[0, 0, 0]}
            >
                Light On
            </Text>
        </mesh>
    );
};

export default LightButton;