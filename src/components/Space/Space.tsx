import { FC, Fragment, useMemo } from "react";
import { animated, SpringValue } from "@react-spring/three";
import { Text, Float } from "@react-three/drei";
import { DoubleSide } from "three";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: string;
};

const Space: FC<SpaceProps> = ({ color, opacity, activeCategory }) => {
    const contactInfo = useMemo(
        () => (
            <Fragment>
                <Text
                    fontSize={0.5}
                    position={[0, 1.5, 0]}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Contact Info:
                </Text>
                <Text
                    fontSize={0.4}
                    position={[0, 1, 0]}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Email: example@mail.com
                </Text>
                <Text
                    fontSize={0.4}
                    position={[0, 0.5, 0]}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Phone: +123 456 7890
                </Text>
            </Fragment>
        ),
        []
    );

    const skillsList = useMemo(
        () => (
            <Fragment>
                <Text
                    fontSize={0.3}
                    position-y={1.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Skills:
                </Text>
                <Text
                    fontSize={0.2}
                    position-y={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    - React
                </Text>
                <Text
                    fontSize={0.2}
                    position-y={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    - JavaScript
                </Text>
                <Text
                    fontSize={0.2}
                    position-y={0}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    - TypeScript
                </Text>
            </Fragment>
        ),
        []
    );

    const projectCards = useMemo(
        () => (
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-1.5, 0.5, 0]}>
                    <boxGeometry args={[2, 1, 0.2]} />
                    <meshStandardMaterial color="white" />
                    <Text fontSize={0.4} position={[0, 0, 0.2]} color="black">
                        Project 1
                    </Text>
                </mesh>

                <mesh position={[1.5, 0.5, 0]}>
                    <boxGeometry args={[2, 1, 0.2]} />
                    <meshStandardMaterial color="white" />
                    <Text fontSize={0.4} position={[0, 0, 0.2]} color="black">
                        Project 2
                    </Text>
                </mesh>

                <mesh position={[0, -1.5, 0]}>
                    <boxGeometry args={[2, 1, 0.2]} />
                    <meshStandardMaterial color="white" />
                    <Text fontSize={0.4} position={[0, 0, 0.2]} color="black">
                        Project 3
                    </Text>
                </mesh>
            </Float>
        ),
        []
    );

    const renderCategoryContent = () => {
        switch (activeCategory) {
            case "Contacts":
                return contactInfo;
            case "Skills":
                return skillsList;
            case "Projects":
                return projectCards;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <animated.group position={[0, 0, 0]} scale={[10, 3, 3]}>
                <animated.mesh>
                    <sphereGeometry args={[3, 32, 32]} />
                    <animated.meshStandardMaterial
                        color={color}
                        transparent
                        opacity={opacity}
                        side={DoubleSide}
                    />
                </animated.mesh>
            </animated.group>
            <group>{renderCategoryContent()}</group>
        </Fragment>
    );
};

export default Space;