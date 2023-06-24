import { uniq, readdirHandler, uuid4 } from "./utils";
import Database from "./database";
import { fileToUint8Array } from "../tools/utils";
import { FontItem } from "../contexts/FontsContext";
import { filterFontFiles } from ".";

export default {
  collect,
  filterFile,
  load,
};

/**
 * FontRecord for Fontkeeper
 * @typedef {Object} FontRecord
 * @property {string} id - Unique font ID.
 * @property {string} name - Unique font name.
 * @property {ArrayBuffer} buffer - Font file buffer
 * @property {File} file - Font file buffer
 * @property {string} ext - Font extension
 */

export function filterFile(file: File) {
  const allowedFormats = /(.otf|.ttf|.woff|.woff2)/;
  return allowedFormats.test(file.name);
}

/**
 * Collects FontRecord[] from HTML input.
 */
export async function collect(event: InputEvent) {
  if ((event.target as HTMLInputElement).files.length === 0) {
    return;
  }
  const files: File[] = [];
  const checkDuplicate = (file: File) =>
    files.find((existingFont) => existingFont.name === file.name);
  Array.from((event.target as HTMLInputElement).files)
    .filter(filterFile)
    .forEach((font) => {
      if (checkDuplicate(font)) return;
      files.push(font);
    });
  const dirname = files[0].webkitRelativePath.split("/")[0];
  const fonts = await Promise.all(
    files.sort((a, b) => (a as any).name - (b as any).name).map(makeRecord)
  );
  await Database.put(dirname, "dirname", "config");
  await Database.put(fonts);
  console.log("collect", fonts);
  return { fonts: fonts, dir: dirname };
}

/**
 * Makes FontRecord model from HTML input File handle.
 */
async function makeRecord(file: File): Promise<FontItem> {
  const splitted = file.name.split(".");
  return {
    id: uuid4(),
    file: file,
    buffer: await fileToUint8Array(file),
    name: file.name.replace(/\./g, "_"),
    ext: splitted.pop(),
  };
}

/**
 *
 * @param {*} fontRecords
 */
export async function load(fontRecords: FontItem[]) {
  fontRecords = fontRecords ? fontRecords : await Database.getAll();
  // Create FontFace objects
  const fontFaces = fontRecords.map(
    (font) => new FontFace(font.name, font.buffer)
  );
  // Wait for fonts to be loaded.
  await document.fonts.ready.catch((err) => console.error(err));
  // Load each font
  await Promise.all(
    fontFaces.map(async (font) => {
      return await font.load().catch((err) => console.error(err));
    })
  );
  // Add each font
  fontFaces.forEach((font) => document.fonts.add(font));
}

/**
 * Uses FileAccess API which only works in Chrome.
 */
// export async function getFonts() {
//   try {
//     let { files, dir } = await readdirHandler(filterFontFiles);
//     if (!files) return;
//     files = Array.from(new Set(files));
//     const fontFiles = await Promise.all(
//       files.map(
//         async (file: File) =>
//           await file.handle
//             .getFile()
//             .catch((err) => console.error(`FONT_READ_ERR: ${err}`))
//       )
//     );
//     const fontData = await Promise.all(
//       fontFiles.map(async (entry, i) => {
//         const nameSplit = files[i].name.split(".");
//         const fontExt = nameSplit.pop();
//         const fontName = nameSplit.join("");
//         const fontBuffer = await entry
//           .arrayBuffer()
//           .catch((err) => console.error(`FONT_BUFFER_ERR: ${err}`));
//         return {
//           name: fontName,
//           buffer: new Int32Array(fontBuffer),
//           format: fontExt,
//           fontface: new FontFace(fontName, fontBuffer),
//         };
//       })
//     );
//     await storeFonts(fontData, dir);
//     return { dir: dir, fonts: fontData.map((f) => f.fontface) };
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }

// export function getCache() {
//   const config = localStorage.getItem("fontkeeper_conf");
//   if (config === null) {
//     return false;
//   }
//   const { dir, slugs } = JSON.parse(config);
//   let result = {
//     dir: dir,
//     fonts: slugs.map((slug) =>
//       JSON.parse(localStorage.getItem(`fontkeeper_font-${slug}`))
//     ),
//   };
//   result.fonts = restoreFonts(result.fonts);
//   initFonts(result.fonts);
//   return result;
// }

// export function restoreFonts(cachedFonts: FontItem[]) {
//   return cachedFonts
//     .map((font) => {
//       return {
//         ...font,
//         data: new Int32Array(Object.values(font.data)).buffer,
//       };
//     })
//     .map((font) => new FontFace(font.name, font.data));
// }

export async function initFonts(
  fontFaces: FontFace[]
): Promise<void | FontFace> {
  await Promise.all(
    fontFaces.map(async (font: FontFace) => {
      const loaded = await font.load().catch((err: unknown) => {
        console.error(`FONT_LOAD_ERR: ${err}`);
        return null;
      });
      document.fonts.add(loaded);
    })
  );
}

export function setDarkTheme() {
  document.documentElement.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");
}

export function setLightTheme() {
  document.documentElement.setAttribute("theme", "light");
  localStorage.setItem("theme", "light");
}

export function setTheme() {
  const theme = localStorage.getItem("theme");
  return theme === "dark" ? setLightTheme() : setDarkTheme();
}
