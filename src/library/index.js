import { slugify, readdirHandler } from "./utils";
import Database from "./database";

export function filterFontFiles(file) {
  const allowedFormats = /(.otf|.ttf|.woff|.woff2)/;
  return allowedFormats.test(file.name);
}

export async function gatherFonts(e) {
  const fonts = await Promise.all(
    Array.from(e.target.files)
      .filter(filterFontFiles)
      .map(async (file) => {
        const fontBuffer = await createBlob(file);
        return {
          name: file.name,
          buffer: fontBuffer,
        };
      })
  );
  await Database.put(fonts);
}

/**
 * Uses FileAccess API which only works in Chrome.
 */
export async function getFonts() {
  try {
    let { files, dir } = await readdirHandler(filterFontFiles);
    if (!files) return;
    files = Array.from(new Set(files));
    const fontFiles = await Promise.all(
      files.map(
        async (file) =>
          await file.handle
            .getFile()
            .catch((err) => console.error(`FONT_READ_ERR: ${err}`))
      )
    );
    const fontData = await Promise.all(
      fontFiles.map(async (entry, i) => {
        const nameSplit = files[i].name.split(".");
        const fontExt = nameSplit.pop();
        const fontName = nameSplit.join("");
        const fontBuffer = await entry
          .arrayBuffer()
          .catch((err) => console.error(`FONT_BUFFER_ERR: ${err}`));
        return {
          name: fontName,
          buffer: new Int32Array(fontBuffer),
          format: fontExt,
          fontface: new FontFace(fontName, fontBuffer),
        };
      })
    );
    await storeFonts(fontData, dir);
    return { dir: dir, fonts: fontData.map((f) => f.fontface) };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function storeFonts(fontData, directory) {
  // await Database.add(fontData)
  localStorage.setItem("fontkeeper_conf", JSON.stringify({ dir: directory }));
}

export function getCache() {
  const config = localStorage.getItem("fontkeeper_conf");
  if (config === null) {
    return false;
  }
  const { dir, slugs } = JSON.parse(config);
  let result = {
    dir: dir,
    fonts: slugs.map((slug) =>
      JSON.parse(localStorage.getItem(`fontkeeper_font-${slug}`))
    ),
  };
  result.fonts = restoreFonts(result.fonts);
  initFonts(result.fonts);
  return result;
}

export function restoreFonts(cachedFonts) {
  return cachedFonts
    .map((font) => {
      return {
        ...font,
        data: new Int32Array(Object.values(font.data)).buffer,
      };
    })
    .map((font) => new FontFace(font.name, font.data));
}

export async function initFonts(fontFaces) {
  return await Promise.all(
    fontFaces.map(async (font) =>
      document.fonts.add(
        await font.load().catch((err) => console.error(`FONT_LOAD_ERR: ${err}`))
      )
    )
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
