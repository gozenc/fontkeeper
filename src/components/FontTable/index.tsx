import FontBox from "../FontBox";
import styles from "./font-table.module.scss";
import { useFontsContext } from "../../contexts/FontsContext";

export default function FontTable() {
  const { useLoad, state } = useFontsContext();
  useLoad();
  return (
    <section className={styles.table}>
      {state.fonts.map((font: any, i: number) => (
        <FontBox {...font} key={i} />
      ))}
    </section>
  );
}
