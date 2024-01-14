import { InputHTMLAttributes, PropsWithChildren } from "react";

export type InputBoxProps = {
  label?: string;
  validator?: (state: string) => string | boolean;
  'validate-empty'?: boolean;
  error?: string | null;
} & InputHTMLAttributes<HTMLElement> & PropsWithChildren;