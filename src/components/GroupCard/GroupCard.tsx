import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";
import { useMediaQuery } from "react-responsive";

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

    const isMobile = useMediaQuery({ maxWidth: 1024 });

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

    const handleCardClick = (index: number) => onCardClick?.(index);

    return (
        <animated.group ref={meshRef} position={[0, positionY.get(), -2]}>
            {categories.map(
                ({ cardPositionX, categoryTitle, cardColor }, index) => {
                    const isActive = index === activeCardIndex;

                    const positionX = isMobile ? 0 : cardPositionX;
                    const positionY = isMobile ? cardPositionX * 0.8 : 0;

                    return (
                        <Card
                            key={categoryTitle}
                            categoryTitle={categoryTitle}
                            positionX={positionX}
                            positionY={positionY}
                            cardColor={cardColor}
                            showText={showText}
                            categoryLoaded={interactionDisabled}
                            onClick={() =>
                                !interactionDisabled && handleCardClick(index)
                            }
                            isActive={isActive}
                        />
                    );
                }
            )}
        </animated.group>
    );
};

export default GroupCard;