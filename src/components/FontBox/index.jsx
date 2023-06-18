import Stat from "../Stat";
import Range from "../Range";
import { Link } from "react-router-dom";
import styles from "./font-box.module.scss";
import { useFonts } from "../../contexts/FontsContext";
import FontConvertButton from "../FontConvertButton/index";
import { useRecoilValue } from "recoil";
import { globalFontSizeAtom, globalTextAtom } from "../../store/atoms";

function renderSize(val) {
    return (
        <div className="stat__list">
            <Stat value={val} unit={"px"} /> | <Stat value={(val * 0.75).toFixed(2)} unit="pt" /> | <Stat value={(val / 16).toFixed(2)} unit="rem" />
        </div>
    );
}

export default function FontBox(props) {

    const [size, setSize] = React.useState(40);
    const globalText = useRecoilValue(globalTextAtom);
    const [value, setValue] = React.useState(globalText);
    const globalFontSize = useRecoilValue(globalFontSizeAtom);
    const { hasDefaults } = useFonts();
    // useFont()
    function changeFontSize(e) {
        setSize(e.target.value);
    }

    React.useEffect(() => setSize(globalFontSize), [globalFontSize]);
    React.useEffect(() => setValue(globalText), [globalText]);

    const textRef = React.useRef(null);

    return (
        <article className={styles.box}>
            <div className={classes(css.dFlex, css.alignCenter, styles.header)}>
                <Link to={`/font/${props.id}`}>
                    <h3>{props.name}</h3>
                </Link>
                {!hasDefaults && <FontConvertButton font={props.font} name={props.name} id={props.id} />}
            </div>
            <div className={styles.value}>
                <input
                    ref={textRef}
                    onChange={e => setValue(e.target.value)}
                    style={{
                        fontFamily: `${props.name.trim()}`,
                        fontSize: `${size}px`
                    }}
                    type="text"
                    value={value}
                />
            </div>
            <div className={styles.sizer}>
                <Range
                    onInput={changeFontSize}
                    className={styles.sizer}
                    min="4" max="96" value={size}
                />
                <div className={styles.sizerLabel}>{renderSize(size)}</div>
            </div>
        </article>
    );
}
