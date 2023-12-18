import Homepage from "./pages/Homepage";
import { Layout } from "./components/organisms";
import { useEffect } from "react";

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
