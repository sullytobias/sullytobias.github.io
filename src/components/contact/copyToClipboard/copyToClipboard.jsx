import { useState, useRef } from "react";

import gsap from "gsap";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "./CopyToClipboard.scss";

const CopyToClipboardEmail = () => {
    const [isCopied, setIsCopied] = useState(false);
    const emailRef = useRef(null);

    const handleCopy = () => {
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleMouseEnter = () => {
        gsap.to(emailRef.current, {
            scale: 1.1,
            color: "#2a9d8f",
            duration: 0.3,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(emailRef.current, {
            scale: 1,
            color: "#333",
            duration: 0.3,
        });
    };

    return (
        <CopyToClipboard text="sullytobias@gmail.com" onCopy={handleCopy}>
            <div
                className={`CopyToClipboard ${isCopied ? "copied" : ""}`}
                ref={emailRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className="email">sullytobias@gmail.com</span>
                <span className="tooltip">
                    {isCopied ? "Copied!" : "Copy to Clipboard"}
                </span>
            </div>
        </CopyToClipboard>
    );
};

export default CopyToClipboardEmail;
