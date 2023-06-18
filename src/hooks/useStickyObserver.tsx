import React from "react";

export default function useStickyObserver(selector: string, events?: { onLeave?: () => void, onEnter?: () => void; }) {
    const [isSticky, setIsSticky] = React.useState(false);

    const [elementToObserve] = React.useState(() => {
        return document.querySelector(selector);
    });

    React.useEffect(() => {
        // const elementToObserve = document.querySelector(selector);
        if (!elementToObserve) return;
        const handler = (entries: IntersectionObserverEntry[]) => {
            if (!entries[0].isIntersecting) {
                (events && events.onEnter) ? events.onEnter() : undefined;
                setIsSticky(true);
            } else {
                (events && events.onLeave) ? events.onLeave() : undefined;
                setIsSticky(false);
            }
        };
        const observer = new window.IntersectionObserver(handler);
        observer.observe(elementToObserve);
        return () => observer.disconnect();
    }, [elementToObserve]);

    return isSticky;
}