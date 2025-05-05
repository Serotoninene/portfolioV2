import { Suspense, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/organisms";
import { ColorProvider } from "./contexts/ColorContext";
import { useWindowSize } from "./hooks";
import Experiments from "./pages/Experiments";
import ExperimentLayout from "./pages/Experiments/ExperimentLayout";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";

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
      path: "/projects/:slug",
      element: <WithLayout component={<Project />} />,
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
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </ColorProvider>
  );
}

export default App;
