import { FC, Fragment, useMemo } from "react";
import { animated, SpringValue } from "@react-spring/three";
import { Text, Float } from "@react-three/drei";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    textOpacity: SpringValue<number>;
    activeCategory: "Contacts" | "Skills" | "Projects";
};

const DreiText = animated(Text);

const RenderText = ({
    texts,
    textOpacity,
}: {
    texts: string[];
    textOpacity: SpringValue<number>;
}) => (
    <animated.group>
        {texts?.map((text, index) => (
            <DreiText
                key={text}
                fillOpacity={textOpacity}
                fontSize={0.4}
                position={[0, 1.5 - index * 0.5, 5]}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </DreiText>
        ))}
    </animated.group>
);

const Overlay = ({
    color,
    opacity,
}: {
    color: string;
    opacity: SpringValue<number>;
}) => (
    <mesh position={[0, 0, -5]}>
        <planeGeometry args={[window.innerWidth, window.innerHeight]} />
        <animated.meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
        />
    </mesh>
);

const Space: FC<SpaceProps> = ({
    color,
    opacity,
    activeCategory,
    textOpacity,
}) => {
    const contentMap = useMemo(
        () => ({
            Contacts: [
                "Contact Info:",
                "Email: example@mail.com",
                "Phone: +123 456 7890",
            ],
            Skills: ["Skills:", "- React", "- JavaScript", "- TypeScript"],
            Projects: ["Project 1", "Project 2", "Project 3"],
        }),
        []
    );

    return (
        <Fragment>
            <Overlay opacity={opacity} color={color} />
            {activeCategory !== "Projects" ? (
                <RenderText
                    texts={contentMap[activeCategory]}
                    textOpacity={textOpacity}
                />
            ) : (
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <animated.group>
                        {contentMap.Projects.map((proj, idx) => (
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
                        ))}
                    </animated.group>
                </Float>
            )}
        </Fragment>
    );
};

export default Space;