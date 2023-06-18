import App from "./App";
import { FontsProvider } from "./contexts/FontsContext";
import "./styles/main.scss";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <FontsProvider>
      <App />
    </FontsProvider>
  </StrictMode>
);

{
  /* <AuthProvider client={supabase} providers={["google", "facebook"]}> */
}
