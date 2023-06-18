import styles from "./toast.module.scss";
import Portal, { usePortalRef } from "./Portal";

function createToast(text) {
    const elem = document.createElement("output");
    elem.classList.add(styles.toast);
    elem.setAttribute("role", "status");
    elem.innerText = text;
    return elem;
}

async function waitForAnimation(toast) {
    return new Promise(async (resolve, reject) => {
        await Promise.allSettled(
            toast.getAnimations()
                .map(animation => animation.finished)
        );
        resolve();
    });
}

export default function Toaster({ text, position = "left" }) {

    const ref = usePortalRef(`.${styles.group}`);

    function addToast(toast) {
        const { matches: motionOK } = window.matchMedia
            ("(prefers-reduced-motion: no-preference)");
        ref.children.length && motionOK
            ? flipToast(toast, ref)
            : ref.appendChild(toast);
        waitForAnimation(toast)
            .then(() => toast.remove());
    }

    function flipToast(toast, wrapper) {
        const first = wrapper.offsetHeight;
        wrapper.appendChild(toast);
        const last = wrapper.offsetHeight;
        const invert = last - first;
        const animation = wrapper.animate([
            { transform: `translateY(${invert}px)` },
            { transform: `translateY(0)` },
        ], {
            duration: 150,
            easing: "ease-out"
        });
        animation.startTime = document.timeline.currentTime;
    }

    React.useEffect(() => {
        if (text) {
            addToast(createToast(text));
        }
    }, [text]);

    return (
        <Portal className={classes(styles.group, styles[position])} />
    );
}