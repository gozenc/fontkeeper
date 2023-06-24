import styles from "./font-glyph.module.scss";

export default function FontGlyph(props) {
  const character = String.fromCharCode(props.data.unicode);
  return (
    <FontGlyphWrapper
      unicode={props.data.unicode}
      character={character}
      name={props.data.name}
    />
  );
}

export function FontGlyphWrapper(props) {
  return (
    <div className={`${styles.glyph} d-flex align-center justify-center`}>
      <span className={styles.unicode}>{props.unicode}</span>
      <span className={styles.char}>{props.character}</span>
      <span className={styles.name}>{props.name}</span>
    </div>
  );
}
