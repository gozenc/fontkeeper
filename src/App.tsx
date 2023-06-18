import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import Pages from "./Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Page loading...</div>}>
        <Pages />
      </Suspense>
    </BrowserRouter>
  );
}
