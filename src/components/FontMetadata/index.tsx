import styles from "./font-metadata.module.scss";
import { camelToSentence, isNumeric } from "../../library/utils";
import React from "react";

export default function FontMetadata(props: any) {
  console.log("FontMetadata", props);
  const keys = Object.keys(props.data.names).map(camelToSentence);
  const values = Object.values(props.data.names).map((val) => {
    if (typeof val === "string") {
      return val;
    } else if (Array.isArray(val)) {
      return val.join();
    } else {
      return Object.values(val)[0];
    }
  });
  const data = keys
    .map((key, i) => {
      return {
        key: key,
        value: values[i],
      };
    })
    .filter((item) => !isNumeric(item.key));

  return (
    <section className={styles.container}>
      <h2>Metadata</h2>
      <div className={styles.info}>
        {data.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <span className={styles.key}>{item.key}</span>
              <LinkOrText key={i + data.length + 1} value={item.value} />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

function LinkOrText(props: any) {
  console.log("LinkOrText", props);
  if (isValidHttpUrl(props.value)) {
    return (
      <a target="_blank" className={styles.value} href={checkWWW(props.value)}>
        {props.value}
      </a>
    );
  } else {
    return <span className={styles.value}>{props.value}</span>;
  }
}

function checkWWW(str: string) {
  if (str.startsWith("www")) {
    str = "http://" + str;
  }
  return str;
}

function isValidHttpUrl(str: string): boolean {
  let url;
  str = checkWWW(str);
  try {
    url = new URL(str);
    console.log("URL", url);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
