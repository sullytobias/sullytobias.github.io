import React from "react";
import { animated, SpringValue } from "@react-spring/three";
import { DoubleSide } from "three";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
};

const Space: React.FC<SpaceProps> = ({ color, opacity }) => (
    <animated.group>
        <pointLight intensity={1} position={0} />

        <animated.mesh position={0} scale={[20, 20, 1]}>
            <sphereGeometry args={[3, 32, 32]} />
            <animated.meshStandardMaterial
                color={color}
                transparent
                opacity={opacity}
                side={DoubleSide}
            />
        </animated.mesh>
    </animated.group>
);

export default Space;