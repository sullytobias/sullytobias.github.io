// src/components/Loader.tsx
import React from "react";

import "./Loader.scss";

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <div className="loader-bar left"></div>
            <div className="loader-bar right"></div>
        </div>
    );
};

export default Loader;
