interface TrailerTextProps {
    title: string;
    text: string;
    animationStyle: string;
}

export function TrailerText({
    title,
    text,
    animationStyle,
}: TrailerTextProps) {
    const animationClass =
        getAnimationClass(animationStyle);

    return (
        <div
            className={`position-absolute top-50 start-50 translate-middle text-center text-white ${animationClass}`}
            style={{
                width: "90%",
                textShadow:
                    "0 2px 8px rgba(0, 0, 0, 0.9)",
            }}
        >
            {text && (
                <div className="text-uppercase small fw-semibold mb-2">
                    {text}
                </div>
            )}

            <div className="display-5 fw-bold">
                {title}
            </div>
        </div>
    );
}

function getAnimationClass(
    animationStyle: string
): string {
    switch (animationStyle.toLowerCase()) {
        case "fade":
            return "trailer-fade";

        case "zoom":
            return "trailer-zoom";

        case "slide":
            return "trailer-slide";

        case "dramatic":
            return "trailer-dramatic";

        default:
            return "trailer-fade";
    }
}