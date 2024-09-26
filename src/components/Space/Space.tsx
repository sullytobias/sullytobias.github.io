import { FC, Fragment, useMemo, useRef } from "react";
import { animated, SpringValue } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import ContactInfo from "./Contact/Contact";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: "Contacts" | "Skills" | "Projects";
};

// Overlay component for background color and opacity
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

const Snowflakes = ({ count = 100 }) => {
    const snowflakesRef = useRef<Mesh[]>([]);
    const positions = useMemo(() => {
        const posArray = [];
        for (let i = 0; i < count; i++) {
            posArray.push({
                x: (Math.random() - 0.5) * 20,
                y: Math.random() * 10 + 5,
                z: (Math.random() - 0.5) * 20,
                speed: Math.random() * 0.02 + 0.01,
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
                    <sphereGeometry args={[0.05, 8, 8]} />{" "}
                    {/* Small sphere for snowflake */}
                    <meshBasicMaterial color="white" />
                </mesh>
            ))}
        </group>
    );
};

const Space: FC<SpaceProps> = ({ color, opacity, activeCategory }) => {
    const contentMap = useMemo(
        () => ({
            Contacts: <ContactInfo />,
            Skills: <Skills />,
            Projects: <Projects />,
        }),
        []
    );

    return (
        <Fragment>
            <Overlay opacity={opacity} color={color} />
            <Snowflakes count={150} /> {/* Add the Snowflakes here */}
            {contentMap[activeCategory]}
        </Fragment>
    );
};

export default Space;
