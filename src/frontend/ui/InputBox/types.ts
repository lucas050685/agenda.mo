import { InputHTMLAttributes, PropsWithChildren } from "react";

export type InputBoxProps = {
  label?: string;
} & InputHTMLAttributes<HTMLElement> & PropsWithChildren;