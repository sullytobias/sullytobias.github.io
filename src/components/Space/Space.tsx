import { FC, Fragment, useMemo } from "react";
import { animated, SpringValue } from "@react-spring/three";
import { Text, Float } from "@react-three/drei";
import { DoubleSide } from "three";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    textOpacity: SpringValue<number>;
    activeCategory: string;
};

const DreiText = animated(Text);

const RenderText = ({
    texts,
    TextOpacity,
}: {
    texts: string[];
    TextOpacity: SpringValue<number>;
}) => (
    <animated.group>
        {texts.map((text, index) => (
            <DreiText
                key={text}
                fillOpacity={TextOpacity}
                fontSize={0.4}
                position={[0, 1.5 - index * 0.5, 0]}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </DreiText>
        ))}
    </animated.group>
);

// Overlay Component
const Overlay = ({ width, height }: { width: number; height: number }) => (
    <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="black" transparent opacity={0.5} />
    </mesh>
);

const Space: FC<SpaceProps> = ({
    color,
    opacity,
    activeCategory,
    textOpacity,
}) => {
    const contentMap = useMemo(() => {
        const categoryTexts = {
            Contacts: [
                "Contact Info:",
                "Email: example@mail.com",
                "Phone: +123 456 7890",
            ],
            Skills: ["Skills:", "- React", "- JavaScript", "- TypeScript"],
        };

        return {
            Contacts: (
                <Fragment>
                    <Overlay
                        width={window.outerWidth}
                        height={window.outerHeight}
                    />
                    <RenderText
                        texts={categoryTexts.Contacts}
                        TextOpacity={textOpacity}
                    />
                </Fragment>
            ),
            Skills: (
                <Fragment>
                    <Overlay width={4} height={2} />
                    <RenderText
                        texts={categoryTexts.Skills}
                        TextOpacity={textOpacity}
                    />
                </Fragment>
            ),
            Projects: (
                <Fragment>
                    <Overlay width={7} height={3} />
                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                        <animated.group>
                            {["Project 1", "Project 2", "Project 3"].map(
                                (proj, idx) => (
                                    <mesh
                                        key={proj}
                                        position={[-2.5 + idx * 3, 0.5, 0]}
                                    >
                                        <boxGeometry args={[2, 1, 0.2]} />
                                        <animated.meshStandardMaterial
                                            opacity={textOpacity}
                                            color="white"
                                            transparent
                                        />
                                        <DreiText
                                            fillOpacity={textOpacity}
                                            fontSize={0.4}
                                            position={[0, 0, 0.2]}
                                            color="black"
                                        >
                                            {proj}
                                        </DreiText>
                                    </mesh>
                                )
                            )}
                        </animated.group>
                    </Float>
                </Fragment>
            ),
        };
    }, [textOpacity]);

    return (
        <Fragment>
            <animated.mesh position={0} scale={5}>
                <sphereGeometry args={[3, 32, 32]} />
                <animated.meshStandardMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    side={DoubleSide}
                />
            </animated.mesh>
            <group position={[0, 0, 0]}>
                {contentMap[activeCategory] || null}
            </group>
        </Fragment>
    );
};

export default Space;