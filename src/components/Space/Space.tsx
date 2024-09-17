import React from "react";
import { animated, SpringValue } from "@react-spring/three";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
};

const Space: React.FC<SpaceProps> = ({ color, opacity }) => (
    <animated.mesh position={[0, 0, -10]} scale={[20, 20, 1]}>
        <sphereGeometry args={[1, 32]} />
        <animated.meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
        />
    </animated.mesh>
);

export default Space;
