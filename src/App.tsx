import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";

import { ColorProvider } from "./contexts/ColorContext";
import Experiments from "./pages/Experiments";
import Homepage from "./pages/Homepage";
import ExperimentDetail from "./pages/Experiments/components/ExperimentDetail";

type Props = {
  component: React.ReactNode;
};

const WithLayout = ({ component }: Props) => <Layout>{component}</Layout>;

function App() {
  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WithLayout component={<Homepage />} />,
    },
    {
      path: "/experiments",
      element: <WithLayout component={<Experiments />} />,
    },
    {
      path: "/experiments/:id",
      element: <WithLayout component={<ExperimentDetail />} />,
    },
  ]);

  return (
    <ColorProvider>
      <RouterProvider router={router} />
    </ColorProvider>
  );
}

export default App;
