import { useRef, FC } from "react";
import { SpotLight as SpotLightType } from "three";
import { useFrame } from "@react-three/fiber";
import { animated, SpringValue } from "@react-spring/three";

type SpotLightProps = {
    intensity: SpringValue<number>;
};

const SpotLight: FC<SpotLightProps> = ({ intensity }) => {
    const lightRef = useRef<SpotLightType>(null!);

    useFrame(({ clock: { elapsedTime } }) => {
        if (lightRef.current) {
            lightRef.current.position.set(
                Math.sin(elapsedTime) * 10,
                Math.cos(elapsedTime) * 10,
                0
            );
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