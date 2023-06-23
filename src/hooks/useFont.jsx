import { parse } from "opentype.js";
import { debuggy } from "../library/utils";
import database from "../library/database";
import { convertSingleFile } from "../tools/utils";
import { useFontsContext } from "../contexts/FontsContext";

export default function useFont(id) {
  const [fontSlug, setFontSlug] = React.useState(null);
  const [fontData, setFontData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { useLoad } = useFontsContext();

  useLoad();

  async function handleWoff2(font, err) {
    if (err.message.toLowerCase().includes("wof2")) {
      try {
        const converted = await convertSingleFile(font.file, "otf");
        console.log("handleWoff2", converted);
        const parsed = parse(converted.output.buffer);
        setFontData(parsed);
        setLoading(false);
      } catch (subErr) {
        debuggy("handleWoff2_err", subErr.message);
      }
    }
  }

  async function setFont(id) {
    return database
      .get(id)
      .then(async (font) => {
        debuggy(font);
        setFontSlug(font.name);
        try {
          const arrayBuffer = await font.file.arrayBuffer();
          const parsed = parse(arrayBuffer);
          setFontData(parsed);
          setLoading(false);
        } catch (err) {
          debuggy(err.message);
          await handleWoff2(font, err);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (id == 1 || id == 2 || id == 3) {
      return setLoading(false);
    }
    setFont(id);
  }, []);

  return { fontSlug, fontData, loading };
}
