import { useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

type CameraControllerProps = {
    targetPosition: [number, number, number];
    enteringSphere: boolean;
};

const CameraController: React.FC<CameraControllerProps> = ({
    enteringSphere,
    targetPosition,
}) => {
    const { camera } = useThree();
    const vec = useRef(new Vector3());

    // Declare spring values for camera position and lookAt position
    const { cameraPosition, lookAtPosition } = useSpring({
        cameraPosition: enteringSphere ? targetPosition : [0, 0, 10],
        lookAtPosition: enteringSphere ? targetPosition : [0, 0, 0],
        config: { mass: 1, tension: 100, friction: 26, duration: 1000 },
    });

    useFrame(() => {
        const [x, y, z] = cameraPosition.get();
        const [lookX, lookY, lookZ] = lookAtPosition.get();

        camera.position.lerp(vec.current.set(x, y, z), 0.05);
        camera.lookAt(vec.current.set(lookX, lookY, lookZ));
    });

    return null;
};

export default CameraController;
