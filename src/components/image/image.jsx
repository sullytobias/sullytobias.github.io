import "./image.scss";

function Image({ src, alt }) {
    return (
        <div className="Image">
            <img src={src} alt={alt} className="Image__img" />
        </div>
    );
}

export default Image;
