import { CSS } from "@stitches/react/types/css-util";
import { theme } from "./styles/@stitches.config";
import { $$StyledComponentProps } from "@stitches/react/types/styled-component";
import StyledButton from "./styles/styledComponents/button/button";

declare global {
  interface TextInputType {
    type: string;
    value: string | number;
    placeholder: string;
    label?: string;
    onChange<T>(...params: T[]): any;
    css?: CustomStitches;
    disabled?: boolean;
    dataTestid?: string;
    name?: string;
    onClick?<T>(...params: T[]): any;
    onKeyDown?: any;
  }

  interface IconType {
    height: number;
    width: number;
  }

  interface LoginDataType {
    username: string;
    password: string;
    isManager: boolean;
  }

  interface MessageType {
    type: "error" | "success" | "warn" | "idle" | "waiting";
    msg: string;
  }

  type CustomStitches = CSS<typeof theme>;

  interface ButtonType {
    placeholder: string;
    type: typeof StyledButton[$$StyledComponentProps]["type"];
    StartIcon?: any;
    EndIcon?: any;
    css?: CustomStitches;
    disabled?: boolean;
    onClick?<T>(...params: T[]): any;
    dataTestid?: string;
    color?: typeof StyledButton[$$StyledComponentProps]["color"];
  }
}
