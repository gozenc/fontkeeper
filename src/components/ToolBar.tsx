import Dropdown from "./Dropdown";
import Range from "./Range";
import Icon from "./Icon";
import Pagination from "./Pagination";
import getRandomPangram from "../library/pangram";
import useStickyObserver from "../hooks/useStickyObserver";
import { useFontsContext } from "../contexts/FontsContext";
import appbarStyles from "./AppBar/appbar.module.scss";
import React from "react";
import { deleteDB } from "idb";
import { dbname } from "../store/constants";

export default function ToolBar() {
  const { resetFontList, state, loadedFonts, setState } = useFontsContext();
  const toolbarRef = React.useRef(null);
  const isSticky = useStickyObserver(`.${appbarStyles.appbar}`);
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <section ref={toolbarRef} className={`toolbar${isSticky ? " sticky" : ""}`}>
      <div className="toolbar__inputs">
        <div className="toolbar__search">
          <Icon name="search" />
          <div className="toolbar__search--box">
            <input
              placeholder="Search fonts..."
              type="search"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          <Icon type="button" name="clear" />
        </div>
        <div className="toolbar__sentence">
          <Dropdown
            onSelect={handleDropdownSelect}
            options={["Sentence", "Alphabet", "Paragraph"]}
          />
          <div className="toolbar__sentence--box">
            <input
              onBlur={(e) => {
                if (!/\S/.test(e.target.value)) {
                  setGlobalText(getRandomPangram());
                }
              }}
              onInput={(e) => {
                setGlobalText((e.target as HTMLInputElement).value);
              }}
              placeholder="or type something..."
              type="text"
            />
          </div>
        </div>
        <div className="toolbar__size">
          <Dropdown
            onSelect={(e: any) => {
              setState((s) => ({
                ...s,
                globalFontSize: e.currentTarget.value,
              }));
            }}
            options={[8, 12, 14, 20, 24, 32, 40, 64, 96]}
            selected={state.globalFontSize}
          />
          {/* <Dropdown options={["px", "rem", "pt"]}/> */}
          <Range
            onInput={(e: any) => setGlobalFontSize(e.currentTarget.value)}
            min="4"
            max="96"
            value={state.globalFontSize}
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
        onRowSelect={(rows: any) => setState((s) => ({ ...s, rows }))}
        className="toolbar__pagination"
        data={state.fonts}
        rows={[10, 25, 50, 75, 100]}
      />
    </section>
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
    setState((s) => ({
      ...s,
      fonts: loadedFonts.filter((font) =>
        font.name.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    }));
  }

  function handleDropdownSelect(val: string) {
    switch (val) {
      case "Sentence":
        setState((s) => ({
          ...s,
          globalFontSize: 40,
          globalText: getRandomPangram(),
        }));
        break;
      case "Alphabet":
        setGlobalText("AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpRrSsTtUuVvWwXxYyZz");
        break;
      case "Paragraph":
        setState((s) => ({
          ...s,
          globalFontSize: 16,
          globalText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate mollis egestas. Duis quis neque ac lacus bibendum ultrices eget eu ante. Ut tortor diam, tempus id diam ac, scelerisque iaculis lacus. Aenean efficitur sagittis augue, sed blandit risus eleifend nec. Vivamus dapibus dictum dolor, et fringilla ipsum ultrices sed. In at feugiat augue. Ut fermentum, orci ut tincidunt tincidunt, erat velit finibus diam, a malesuada urna elit sit amet odio. Proin sed tellus ultrices, mollis eros in, lacinia mauris. Ut porttitor tellus et aliquet suscipit.",
        }));
    }
  }

  function setGlobalText(text: string) {
    setState((s) => ({
      ...s,
      globalText: text,
    }));
  }

  function setGlobalFontSize(size: number) {
    setState((s) => ({
      ...s,
      globalFontSize: size,
    }));
  }

  async function destroy() {
    await deleteDB(dbname, {
      blocked() {
        resetFontList();
        console.log("BLOEKED");
      },
    });
  }
}
