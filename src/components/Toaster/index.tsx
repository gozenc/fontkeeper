import styles from "./toast.module.scss";
import Portal, { usePortalRef } from "./Portal";
import React from "react";

interface ToasterProps {
  text: string;
  position?: "left" | "right";
}

export default function Toaster({ text, position = "left" }: ToasterProps) {
  const ref = usePortalRef(`.${styles.group}`);

  React.useEffect(() => {
    if (text) {
      addToast(createToast(text));
    }
  }, [text]);

  return <Portal className={classes(styles.group, styles[position])} />;

  function addToast(toast: HTMLElement) {
    const { matches: motionOK } = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );
    ref.children.length && motionOK
      ? flipToast(toast, ref)
      : ref.appendChild(toast);
    waitForAnimation(toast).then(() => toast.remove());
  }

  function flipToast(toast: HTMLElement, wrapper: HTMLElement) {
    const first = wrapper.offsetHeight;
    wrapper.appendChild(toast);
    const last = wrapper.offsetHeight;
    const invert = last - first;
    const animation = wrapper.animate(
      [
        { transform: `translateY(${invert}px)` },
        { transform: `translateY(0)` },
      ],
      {
        duration: 150,
        easing: "ease-out",
      }
    );
    animation.startTime = document.timeline.currentTime;
  }
}

function createToast(text: string) {
  const elem = document.createElement("output");
  elem.classList.add(styles.toast);
  elem.setAttribute("role", "status");
  elem.innerText = text;
  return elem;
}

async function waitForAnimation(toast: HTMLElement) {
  return new Promise(async (resolve) => {
    await Promise.allSettled(
      toast.getAnimations().map((animation) => animation.finished)
    );
    resolve(void 0);
  });
}
