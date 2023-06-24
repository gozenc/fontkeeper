import { convertSingleFile } from "../../tools/utils";
import { FontItem, useFontsContext } from "../../contexts/FontsContext";
import { camelToSentence } from "../../library/utils";
import styles from "./font-convert-button.module.scss";
import Dropdown from "../Dropdown/index";
import Icon from "../Icon/index";
import React from "react";

export default function FontConvertButton(props: FontItem) {
  const { getFont, setConvertedMessage } = useFontsContext();
  const [converted, setConverted] = React.useState(null);
  const [selectedFormat, setSelectedFormat] = React.useState<any>(
    props.ext === "woff2" || props.ext === "woff" || props.ext === "ttf"
      ? "otf"
      : "woff"
  );

  React.useEffect(() => {
    if (converted) {
      const values = Object.values(converted);
      const freshResults = Object.keys(converted).filter(
        (key) => key !== "url" && key !== "output" && key !== "fileName"
      );

      setConvertedMessage(
        freshResults.reduce((acc, cur, i) => {
          return ` ${acc} ${camelToSentence(cur)}: ${values[i]} ${
            i === freshResults.length - 1 ? "" : "•"
          } `;
        }, "✅ ")
      );
    }
  }, [converted]);

  const convertOpts =
    props.ext === "woff2"
      ? ["OTF", "WOFF"]
      : props.ext === "woff"
      ? ["OTF", "WOFF2"]
      : props.ext === "ttf"
      ? ["OTF", "WOFF", "WOFF2"]
      : ["WOFF", "WOFF2"];

  return (
    <div className={styles.container}>
      {converted ? (
        <>
          <a
            href={converted.url}
            className={classes(styles.download, styles.conversion)}
            download={converted.fileName}
          >
            Download {converted.fileName}
          </a>
        </>
      ) : (
        <div className={classes(css.dFlex, styles.wrapper)}>
          <span className={styles.convert}>Convert to</span>
          <Dropdown options={convertOpts} onSelect={handleOptionSelect} />
          <Icon
            onClick={handleConvert}
            type="button"
            name="play_circle_outline"
          />
        </div>
      )}
    </div>
  );

  function handleOptionSelect(val: string) {
    setSelectedFormat(val.toLowerCase());
  }

  async function handleConvert() {
    if (!selectedFormat) {
      throw "Select format please..";
    }
    const fetched = await getFont(props.id);
    console.log("handleConvert::fetched", fetched);
    const newConverted = await convertSingleFile(fetched.file, selectedFormat);
    console.log("handleConvert::converted", newConverted);
    setConverted(newConverted);
  }
}
