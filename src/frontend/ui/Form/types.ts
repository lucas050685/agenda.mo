import { PropsWithChildren } from "react";

export type FormProps = {
  disabled?: boolean;
  formClassName?: string;
  className?: string;
  onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
} & PropsWithChildren;

export type FormDataInputs = Record<string, any>;

