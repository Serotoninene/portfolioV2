import { useProgress } from "@react-three/drei";

export const Placeholder = () => {
  const { loaded } = useProgress();

  return (
    <section
      className="h-screen flex justify-center items-center"
      style={{ opacity: loaded ? 1 : 0 }}
    >
      <div className="h-[20vw] w-[20vw] bg-blue-300"></div>
    </section>
  );
};
