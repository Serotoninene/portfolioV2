export const Introduction = () => {
  return (
    <div
      id="Hero"
      className="relative h-[--fullScreen] flex flex-col gap-6 justify-center items-center text-black "
    >
      <h1 className="font-extrabold text-[160px] leading-[80%] text-center">
        ALEX <br /> PUJOL
      </h1>
      <p className="text-center text-base font-medium leading-[130%] sm:w-[360px]">
        I'm a passionate creative developer dedicated to turning ideas into
        immersive digital experiences. From elegant websites to interactive
        applications.
      </p>
      <div className="fixed bottom-3 left-5 w-5 aspect-square bg-dark"></div>
    </div>
  );
};
