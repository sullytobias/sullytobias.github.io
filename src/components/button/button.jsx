import { useEffect, useRef } from "react";

import gsap from "gsap";

import "./button.scss";

const Button = ({ text, delay }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.to(buttonRef.current, {
            y: 20,
            ease: "power2.out",
            delay: delay,
            opacity: 1,
            duration: 2,
        });
    }, []);

    return (
        <button ref={buttonRef} className="Button hoverable">
            {text}
            <div className="gradient-border" />
        </button>
    );
};

export default Button;
