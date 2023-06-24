import React, { useState, useContext } from "react";
import { openDB, deleteDB, IDBPDatabase } from "idb";
import fonts from "../library/fonts";
import database from "../library/database";
import { dbname } from "../store/constants";
import getRandomPangram from "../library/pangram";

export interface FontItem {
  id: string;
  buffer: Uint8Array | null;
  ext: string;
  file: File | null;
  name: string;
}

export interface FontkeeperState {
  globalFontSize: number;
  globalText: string;
  dirname: string | null;
  rows: number;
  currentPage: number;
  fonts: FontItem[];
  hasDefaults: boolean;
  convertedMessage: string | null;
}

export interface FontkeeperContext extends FontkeeperState {
  state: FontkeeperState;
  setState: React.Dispatch<React.SetStateAction<FontkeeperState>>;
  resetFontList: () => void;
  useLoad: () => void;
  setConvertedMessage: React.Dispatch<React.SetStateAction<string | null>>;
  getFont: (id: string) => Promise<FontItem>;
  loadedFonts: FontItem[];
  // setFonts;
  // portion;
  // setPortion;
  // convertedMessage;
  // setConvertedMessage;
  // load: load;
  // portionate: portionateFonts;
  // destroy: _delete;
  // hasDefaults: hasDefaults;
  // fonts: loadedFonts;
  // dirname;
  // setDirname;
  // state;
  // setState;
}

const initialFonts: FontItem[] = [
  { name: "sans-serif", id: "1", buffer: null, ext: "", file: null },
  { name: "serif", id: "2", buffer: null, ext: "", file: null },
  { name: "monospace", id: "3", buffer: null, ext: "", file: null },
];

const initialState: FontkeeperState = {
  globalFontSize: 40,
  globalText: getRandomPangram(),
  rows: 25,
  currentPage: 1,
  dirname: null,
  hasDefaults: true,
  fonts: initialFonts,
  convertedMessage: null,
};

export const FontsContext = React.createContext({} as FontkeeperContext);

export function FontsProvider(props: React.PropsWithChildren) {
  const [portion, setPortion] = useState(10);
  const [convertedMessage, setConvertedMessage] = React.useState(null);

  const [loadedFonts, setLoadedFonts] =
    React.useState<FontItem[]>(initialFonts);
  const [state, setState] = React.useState<FontkeeperState>(initialState);

  const context = {
    useLoad: () =>
      React.useEffect(() => {
        loadFonts();
      }, []),
    getFont: getFont,
    portion,
    setPortion,
    convertedMessage,
    setConvertedMessage,
    load: loadFonts,
    loadedFonts,
    portionate: portionateFonts,
    destroy: _delete,
    resetFontList,
    state,
    setState,
  };

  return (
    <FontsContext.Provider value={context as any}>
      {props.children}
    </FontsContext.Provider>
  );

  function resetFontList() {
    setState((s) => ({ ...s, fonts: initialFonts, hasDefaults: false }));
  }

  async function loadFonts() {
    // const loaded = await portionateFonts(0, portion);
    console.log("Runs.load");
    const loaded = await database.getAll("fonts");
    if (loaded.length > 0) {
      await fonts.load(loaded);
      console.log(loaded);
      setLoadedFonts(loaded);
      setState((s) => ({ ...s, fonts: loaded, hasDefaults: false }));
    } else {
      setState((s) => ({ ...s, hasDefaults: false }));
    }
  }

  async function _delete() {
    // console.log("should delete")
    await deleteDB(dbname, {
      blocked() {
        console.log("BLOEKED");
      },
    });
    setState((s) => ({
      ...s,
      fonts: initialFonts,
      hasDefaults: true,
      dirname: null,
    }));
  }
}

export function useFontsContext() {
  return useContext(FontsContext);
}

async function getFont(id: string) {
  const db = await openDB(dbname, 1);
  const store = db.transaction("fonts").objectStore("fonts");
  return (await store.get(id)) as FontItem;
}

async function portionateFonts(
  portion: number,
  limit: number,
  db: IDBPDatabase
) {
  db = db ? db : await openDB(dbname, 1);
  console.log(db);
  try {
    let cursor = await db.transaction("fonts").store.openCursor();
    console.log(cursor);
    let i = 0;
    const fonts = [];
    while (cursor) {
      portion === 0 ? undefined : await cursor.advance(limit * portion);
      if (i === limit) {
        break;
      }
      fonts.push(cursor.value);
      cursor = await cursor.continue();
      i++;
    }
    return fonts;
  } catch (err) {
    console.error("portionateFonts.err", err);
    return [];
  }
}
