import gsap, { Power4 } from "gsap";
import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Layout } from "./components/organisms";
import { ColorProvider } from "./contexts/ColorContext";
import { useWindowSize } from "./hooks";
import Experiments from "./pages/Experiments";
import ExperimentLayout from "./pages/Experiments/ExperimentLayout";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";

const PageTransition = () => {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);

  useLayoutEffect(() => {}, [
    gsap.set("#transition_panel", { yPercent: -100 }),
  ]);

  useEffect(() => {
    {
      console.log("displayed location : ", displayedLocation.pathname);
      console.log("location : ", location.pathname);

      if (
        location.pathname !== displayedLocation.pathname &&
        location.pathname.startsWith("/projects/")
      ) {
        console.log("trigger animation");
        const tl = gsap.timeline({
          defaults: { ease: Power4.easeOut, duration: 0.6 },
          onComplete: () => {
            setDisplayedLocation(location);
          },
        });

        tl.fromTo(
          "#transition_panel",
          {
            yPercent: -100,
          },
          {
            yPercent: 0,
          },
          "<+=0.1"
        );
        tl.set("#ScrollRig-canvas", { opacity: 0 });
      } else {
        setDisplayedLocation(location);
        gsap.set("#ScrollRig-canvas", { opacity: 1 });
      }
    }
  }, [location.pathname]);

  return (
    <div className="page-transition">
      <Routes location={displayedLocation}>
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Layout>
              <Project />
            </Layout>
          }
        />
        <Route
          path="/experiments"
          element={
            <Layout>
              <Experiments />
            </Layout>
          }
        />
        <Route
          path="/experiments/:id"
          element={
            <Layout>
              <ExperimentLayout />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  const { height } = useWindowSize();

  useEffect(() => {
    const screen = window.innerHeight;
    document.documentElement.style.setProperty("--fullScreen", screen + "px");
  }, [height]);

  return (
    <ColorProvider>
      <BrowserRouter>
        <PageTransition />
      </BrowserRouter>
    </ColorProvider>
  );
}

export default App;
