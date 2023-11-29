import "./card.scss";

const Card = ({ imageUrl, title, description, to }) => {
    return (
        <a
            rel="noreferrer"
            target="_blank"
            href={to}
            className="Card hoverable"
        >
            {imageUrl && (
                <img src={imageUrl} alt={title} className="Card__image" />
            )}
            <div className="Card__content">
                <h2 className="Card__title">{title}</h2>
                <p className="Card__description">{description}</p>
            </div>
        </a>
    );
};

export default Card;
