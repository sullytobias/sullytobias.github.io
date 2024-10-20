import { FC, Fragment, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { SpringValue } from "@react-spring/web";
import {
    Euler,
    useFrame,
    useThree,
    type Vector3 as Vector3Type,
} from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
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
    activeCategory,
}: {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: "CONTACTS" | "SKILLS" | "PROJECTS";
}) => {
    const isProjects = activeCategory === "PROJECTS";

    const planeWidth = isProjects ? 80 : window.innerWidth;
    const planeHeight = isProjects ? 80 : window.innerHeight;

    const { opacity: animatedOpacity } = useSpring({
        opacity: opacity,
        config: { duration: 500 },
    });

    const position: Vector3Type = isProjects ? [0, -3, 0] : [0, 0, -5];
    const rotation: Euler = isProjects ? [-Math.PI / 2, 0, 0] : [0, 0, 0];

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <animated.meshStandardMaterial
                color={color}
                transparent
                opacity={animatedOpacity}
            />
        </mesh>
    );
};

const Snowflakes = ({ count = 100, activeCategory }: SnowFlakesProps) => {
    const [countedFlakes, setCountedFlakes] = useState(count);
    const { opacity: animatedOpacity } = useSpring({
        opacity: activeCategory ? 0 : 1,
        config: { duration: 1000 },
        onRest: () => activeCategory && setCountedFlakes(0),
    });

    const snowflakesRef = useRef<Mesh[]>([]);
    const positions = useMemo(() => {
        const posArray = [];
        for (let i = 0; i < countedFlakes; i++) {
            posArray.push({
                x: (Math.random() - 0.5) * 20,
                y: Math.random() * 10,
                z: (Math.random() - 0.5) * 20,
                speed: Math.random() * 0.02 + 0.001,
            });
        }
        return posArray;
    }, [countedFlakes]);

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
                    <sphereGeometry args={[0.05, 3, 3]} />
                    <animated.meshStandardMaterial
                        opacity={animatedOpacity}
                        transparent
                        wireframe
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

    const { camera } = useThree();

    const { cameraPosition } = useSpring({
        cameraPosition: activeCategory === "PROJECTS" ? [0, 8, 4] : [0, 0, 10],
        config: { tension: 300, friction: 50 },
    });

    useFrame(() => {
        const [x, y, z] = cameraPosition.get();
        camera.position.lerp(new Vector3(x, y, z), 0.1);
        camera.lookAt(0, 0, 0);
    });

    return (
        <Fragment>
            <Overlay
                activeCategory={activeCategory}
                opacity={opacity}
                color={color}
            />
            <Snowflakes activeCategory={activeCategory} count={70} />
            {contentMap[activeCategory]}
        </Fragment>
    );
};

export default Space;
