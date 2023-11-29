import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

import "./skills.scss";

const Skills = ({ skills }) => {
    const skillsRef = useRef(null);

    useEffect(() => {
        const skills = skillsRef.current.children;

        gsap.to(skills, {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 80%",
            },
        });
    }, []);

    return (
        <div className="Skills" ref={skillsRef}>
            {skills.map((skill) => (
                <div key={skill.name} className="skill">
                    <img src={`assets/${skill.image}`} alt={skill.name} />
                </div>
            ))}
        </div>
    );
};

export default Skills;
