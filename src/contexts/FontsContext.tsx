import React, { useState, useContext } from "react";
import { openDB, deleteDB, IDBPDatabase } from "idb";
import fonts from "../library/fonts";
import database from "../library/database";
import { dbname } from "../store/constants";

const initialFonts = [
  { name: "sans-serif", id: 1 },
  { name: "serif", id: 2 },
  { name: "monospace", id: 3 },
];

export const FontsContext: React.Context<any> = React.createContext(null);

export function FontsProvider(props: any) {
  const [loadedFonts, setFonts] = useState(initialFonts);
  const [dirname, setDirname] = useState(null);
  const [portion, setPortion] = useState(10);
  const [hasDefaults, setHasDefaults] = useState(null);
  const [convertedMessage, setConvertedMessage] = React.useState(null);

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
    setFonts(initialFonts);
    setHasDefaults(true);
    setDirname(null);
  }

  const value = {
    useLoad: () =>
      React.useEffect(() => {
        load();
      }, []),
    getFont: _getFont,
    setFonts: setFonts,
    portion: portion,
    setRows: setPortion,
    convertedMessage,
    setConvertedMessage,
    load: load,
    portionate: _portionateFonts,
    destroy: _delete,
    hasDefaults: hasDefaults,
    fonts: loadedFonts,
    dirname,
    setDirname,
  };

  return (
    <FontsContext.Provider value={value}>
      {props.children}
    </FontsContext.Provider>
  );
}

export function useFonts() {
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
