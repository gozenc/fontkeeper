import { createPortal } from "react-dom";

export default function Portal({ children, className = 'zen-portal-root', el = 'div' }) {
    const [container] = React.useState(() => {
        return document.createElement(el);
    });

    React.useLayoutEffect(() => {
        container.className += className;
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return createPortal(children, container);
}

export function usePortalRef(selector) {
    const [ref, setRef] = React.useState(null);

    React.useLayoutEffect(() => {
        setRef(document.querySelector(selector));
    }, []);

    return ref;
}