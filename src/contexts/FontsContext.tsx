import React, { useState, useContext } from "react";
import { openDB, deleteDB, IDBPDatabase } from "idb";
import fonts from "../library/fonts";
import database from "../library/database";
import { dbname } from "../store/constants";
import getRandomPangram from "../library/pangram";

const initialFonts = [
  { name: "sans-serif", id: 1 },
  { name: "serif", id: 2 },
  { name: "monospace", id: 3 },
];

export interface FontItem {
  buffer: Uint8Array;
  ext: string;
  file: File;
  id: string;
  name: string;
}

export interface FontkeeperState {
  globalFontSize: number;
  globalText: string;
  dirname: string | null;
  rows: number;
  currentPage: number;
  fonts: { name: string; id: number | string }[];
  hasDefaults: boolean;
  convertedMessage: string | null;
}

export interface FontkeeperContext extends FontkeeperState {
  state: FontkeeperState;
  setState: React.Dispatch<React.SetStateAction<FontkeeperState>>;
  resetFontList: () => void;
  useLoad: () => void;
  // getFont: _getFont;
  // setFonts;
  // portion;
  // setPortion;
  // convertedMessage;
  // setConvertedMessage;
  // load: load;
  // portionate: _portionateFonts;
  // destroy: _delete;
  // hasDefaults: hasDefaults;
  // fonts: loadedFonts;
  // dirname;
  // setDirname;
  // state;
  // setState;
}

export const FontsContext = React.createContext({} as FontkeeperContext);

export function FontsProvider(props: React.PropsWithChildren) {
  const [loadedFonts, setFonts] = useState(initialFonts);
  const [portion, setPortion] = useState(10);
  const [hasDefaults, setHasDefaults] = useState<boolean>(true);
  const [convertedMessage, setConvertedMessage] = React.useState(null);

  const [state, setState] = React.useState<FontkeeperState>({
    globalFontSize: 40,
    globalText: getRandomPangram(),
    rows: 25,
    currentPage: 1,
    dirname: null,
    hasDefaults: true,
    fonts: initialFonts,
    convertedMessage: null,
  });

  const context = {
    useLoad: () =>
      React.useEffect(() => {
        load();
      }, []),
    getFont: _getFont,
    setFonts,
    portion,
    setPortion,
    convertedMessage,
    setConvertedMessage,
    load: load,
    portionate: _portionateFonts,
    destroy: _delete,
    hasDefaults: hasDefaults,
    fonts: loadedFonts,
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
    setFonts(initialFonts);
    setHasDefaults(true);
  }

  async function load() {
    // const loaded = await _portionateFonts(0, portion);
    console.log("Runs.load");
    const loaded = await database.getAll("fonts");
    if (loaded.length > 0) {
      await fonts.load(loaded);
      setFonts(loaded);
      setHasDefaults(false);
    } else {
      setHasDefaults(true);
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

async function _getFont(id: string) {
  const db = await openDB(dbname, 1);
  const store = db.transaction("fonts").objectStore("fonts");
  return await store.get(id);
}

async function _portionateFonts(
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
    console.error("_portionateFonts.err", err);
    return [];
  }
}
