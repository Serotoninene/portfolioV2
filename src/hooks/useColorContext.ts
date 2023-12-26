import { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext";

export const useColorContext = () => {
  return useContext(ColorContext);
};
