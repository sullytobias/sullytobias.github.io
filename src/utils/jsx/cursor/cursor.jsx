import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import "./cursor.scss";

const Cursor = () => {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trail = trailRef.current;

        document.querySelectorAll(".hoverable").forEach((element) => {
            element.addEventListener("mouseenter", () => {
                gsap.to(cursor, { scale: 3, duration: 0.5 });
                gsap.to(trail, { scale: 0.5, duration: 0.5 });
            });

            element.addEventListener("mouseleave", () => {
                gsap.to(cursor, { scale: 1, duration: 0.5 });
                gsap.to(trail, { scale: 1, duration: 0.5 });
            });
        });

        const moveCursor = (event) => {
            const { clientX, clientY } = event;
            gsap.to(cursor, {
                duration: 0.7,
                left: clientX,
                top: clientY,
                ease: "power2.out",
            });
            gsap.to(trail, {
                duration: 0.7,
                left: clientX + 5,
                top: clientY + 5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        document.addEventListener("mousemove", moveCursor);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <>
            <div className="Cursor" ref={cursorRef}></div>
            <div className="Cursor__trail" ref={trailRef}></div>
        </>
    );
};

export default Cursor;
