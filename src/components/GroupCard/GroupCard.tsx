import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";

import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

type CategoryType = {
    cardPositionX: number;
    categoryTitle: string;
    cardColor: string;
};

type GroupCardProps = {
    lightOn: boolean;
    onCardClick?: (index: number) => void;
    categories: CategoryType[];
    activeCardIndex: number;
    interactionDisabled: boolean;
};

const GroupCard: React.FC<GroupCardProps> = ({
    lightOn,
    onCardClick,
    categories,
    activeCardIndex,
    interactionDisabled,
}) => {
    const meshRef = useRef<Group>(null!);
    const [showText, setShowText] = useState(false);

    const { positionY } = useSpring({
        positionY: lightOn ? 0 : 5,
        config: { duration: 1000 },
        onRest: () => setShowText(true),
    });

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const time = clock.getElapsedTime();
            meshRef.current.position.y =
                positionY.get() + Math.sin(time * 2) * 0.2;
        }
    });

    const isActiveCard = (index: number) => index === activeCardIndex;

    return (
        <animated.group ref={meshRef} position={[0, positionY.get(), -2]}>
            {categories.map(
                ({ cardPositionX, categoryTitle, cardColor }, index) => (
                    <Card
                        categoryTitle={categoryTitle}
                        showText={showText}
                        lightOn={lightOn}
                        positionX={cardPositionX}
                        onClick={() =>
                            !interactionDisabled && onCardClick?.(index)
                        }
                        enteringSphere={isActiveCard(index)}
                        cardColor={cardColor}
                    />
                )
            )}
        </animated.group>
    );
};

export default GroupCard;