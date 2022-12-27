import { CustomStitches } from "./customStitchesType";

interface TextInputType {
  type: string;
  value: string | number;
  placeholder: string;
  label: string;
  onChange<T>(...params: T[]): any;
  css?: CustomStitches;
  disabled?: boolean;
  dataTestid?: string;
  name?: string;
}

export { TextInputType };
