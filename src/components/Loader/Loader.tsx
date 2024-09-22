import { FC } from "react";
import "./Loader.scss";

const Loader: FC = () => (
    <div className="loader">
        <div className="loader-bar left" />
        <div className="loader-bar right" />
    </div>
);

export default Loader;
