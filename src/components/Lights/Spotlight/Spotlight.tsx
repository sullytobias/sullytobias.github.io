import { useRef, FC } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { SpringValue } from "@react-spring/web";

import { SpotLight as SpotLightType } from "three";

type SpotLightProps = {
    intensity: SpringValue<number>;
};

const SpotLight: FC<SpotLightProps> = ({ intensity }) => {
    const lightRef = useRef<SpotLightType>(null!);

    const { intensity: animatedIntensity } = useSpring({
        intensity,
        config: { duration: 1000 },
    });

    useFrame(({ clock: { elapsedTime } }) => {
        if (lightRef.current) {
            lightRef.current.position.set(
                Math.sin(elapsedTime) * 10,
                Math.cos(elapsedTime) * 3,
                0
            );
        }
    });

    return (
        <animated.spotLight
            ref={lightRef}
            intensity={animatedIntensity}
            position={[0, 7, 0]}
            angle={3}
            penumbra={1}
            castShadow
        />
    );
};

export default SpotLight;
