import { useEffect } from "react";
import { Layout } from "./components/organisms";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Experiments from "./pages/Experiments";
import { ColorProvider } from "./contexts/ColorContext";

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
