import AppBar from "./AppBar/index";
import { RecoilRoot } from "recoil";
import Toaster from "./Toaster";
import { Outlet } from "react-router-dom";
import { useFontsContext } from "../contexts/FontsContext";

export default function Layout() {
  const { convertedMessage } = useFontsContext();

  return (
    <RecoilRoot>
      <AppBar />
      <Outlet />
      <Toaster text={convertedMessage} />
    </RecoilRoot>
  );
}
