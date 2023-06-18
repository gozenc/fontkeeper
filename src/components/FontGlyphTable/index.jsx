import { useFonts } from "../../contexts/FontsContext";
import { debuggy } from "../../library/utils";
import FontGlyph from "../FontGlyph";
import { FontGlyphWrapper } from "../FontGlyph/index";
import styles from "./font-glyph-table.module.scss";
import { parse } from "../../library/csv";

export default function FontGlyphTable(props) {
    const [glyphs, setGlyphs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { fonts, hasDefaults } = useFonts();

    const isDefaultFont = props.data === undefined;

    const [defaultChars, setDefaultChars] = React.useState(null);
    const [glyphCount, setGlyphCount] = React.useState(props.data
        ? props.data.nGlyphs
            ? props.data.nGlyphs : props.data.numGlyphs
                ? props.data.numGlyphs : "Glyph num not found"
        : 0);

    async function fetchASCII() {
        fetch("/public/ascii.json")
            .then(response => response.json())
            .then(res => res.slice(12))
            .then(res => {
                setDefaultChars(res);
                setGlyphCount(res.length);
            });
    }
    React.useEffect(() => {
        if (isDefaultFont) {
            fetchASCII();
            return null;
        }
        const passedGlyphs = Object.values(props.data.glyphs.glyphs);
        setGlyphs(passedGlyphs);
        console.log("fontGlyphTable::init");
    }, []);

    React.useEffect(() => {
        if (glyphs.length > 0) {
            setLoading(false);
        }
    }, [glyphs]);

    const defaultFamilyName = hasDefaults ? fonts[props.id - 1].name : props.title;

    return (
        <section>
            <div>
                <h1>{props.title ? props.title.trim() : defaultFamilyName}</h1>
                <h5>{glyphCount} glyphs found</h5>
            </div>
            <div className={styles.table} style={{ fontFamily: props.title ? `${props.title.trim()}` : defaultFamilyName, }}>
                {
                    defaultChars && (
                        defaultChars.map((glyph, i) => {
                            return <FontGlyphWrapper key={i} unicode={glyph.code} name={glyph.name} character={glyph.character} />;
                        })
                    )
                }
                {
                    (!isDefaultFont && !loading) && glyphs.map((font, i) => <FontGlyph key={i} data={font} />)
                }
            </div>
        </section>
    );
}
