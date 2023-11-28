import { useState, useEffect } from "react";

import gsap from "gsap";

import "./menu.scss";

const MENU = [
    { label: "Home", anchor: "#home" },
    { label: "Works", anchor: "#works" },
    { label: "Skills", anchor: "#skills" },
    { label: "Contact", anchor: "#contact" },
];

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const menu = document.querySelector(".Menu__content");

        if (isMenuOpen) {
            gsap.to(menu, {
                display: "flex",
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut",
            });
        } else {
            gsap.to(menu, {
                opacity: 0,
                scale: 0.5,
                duration: 0.2,
                ease: "power2.inOut",
                onComplete: () => {
                    menu.style.display = "none";
                },
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleText = isMenuOpen ? "Close" : "Menu";

    return (
        <div className="Menu">
            <button className="Menu__button hoverable" onClick={toggleMenu}>
                {toggleText}
            </button>
            <div className={`Menu__content ${isMenuOpen ? "open" : ""}`}>
                {MENU.map((item, index) => (
                    <a key={index} href={item.anchor} className="hoverable">
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Menu;
