import AppBar from "./AppBar/index";
import { RecoilRoot } from "recoil";
import Toaster from "./Toaster";
import { Outlet, useNavigate } from "react-router-dom";
import { useFonts } from "../contexts/FontsContext";
import React from "react";

export default function Layout() {
  const { convertedMessage } = useFonts();

  return (
    <RecoilRoot>
      <AppBar />
      <Outlet />
      <Toaster text={convertedMessage} />
    </RecoilRoot>
  );
}
