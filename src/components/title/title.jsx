import { useRef, useEffect } from "react";

import gsap from "gsap";

import "./title.scss";

const Title = ({ text, animationTime, delay, noWrapped }) => {
    const ref = useRef(null);

    useEffect(() => {
        const scribeAnimation = gsap.timeline({ repeat: 0 });

        scribeAnimation.fromTo(
            ref.current,
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
        <h1 ref={ref} className={`Title ${noWrapped && "noWrapped"}`}>
            {text}
        </h1>
    );
};

export default Title;
