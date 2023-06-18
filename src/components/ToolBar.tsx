import Dropdown from "./Dropdown";
import Range from "./Range";
import Icon from "./Icon";
import Pagination from "./Pagination";
import getRandomPangram from "../library/pangram";
import useStickyObserver from "../hooks/useStickyObserver";
import { useFonts } from "../contexts/FontsContext";
import appbarStyles from "./AppBar/appbar.module.scss";
import React from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  fontsAtom,
  globalFontSizeAtom,
  globalTextAtom,
  rowsAtom,
} from "../store/atoms";
import { deleteDB } from "idb";
import { dbname } from "../store/constants";

export default function ToolBar() {
  const setGlobalText = useSetRecoilState(globalTextAtom);
  // const refreshFonts = useRecoilRefresher_UNSTABLE(fontsAtom);
  const resetFonts = useResetRecoilState(fontsAtom);
  const [globalFontSize, setGlobalFontSize] =
    useRecoilState(globalFontSizeAtom);
  const [rows, setRows] = useRecoilState(rowsAtom);
  const { fonts } = useFonts();
  const toolbarRef = React.useRef(null);

  async function destroy() {
    await deleteDB(dbname, {
      blocked() {
        resetFonts();
        console.log("BLOEKED");
      },
    });
  }
  const isSticky = useStickyObserver(`.${appbarStyles.appbar}`);

  return (
    <section ref={toolbarRef} className={`toolbar${isSticky ? " sticky" : ""}`}>
      <div className="toolbar__inputs">
        <div className="toolbar__search">
          <Icon name="search" />
          <div className="toolbar__search--box">
            <input placeholder="Search fonts..." type="text" />
          </div>
          <Icon type="button" name="clear" />
        </div>
        <div className="toolbar__sentence">
          <Dropdown options={["Sentence", "Alphabet", "Paragraph"]} />
          <div className="toolbar__sentence--box">
            <input
              onBlur={(e) => {
                if (!/\S/.test(e.target.value)) {
                  setGlobalText(getRandomPangram());
                }
              }}
              onInput={(e) => setGlobalText(e.currentTarget.value)}
              placeholder="Type something..."
              type="text"
            />
          </div>
        </div>
        <div className="toolbar__size">
          <Dropdown
            onSelect={(e: any) => {
              setGlobalFontSize(e.currentTarget.value);
            }}
            options={[8, 12, 14, 20, 24, 32, 40, 64, 96]}
            selected={globalFontSize}
          />
          {/* <Dropdown options={["px", "rem", "pt"]}/> */}
          <Range
            onInput={(e: any) => setGlobalFontSize(e.currentTarget.value)}
            min="4"
            max="96"
            value={globalFontSize}
          />
        </div>
        <div className="toolbar__reset">
          <Icon type="button" name="refresh" />
        </div>
        <div className="toolbar__delete">
          <Icon onClick={destroy} type="button" name="delete" />
        </div>
      </div>
      <Pagination
        onRowSelect={(rows: any) => setRows(rows)}
        className="toolbar__pagination"
        data={fonts}
        rows={[10, 25, 50, 75, 100]}
      />
    </section>
  );
}
