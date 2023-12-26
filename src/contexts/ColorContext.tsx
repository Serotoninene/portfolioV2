import React, { createContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ColorContextType = {
  colors: { light: string; dark: string };
  switchColors: () => void;
};

export const ColorContext = createContext<ColorContextType>({
  colors: { light: "", dark: "" },
  switchColors: () => {},
});

export const ColorProvider = ({ children }: Props) => {
  const lightColor = "#ebe9e5";
  const darkColor = "#1C0F13";
  const [colors, setColors] = useState({ light: lightColor, dark: darkColor });

  const switchColors = () => {
    if (colors.light === lightColor) {
      setColors({ light: darkColor, dark: lightColor });
    } else {
      setColors({ light: lightColor, dark: darkColor });
    }
  };

  const value = useMemo(() => ({ colors, switchColors }), [colors]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
