import { FC, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Html, Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const AnimatedText = animated(Text);

const FaLinkedinAnimated = animated(FaLinkedin);
const FaGithubAnimated = animated(FaGithub);
const FaEnvelopeAnimated = animated(FaEnvelope);

const iconsArray = [FaEnvelopeAnimated, FaGithubAnimated, FaLinkedinAnimated];

const ContactInfo: FC = () => {
    const iconScale = 3;

    const nameSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 2500 },
    });

    const iconSprings = [
        useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1000 }),
        useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1200 }),
        useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1400 }),
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleEmailClick = () => window.open("mailto:sullytobias@gmail.com");
    const handleOtherClick = (href: string) => window.open(href, "_blank");

    const handlePointerOver = (index: number) => setHoveredIndex(index);
    const handlePointerOut = () => setHoveredIndex(null);

    return (
        <group position={[0, 0, 0]}>
            <AnimatedText
                fillOpacity={nameSpring.opacity}
                position={[0, 2, 0]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Sullivan TOBIAS
            </AnimatedText>

            {iconsArray.map((Icon, index) => (
                <animated.group
                    key={index}
                    position={[-1.5 + index * 1.5, 0, 0]}
                >
                    <Html center>
                        <Icon
                            onPointerOver={() => handlePointerOver(index)}
                            onPointerOut={handlePointerOut}
                            opacity={iconSprings[index].opacity}
                            style={{
                                cursor: "pointer",
                                fontSize: `${iconScale}rem`,
                                color: "#FFFC31",
                                transform:
                                    hoveredIndex === index
                                        ? "scale(1.2)"
                                        : "scale(1)",
                                transition: "transform 0.2s",
                            }}
                            onClick={
                                index === 0
                                    ? handleEmailClick
                                    : () =>
                                          handleOtherClick(
                                              index === 1
                                                  ? "https://github.com/sullytobias"
                                                  : "https://www.linkedin.com/in/sullivan-tobias-340807157"
                                          )
                            }
                        />
                    </Html>
                </animated.group>
            ))}
        </group>
    );
};

export default ContactInfo;
