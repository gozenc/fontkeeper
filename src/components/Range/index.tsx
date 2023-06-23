import React from "react";
import "./style.scss";

export default function Range(props: React.HTMLProps<HTMLInputElement>) {
  function setBgSize(input: HTMLInputElement) {
    input.style.setProperty("--background-size", `${getBgSize(input)}%`);
  }

  function getBgSize(input: HTMLInputElement) {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const value = +input.value;
    const size = ((value - min) / (max - min)) * 100;
    return size;
  }

  React.useLayoutEffect(() => {
    setBgSize(rangeRef.current);
  }, [props.value]);

  const className = `range${props.className ? ` ${props.className}` : ""}`;
  const rangeRef = React.useRef(null);

  return (
    <input
      {...props}
      type="range"
      onInput={(e) => {
        props.onInput ? props.onInput(e) : undefined;
        setBgSize(e.target as HTMLInputElement);
      }}
      ref={rangeRef}
      className={className}
    />
  );
}
