import { useState } from "react";

type ImageRound = "none" | "sm" | "md" | "lg" | "full";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    fallback?: string;
    rounded?: ImageRound;
};

const Image = ({
    src,
    alt="",
    fallback="default-avatar.png",
    rounded="none",
    className="",
    ...props
}: ImageProps) => {
    const [imgSrc, setImgSrc] = useState(src || fallback);

    const roundedClasses = {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    };

    return(
        <img
            {...props}
            src={imgSrc}
            alt={alt}
            className={`${roundedClasses[rounded]} ${className}`}
            onError={() => setImgSrc(fallback)}
        />
    );
}

export default Image;