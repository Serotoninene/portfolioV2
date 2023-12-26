import { useEffect } from "react";
import { Layout } from "./components/organisms";
import Homepage from "./pages/Homepage";
import { ColorProvider } from "./contexts/ColorContext";

function App() {
  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, []);
  return (
    <ColorProvider>
      <Layout>
        <Homepage />
      </Layout>
    </ColorProvider>
  );
}

export default App;
