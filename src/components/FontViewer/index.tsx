import styles from "./font-viewer.module.scss";
import { debuggy } from "../../library/utils";
import { useParams } from "react-router-dom";
import FontGlyphTable from "../FontGlyphTable/index";
import FontMetadata from "../FontMetadata";
import useFont from "../../hooks/useFont";

export default function FontViewer() {
  let { id } = useParams();
  const isDefaultFont = id === "1" || id === "2" || id === "3";
  let { fontSlug, fontData, loading } = useFont(id);
  isDefaultFont ? (loading = false) : undefined;

  console.log("FontViewer", id);

  return (
    <div className={styles.container}>
      {loading ? (
        <FontLoading />
      ) : (
        <FontGlyphTable
          id={id}
          title={fontSlug}
          data={isDefaultFont ? undefined : fontData}
        />
      )}
      {loading || isDefaultFont ? (
        <FontLoading />
      ) : (
        <FontMetadata data={fontData} />
      )}
    </div>
  );
}

function FontLoading() {
  return <div className={styles.loading}>Loading font...</div>;
}
