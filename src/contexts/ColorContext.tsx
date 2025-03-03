import React, { createContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ColorContextType = {
  colors: { mainColor: string; secondaryColor: string };
  switchColors: () => void;
};

export const ColorContext = createContext<ColorContextType>({
  colors: { mainColor: "", secondaryColor: "" },
  switchColors: () => {},
});

export const ColorProvider = ({ children }: Props) => {
  const lightColor = "#ebe9e5";
  const darkColor = "#1C0F13";
  const [colors, setColors] = useState({
    mainColor: lightColor,
    secondaryColor: darkColor,
  });

  const switchColors = () => {
    if (colors.mainColor === lightColor) {
      setColors({ mainColor: darkColor, secondaryColor: lightColor });
    } else {
      setColors({ mainColor: lightColor, secondaryColor: darkColor });
    }
  };

  const value = useMemo(() => ({ colors, switchColors }), [colors]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
