import { useContext } from "react";
import { ColorShiftContext } from "../contexts/ColorShiftContext";

export const useColorShiftContext = () => {
  return useContext(ColorShiftContext);
};
