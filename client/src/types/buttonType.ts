import { $$StyledComponentProps } from "@stitches/react/types/styled-component";
import { JSXElementConstructor } from "react";
import StyledButton from "../styles/styledComponents/button/button";
import { CustomStitches } from "./customStitchesType";

export interface ButtonType {
  placeholder: string;
  type: typeof StyledButton[$$StyledComponentProps]["type"];
  StartIcon?: JSXElementConstructor<any>;
  EndIcon?: JSXElementConstructor<any>;
  css?: CustomStitches;
  disabled?: boolean;
  onClick?<T>(...params: T[]): any;
  dataTestid?: string;
}
