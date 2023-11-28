import "./section.scss";

function Section({ children, className }) {
    return <section className={`Section ${className}`}>{children}</section>;
}

export default Section;
