import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";

import { ColorProvider } from "./contexts/ColorContext";
import Experiments from "./pages/Experiments";
import Homepage from "./pages/Homepage";
import { useWindowSize } from "./hooks";
import { ProjectLayout } from "./pages/Project/ProjectLayout";
import ExperimentLayout from "./pages/Experiments/ExperimentLayout";

type Props = {
  component: React.ReactNode;
};

const WithLayout = ({ component }: Props) => <Layout>{component}</Layout>;

function App() {
  const { height } = useWindowSize();

  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, [height]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WithLayout component={<Homepage />} />,
    },
    {
      path: "/projects/:id",
      element: <WithLayout component={<ProjectLayout />} />,
    },
    {
      path: "/experiments",
      element: <WithLayout component={<Experiments />} />,
    },
    {
      path: "/experiments/:id",
      element: <WithLayout component={<ExperimentLayout />} />,
    },
  ]);

  return (
    <ColorProvider>
      <RouterProvider router={router} />
    </ColorProvider>
  );
}

export default App;
