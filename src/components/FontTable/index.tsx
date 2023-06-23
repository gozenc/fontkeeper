import FontBox from "../FontBox";
import styles from "./font-table.module.scss";
import { useFontsContext } from "../../contexts/FontsContext";

export default function FontTable() {
  const { useLoad, fonts } = useFontsContext();
  useLoad();
  return (
    <section className={styles.table}>
      {fonts.map((font: any, i: number) => (
        <FontBox id={font.id} font={font} name={font.name} key={i} />
      ))}
    </section>
  );
}
