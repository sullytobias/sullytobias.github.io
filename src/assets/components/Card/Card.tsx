import React from "react";

type CardProps = {
    positionX: number;
};

const Card: React.FC<CardProps> = ({ positionX }) => (
    <mesh position-x={positionX}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FFFC31" wireframe />
    </mesh>
);

export default Card;
