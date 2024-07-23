// src/components/TypingText.tsx
import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

type TypingTextProps = {
    text: string;
};

const TypingText: React.FC<TypingTextProps> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 100); // Adjust typing speed here
            return () => clearTimeout(timeoutId);
        }
    }, [index, text]);

    const { opacity } = useSpring({
        opacity: displayedText ? 1 : 0,
        config: { duration: 2000 },
    });

    return (
        <animated.mesh>
            <Text
                color="white"
                fontSize={0.4}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                position={[0, 0, 0]} // Adjust the position as needed
            >
                <animated.meshStandardMaterial opacity={opacity} transparent />
                {displayedText}
            </Text>
        </animated.mesh>
    );
};

export default TypingText;
