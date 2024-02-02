import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";

import { ColorProvider } from "./contexts/ColorContext";
import Experiments from "./pages/Experiments";
import Homepage from "./pages/Homepage";

function App() {
  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Homepage />
        </Layout>
      ),
    },
    {
      path: "experiments",
      element: (
        <Layout>
          <Experiments />
        </Layout>
      ),
    },
  ]);

  return (
    <ColorProvider>
      <RouterProvider router={router} />
    </ColorProvider>
  );
}

export default App;
