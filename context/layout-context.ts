import { createContext } from "react";
import { LayoutColorType } from "../utils/hooks/layout-hooks";

export const LayoutContext = createContext({
  BGCOLOR_VARIANT_MAPS: null,
  COLOR_VARIANT_MAPS: null,
  layoutColor: null,
  changeLayoutColorHandler: (newColor: LayoutColorType) => {},
  isNavOpen: true,
  ToggleNavHandler: () => {},
  SetToggleStateNavHandler: (state: boolean) => {},
});
