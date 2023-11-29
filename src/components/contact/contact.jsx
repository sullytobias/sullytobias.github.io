import Icon from "../icon/icon";
import Image from "../image/image";
import Paragraph from "../paragraph/paragraph";
import Title from "../title/title";
import CopyToClipboardEmail from "./copyToClipboard/copyToClipboard";

import "./contact.scss";

const Contact = () => {
    return (
        <div className="Contact">
            <div className="Contact__info">
                <Title text="Contact information" />
                <Paragraph text="Feel free to reach out to me for any inquiries or questions." />
                <CopyToClipboardEmail />
                <div className="Contact__socials">
                    <Icon
                        url="https://github.com/sullytobias"
                        brand="github-icon"
                    />
                    <Icon
                        url="https://www.linkedin.com/in/sullivan-tobias-340807157/"
                        brand="linkedin"
                    />
                </div>
            </div>
            <Image src="assets/contact.png" />
        </div>
    );
};

export default Contact;
