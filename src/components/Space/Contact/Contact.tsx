import { FC, useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Html } from "@react-three/drei";
import { useSprings, animated } from "@react-spring/three";
import { colorPalette } from "../../../utils/constants";

const FaLinkedinAnimated = animated(FaLinkedin);
const FaGithubAnimated = animated(FaGithub);
const FaEnvelopeAnimated = animated(FaEnvelope);

const iconsArray = [FaEnvelopeAnimated, FaGithubAnimated, FaLinkedinAnimated];

const ContactInfo: FC = () => {
    const iconScale = 4;
    const [imageLoaded, setImageLoaded] = useState(false);

    // Preload the image on component mount
    useEffect(() => {
        const img = new Image();
        img.src = "/assets/contact.jpg";
        img.onload = () => setImageLoaded(true);
    }, []);

    // Use useSprings for multiple springs in a single array
    const springs = useSprings(
        iconsArray.length,
        iconsArray.map((_, index) => ({
            opacity: imageLoaded ? 1 : 0,
            delay: imageLoaded ? 200 * (index + 1) : 0,
            from: { opacity: 0 },
        }))
    );

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleEmailClick = () => window.open("mailto:sullytobias@gmail.com");
    const handleOtherClick = (href: string) => window.open(href, "_blank");

    const handlePointerOver = (index: number) => setHoveredIndex(index);
    const handlePointerOut = () => setHoveredIndex(null);

    return (
        <group position={[0, 0, 0]}>
            <Html center position={[0, 2, 0]}>
                {imageLoaded && (
                    <img
                        src="/assets/contact.jpg"
                        alt="Profile"
                        style={{
                            width: "20rem",
                            borderRadius: "16px",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </Html>
            {iconsArray.map((Icon, index) => (
                <animated.group key={index} position={[-2 + index * 2, -2, 0]}>
                    <Html center>
                        <Icon
                            onPointerOver={() => handlePointerOver(index)}
                            onPointerOut={handlePointerOut}
                            style={{
                                cursor: "pointer",
                                fontSize: `${iconScale}rem`,
                                color: colorPalette.white,
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
                            {...springs[index]} // Apply spring styles directly from useSprings
                        />
                    </Html>
                </animated.group>
            ))}
        </group>
    );
};

export default ContactInfo;
