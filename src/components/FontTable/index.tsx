import FontBox from "../FontBox";
import styles from "./font-table.module.scss";
import Loading from "../Loading";
import { useFonts } from "../../contexts/FontsContext";
import React from "react";
import { useRecoilValue } from "recoil";
import { fontsAtom } from "../../store/atoms";

export default function FontTable() {
  const fonts = useRecoilValue(fontsAtom);
  const { useLoad } = useFonts();
  useLoad();
  return (
    <section className={styles.table}>
      {fonts.map((font: any, i: number) => {
        return <FontBox id={font.id} font={font} name={font.name} key={i} />;
      })}
    </section>
  );
}
