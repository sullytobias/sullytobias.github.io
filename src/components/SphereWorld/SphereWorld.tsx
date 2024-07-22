import React from "react";

const SphereWorld: React.FC = () => {
    return (
        <mesh>
            <sphereGeometry args={[100, 64, 64]} />
            <meshBasicMaterial side={1} />
        </mesh>
    );
};

export default SphereWorld;
