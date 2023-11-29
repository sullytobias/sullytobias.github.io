import "./section.scss";

function Section({ children, className, title, anchor }) {
    return (
        <section id={anchor} className={`Section ${className}`}>
            {title && <h2 className="Section__title">{title}</h2>}
            {children}
        </section>
    );
}

export default Section;
