import { FC, Fragment, useMemo } from "react";
import { animated, SpringValue, useSpring } from "@react-spring/three";
import { Text, Float } from "@react-three/drei";
import { DoubleSide } from "three";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: string;
    spaceLoaded: boolean;
};

// Animated Drei Text Component
const DreiText = animated(Text);

// Reusable Text Function
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

const Space: FC<SpaceProps> = ({
    color,
    opacity,
    activeCategory,
    spaceLoaded,
}) => {
    const { opacity: TextOpacity } = useSpring({
        opacity: spaceLoaded ? 1 : 0,
        config: { duration: 2000 },
    });

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
                <RenderText
                    texts={categoryTexts.Contacts}
                    TextOpacity={TextOpacity}
                />
            ),
            Skills: (
                <RenderText
                    texts={categoryTexts.Skills}
                    TextOpacity={TextOpacity}
                />
            ),
            Projects: (
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
                                        opacity={TextOpacity}
                                        color="white"
                                        transparent
                                    />
                                    <DreiText
                                        fillOpacity={TextOpacity}
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
            ),
        };
    }, [TextOpacity]);

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