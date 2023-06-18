import { atom, selector } from "recoil";
import database from "../library/database";
import fonts from "../library/fonts";
import getRandomPangram from "../library/pangram";

export const dirAtom = atom({
  key: "dir",
  default: null,
});

export const fontsAtom = atom({
  key: "fontsAtom",
  default: database.getAll("fonts").then(async (loaded) => {
    if (loaded.length > 0) {
      await fonts.load(loaded);
      return loaded;
    } else {
      return [{ name: "sans-serif" }, { name: "serif" }, { name: "monospace" }];
      // setHasDefaults(true);
    }
  }),
});

export const globalFontSizeAtom = atom({
  key: "globalFontSize",
  default: 40,
});

export const globalTextAtom = atom({
  key: "globalText",
  default: getRandomPangram(),
});

export const rowsAtom = atom({
  key: "rows",
  default: 25,
});

export const currentPageAtom = atom({
  key: "currentPage",
  default: 1,
});
