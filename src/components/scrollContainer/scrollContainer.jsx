import { useEffect, useRef } from "react";

import gsap from "gsap";

import "./scrollContainer.scss";

const ScrollContainer = ({ children, duration }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(containerRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: duration ?? 1.5,
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="ScrollContainer" ref={containerRef}>
            {children}
        </div>
    );
};

export default ScrollContainer;
