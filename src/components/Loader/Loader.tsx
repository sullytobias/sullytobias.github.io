import { FC } from "react";

import "./Loader.scss";

const Loader: FC = () => {
    return (
        <div className="loader">
            <div className="loader-bar left"></div>
            <div className="loader-bar right"></div>
        </div>
    );
};

export default Loader;
