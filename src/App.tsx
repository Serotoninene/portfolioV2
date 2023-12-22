import { useEffect } from "react";
import { Layout } from "./components/organisms";
import Homepage from "./pages/Homepage";

function App() {
  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, []);
  return (
    <Layout>
      <Homepage />
    </Layout>
  );
}

export default App;
