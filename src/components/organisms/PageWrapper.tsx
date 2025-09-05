import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const PageWrapper = ({ children }: React.PropsWithChildren) => {
  const location = useLocation();
  const container = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.fromTo(
  //     container.current,
  //     { opacity: 0 },
  //     { opacity: 1, duration: 0.5, ease: "power2.out" }
  //   );

  //   return () => {
  //     gsap.to(container.current, {
  //       opacity: 0,
  //       y: -50,
  //     });
  //   };
  // }, [location.pathname]);

  return (
    <div ref={container} key={location.pathname}>
      {children}
    </div>
  );
};
