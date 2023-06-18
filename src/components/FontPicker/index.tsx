import styles from "./font-picker.module.scss";
import Fonts from "../../library/fonts";
import { useFonts } from "../../contexts/FontsContext";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { dirAtom, fontsAtom } from "../../store/atoms";
import React from "react";

const FontPicker = () => {
  const setFonts = useSetRecoilState(fontsAtom);
  const [dir, setDir] = useRecoilState(dirAtom);

  async function collectFonts(e: any) {
    if (e.target.files.length === 0) {
      return;
    }
    const { fonts, dir } = await Fonts.collect(e);
    await Fonts.load(fonts);
    // setFonts(fonts);
    // setDirname(dir);
    setFonts(fonts);
    setDir(dir);
  }
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  return (
    <div
      data-message={dir === null ? "Select a directory" : `Loaded: ${dir}`}
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
};

export default FontPicker;
