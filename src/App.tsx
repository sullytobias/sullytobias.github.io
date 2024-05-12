import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

const App: FC = () => {
    return (
        <Canvas>
            <OrbitControls />

            <ambientLight />
            <directionalLight position={[5, 5, 0]} />

            <Box
                position={[0, 0, 0]}
                children={<meshPhongMaterial color="grey" />}
            />
        </Canvas>
    );
};

export default App;
