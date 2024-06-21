import React from "react";

const SphereWorld: React.FC = () => {
    return (
        <mesh>
            <sphereGeometry args={[100, 64, 64]} />
            <meshPhongMaterial color="black" side={1} />
        </mesh>
    );
};

export default SphereWorld;
