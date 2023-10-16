import { FormEvent, useRef, useState } from "react";
import { FormProps, FormDataInputs } from "./types";
import classNames from 'classnames';

function serializeFormData<T extends FormDataInputs>(formData: FormData): T {
  const data: FormDataInputs = {}
  const keys = formData.keys();
  for(let key of keys) {
    data[key] = formData.get(key);
  }
  return data as T;
}

export function Form<T extends FormDataInputs>({ 
  className,
  children,
  disabled,
  formClassName,
  onSubmit
}: FormProps): JSX.Element {

  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, updateSubmitting] = useState(false);

  const disabledClassName = [
    '[&_label]:text-neutral-500',
  ].join(' ');
  const defaultClassName = [
    'group/form',
    submitting ? 'is-submitting' :  '',
  ].join(' ');
  const formDefaultClassName = classNames (disabled ? disabledClassName : '', defaultClassName, formClassName);

  const getFormData = () => {
    const form = formRef.current;
    if (!form) return {};
    const formData = new FormData(form);
    return serializeFormData<T>(formData);
  }

  const handleOnSubmit = async (e: FormEvent) => {
    updateSubmitting(true);
    e.stopPropagation();
    e.preventDefault();

    if (onSubmit) {
      const formData = getFormData();
      await onSubmit(formData);
    }

    updateSubmitting(false);
  }

  return (
    <form className={formDefaultClassName} onSubmit={handleOnSubmit} ref={formRef}>
      <fieldset disabled={disabled || submitting} className={className}>
        {children}
      </fieldset>
    </form>
  );
}
