import styles from "./font-picker.module.scss";
import FontTools from "../../library/fonts";
import { FontItem, useFontsContext } from "../../contexts/FontsContext";
import React from "react";

export default function FontPicker() {
  const { state, setState } = useFontsContext();

  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  return (
    <div
      data-message={
        state.dirname === null
          ? "Choose a directory with fonts"
          : `Loaded: ${state.dirname}`
      }
      className={styles.container}
    >
      <input
        ref={ref}
        type="file"
        onChange={collectFonts}
        className={styles.input}
        id="fontpicker"
        multiple
      />
    </div>
  );

  async function collectFonts(e: any) {
    if (e.target.files.length === 0) return;
    const { fonts, dir } = await FontTools.collect(e);
    await FontTools.load(fonts);
    setState((s) => ({ ...s, fonts: fonts as FontItem[], dirname: dir }));
  }
}
