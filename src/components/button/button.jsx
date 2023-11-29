import { useEffect, useRef } from "react";

import gsap from "gsap";

import "./button.scss";

const Button = ({ text, delay, anchor }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.to(buttonRef.current, {
            y: 50,
            ease: "power2.out",
            delay: delay,
            opacity: 1,
            duration: 1.5,
        });
    }, []);

    return (
        <a href={`#${anchor}`} ref={buttonRef} className="Button hoverable">
            {text}
            <div className="gradient-border" />
        </a>
    );
};

export default Button;
