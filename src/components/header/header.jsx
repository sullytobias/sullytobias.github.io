import { useEffect, useRef } from "react";

import gsap from "gsap";

import Menu from "../menu/menu";

import "./header.scss";

const Header = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(headerRef.current, {
            background: "rgba(0, 0, 0, 0.5)",
            duration: 0.3,
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                tl.play();
            } else {
                tl.reverse();
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {
                tl.kill();
            });
        };
    }, []);

    return (
        <header ref={headerRef} className="Header">
            <Menu />
        </header>
    );
};

export default Header;
