import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";

import { ColorProvider } from "./contexts/ColorContext";
import Experiments from "./pages/Experiments";
import Homepage from "./pages/Homepage";
import ExperimentLayout from "./pages/Experiments/components/ExperimentLayout";
import { useWindowSize } from "./hooks";

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
