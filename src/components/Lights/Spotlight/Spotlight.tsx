import { useRef, FC } from "react";
import { SpotLight as SpotLightType } from "three";
import { useFrame } from "@react-three/fiber";
import { animated, SpringValue } from "@react-spring/three";

type CardProps = {
    intensity: SpringValue<number>;
};

const SpotLight: FC<CardProps> = ({ intensity }) => {
    const lightRef = useRef<SpotLightType>(null!);

    useFrame(({ clock: { elapsedTime } }) => {
        if (lightRef.current) {
            const time = elapsedTime;

            lightRef.current.position.x = Math.sin(time) * 10;
            lightRef.current.position.y = Math.cos(time) * 10;
        }
    });

    return (
        <animated.spotLight
            ref={lightRef}
            intensity={intensity}
            position={[0, 7, 0]}
            angle={3}
            penumbra={1}
            castShadow
        />
    );
};

export default SpotLight;
