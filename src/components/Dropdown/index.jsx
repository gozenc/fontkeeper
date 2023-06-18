import "./style.scss";

export default function (props) {

    const [selected, setSelected] = React.useState(props.selected ? props.selected : props.options[0]);
    const [optionsShown, setOptionsShown] = React.useState(false);

    function toggleOptions() {
        return optionsShown
            ? document.removeEventListener("click", handleClickOutside, false)
            : document.addEventListener("click", handleClickOutside, false);
    }

    function handleClickOutside(e) {
        return dropdownRef.current && dropdownRef.current.contains(e.target)
            ? e.target.classList.contains("dropdown__option")
                ? setOptionsShown(false)
                : setOptionsShown(true)
            : setOptionsShown(false);
    }

    const dropdownRef = React.useRef(null);

    function renderOptions(opts, selected) {
        return opts.map((opt, i) =>
            <span
                key={i}
                onClick={e => {
                    e.target.value = e.target.innerText;
                    setSelected(e.target.value);
                    return props.onSelect ? props.onSelect(e) : undefined;
                }}
                className={`dropdown__option${opt == selected ? " selected" : ""}`}>{opt}</span>
        );
    }

    return (
        <div ref={dropdownRef} className="dropdown" onClick={toggleOptions}>
            <div className="dropdown__value">
                {selected}<div className="arrow-down" />
            </div>
            <div className={`dropdown__options${optionsShown ? " shown" : ""}`}>
                {renderOptions(props.options, selected)}
            </div>
        </div>
    );
}