import { useSpring } from "@react-spring/three";
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

    useSpring({
        cameraPosition: enteringSphere ? targetPosition : [0, 0, 10],
        config: { duration: 2000 },
        onChange: ({ value }) => {
            camera.position.set(...value.cameraPosition);
            camera.lookAt(
                targetPosition[0],
                targetPosition[1],
                targetPosition[2]
            );
        },
    });

    return null;
};

export default CameraController;
