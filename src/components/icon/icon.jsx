import "./icon.scss";

const Icon = ({ brand, url }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="Icon"
        >
            <img src={`assets/${brand}.svg`} alt={brand} />
        </a>
    );
};

export default Icon;
