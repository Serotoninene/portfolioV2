import React, { createContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ColorShiftContextType = {
  mainColor: string;
  setMainColor: (color: string) => void;
};

export const ColorShiftContext = createContext<ColorShiftContextType>({
  mainColor: "#1C0F13",
  setMainColor: () => {},
});

export const ColorShiftProvider = ({ children }: Props) => {
  const [mainColor, setMainColor] = useState("#1C0F13");

  const value = useMemo(() => ({ mainColor, setMainColor }), [mainColor]);

  return (
    <ColorShiftContext.Provider value={value}>
      {children}
    </ColorShiftContext.Provider>
  );
};
