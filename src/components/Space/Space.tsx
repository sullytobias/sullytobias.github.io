import { FC, Fragment, useMemo, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import { SpringValue } from "@react-spring/web";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import ContactInfo from "./Contact/Contact";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import { colorPalette } from "../../utils/constants";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: "CONTACTS" | "SKILLS" | "PROJECTS";
};

type SnowFlakesProps = {
    count: number;
    activeCategory: "CONTACTS" | "SKILLS" | "PROJECTS";
};

export const Overlay = ({
    color,
    opacity,
}: {
    color: string;
    opacity: SpringValue<number>;
}) => {
    const { opacity: animatedOpacity } = useSpring({
        opacity: opacity,
        config: { duration: 500 },
    });

    return (
        <mesh position={[0, 0, -5]}>
            <planeGeometry args={[window.innerWidth, window.innerHeight]} />
            <animated.meshStandardMaterial
                color={color}
                transparent
                opacity={animatedOpacity}
            />
        </mesh>
    );
};

const Snowflakes = ({ count = 100, activeCategory }: SnowFlakesProps) => {
    const { opacity: animatedOpacity } = useSpring({
        opacity: activeCategory ? 0 : 1,
        config: { duration: 500 },
    });

    const snowflakesRef = useRef<Mesh[]>([]);
    const positions = useMemo(() => {
        const posArray = [];
        for (let i = 0; i < count; i++) {
            posArray.push({
                x: (Math.random() - 0.5) * 20,
                y: Math.random() * 10,
                z: (Math.random() - 0.5) * 20,
                speed: Math.random() * 0.02 + 0.001,
            });
        }
        return posArray;
    }, [count]);

    useFrame(() => {
        snowflakesRef.current.forEach((flake, i) => {
            if (flake) {
                positions[i].y -= positions[i].speed;

                if (positions[i].y < -5) positions[i].y = 10;
                flake.position.set(
                    positions[i].x,
                    positions[i].y,
                    positions[i].z
                );
            }
        });
    });

    return (
        <group>
            {positions.map((pos, i) => (
                <mesh
                    key={i}
                    ref={(el) => (snowflakesRef.current[i] = el!)}
                    position={[pos.x, pos.y, pos.z]}
                >
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <animated.meshBasicMaterial
                        opacity={animatedOpacity}
                        transparent
                        color={colorPalette.silverLakeBlue}
                    />
                </mesh>
            ))}
        </group>
    );
};

const Space: FC<SpaceProps> = ({ color, opacity, activeCategory }) => {
    const contentMap = useMemo(
        () => ({
            CONTACTS: <ContactInfo />,
            SKILLS: <Skills />,
            PROJECTS: <Projects />,
        }),
        []
    );

    return (
        <Fragment>
            <Overlay opacity={opacity} color={color} />
            <Snowflakes activeCategory={activeCategory} count={70} />
            {contentMap[activeCategory]}
        </Fragment>
    );
};

export default Space;