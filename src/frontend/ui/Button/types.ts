import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = {
  label?: string;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;
