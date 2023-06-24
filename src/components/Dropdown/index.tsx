import React from "react";
import "./style.scss";

interface DropdownProps {
  selected?: string | number;
  options: string[] | number[];
  onSelect?: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = React.useState(
    props.selected ? props.selected : props.options[0]
  );
  const [optionsShown, setOptionsShown] = React.useState(false);

  function toggleOptions() {
    return optionsShown
      ? document.removeEventListener("click", handleClickOutside, false)
      : document.addEventListener("click", handleClickOutside, false);
  }

  function handleClickOutside(e: MouseEvent) {
    return dropdownRef.current && dropdownRef.current.contains(e.target)
      ? (e.target as HTMLElement).classList.contains("dropdown__option")
        ? setOptionsShown(false)
        : setOptionsShown(true)
      : setOptionsShown(false);
  }

  const dropdownRef = React.useRef(null);

  function renderOptions(opts: string[] | number[], selected: string | number) {
    return opts.map((opt, i) => (
      <span
        key={i}
        onClick={(e) => {
          const value = (e.target as HTMLSpanElement).innerText;
          setSelected(value);
          return props.onSelect ? props.onSelect(value) : undefined;
        }}
        className={`dropdown__option${opt == selected ? " selected" : ""}`}
      >
        {opt}
      </span>
    ));
  }

  return (
    <div ref={dropdownRef} className="dropdown" onClick={toggleOptions}>
      <div className="dropdown__value">
        {selected}
        <div className="arrow-down" />
      </div>
      <div className={`dropdown__options${optionsShown ? " shown" : ""}`}>
        {renderOptions(props.options, selected)}
      </div>
    </div>
  );
}
