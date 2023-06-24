import Stat from "../Stat";
import Range from "../Range";
import { Link } from "react-router-dom";
import styles from "./font-box.module.scss";
import { FontItem, useFontsContext } from "../../contexts/FontsContext";
import FontConvertButton from "../FontConvertButton/index";
import React from "react";

export default function FontBox(props: FontItem) {
  const { hasDefaults, state } = useFontsContext();
  const [value, setValue] = React.useState(state.globalText);
  const [size, setSize] = React.useState(state.globalFontSize);

  function changeFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    setSize(parseInt(e.target.value));
  }

  React.useEffect(() => setSize(state.globalFontSize), [state.globalFontSize]);
  React.useEffect(() => setValue(state.globalText), [state.globalText]);

  const textRef = React.useRef(null);

  return (
    <article className={styles.box}>
      <div className={classes(css.dFlex, css.alignCenter, styles.header)}>
        <Link to={`/font/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
        {!hasDefaults && <FontConvertButton {...props} />}
      </div>
      <div className={styles.value}>
        <input
          ref={textRef}
          onChange={(e) => setValue(e.target.value)}
          style={{
            fontFamily: `${props.name.trim()}`,
            fontSize: `${size}px`,
          }}
          type="text"
          value={value}
        />
      </div>
      <div className={styles.sizer}>
        <Range
          onInput={changeFontSize}
          className={styles.sizer}
          min="4"
          max="96"
          value={size}
        />
        <div className={styles.sizerLabel}>{renderSize(size)}</div>
      </div>
    </article>
  );
}

function renderSize(val: number) {
  return (
    <div className="stat__list">
      <Stat value={val} unit={"px"} /> |{" "}
      <Stat value={(val * 0.75).toFixed(2)} unit="pt" /> |{" "}
      <Stat value={(val / 16).toFixed(2)} unit="rem" />
    </div>
  );
}
