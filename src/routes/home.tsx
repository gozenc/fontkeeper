import ToolBar from "../components/ToolBar";
import FontTable from "../components/FontTable";
import React, { Suspense } from "react";
import Loading from "../components/Loading";

export default function PageHome() {
  return (
    <section className="page-home">
      <ToolBar />
      <Suspense fallback={<Loading text="Loading fonts.." />}>
        <FontTable />
      </Suspense>
    </section>
  );
}
