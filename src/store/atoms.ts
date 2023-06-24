import { atom } from "recoil";
import getRandomPangram from "../library/pangram";

export const uiSettingsAtom = atom({
  key: "uiSettings",
  default: {
    globalFontSize: 40,
    globalText: getRandomPangram(),
    rows: 25,
    currentPage: 1,
  },
});
