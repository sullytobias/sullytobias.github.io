import { useEffect, useState, FC } from "react";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

type TypingTextProps = {
    text: string;
    onComplete: () => void;
};

const TypingText: FC<TypingTextProps> = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeoutId);
        } else onComplete();
    }, [index, text, onComplete]);

    const { opacity } = useSpring({
        opacity: displayedText ? 1 : 0,
        config: { duration: 2000 },
    });

    const getMaxWidth = () => {
        if (window.innerWidth < 600) return 5;
        if (window.innerWidth < 1200) return 8;
        return 10;
    };

    return (
        <animated.mesh>
            <Text
                color="white"
                fontSize={0.4}
                maxWidth={getMaxWidth()}
                lineHeight={2}
                letterSpacing={0.02}
                textAlign="center"
                position={[0, 0, 0]}
            >
                <animated.meshBasicMaterial opacity={opacity} transparent />
                {displayedText}
            </Text>
        </animated.mesh>
    );
};

export default TypingText;
