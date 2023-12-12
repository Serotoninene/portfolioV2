import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LenisProvider } from "./contexts/LenisContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </React.StrictMode>
);
