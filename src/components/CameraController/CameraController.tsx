import { useSpring } from "@react-spring/three";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

type CameraControllerProps = {
    targetPosition: [number, number, number];
    enteringSphere: boolean;
};

const CameraController: React.FC<CameraControllerProps> = ({
    enteringSphere,
    targetPosition,
}) => {
    const { camera } = useThree();
    const vec = useRef(new Vector3()); // Helper vector for smooth transitions

    const { cameraPosition, lookAtPosition } = useSpring({
        cameraPosition: enteringSphere ? targetPosition : [0, 0, 10],
        lookAtPosition: enteringSphere ? targetPosition : [0, 0, 0],
        config: { mass: 1, tension: 100, friction: 26, duration: 1000 }, // Adjust for smoothness
    });

    // Use `useFrame` to continuously update the camera's position and where it looks at
    useFrame(() => {
        camera.position.lerp(
            vec.current.set(...cameraPosition.get()),
            0.05 // Controls the smoothness of the movement
        );
        camera.lookAt(vec.current.set(...lookAtPosition.get()));
    });

    return null;
};

export default CameraController;