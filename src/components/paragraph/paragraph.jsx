import { useRef, useEffect } from "react";

import gsap from "gsap";

import "./paragraph.scss";

const Paragraph = ({ text, animationTime, delay }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const scribeAnimation = gsap.timeline({ repeat: 0 });

        scribeAnimation.fromTo(
            textRef.current,
            { width: 0 },
            {
                width: "100%",
                duration: animationTime,
                delay: delay,
                ease: "power2.inOut",
            }
        );
    }, []);

    return (
        <div className="Paragraph" ref={textRef}>
            {text}
        </div>
    );
};

export default Paragraph;
