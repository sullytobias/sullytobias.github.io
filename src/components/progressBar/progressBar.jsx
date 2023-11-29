import { useState, useEffect } from "react";
import "./progressBar.scss";

const ProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const calculateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight =
            document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;

        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener("scroll", calculateScrollProgress);

        return () => {
            window.removeEventListener("scroll", calculateScrollProgress);
        };
    }, []);

    return (
        <div className="ProgressBar" style={{ width: `${scrollProgress}%` }} />
    );
};

export default ProgressBar;
