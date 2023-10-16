import { useRef } from 'react';
import { InputBoxProps } from './types';
import { CheckBox } from './CheckBox';

export function InputBox({ label, children, name, type, disabled, ...attr }: InputBoxProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  if (type === "checkbox") return <CheckBox children={children} label={label} name={name} type={type} disabled={disabled} {...attr} />

  const groupClassName = "flex flex-col mb-4 gap-2";
  const labelClassName = [
    disabled ? 'text-neutral-500' : '',
  ].join(' ');

  const inputClassName = [
    "outline-none",
    "w-full",
    "bg-transparent",
  ].join(' ');

  const inputWrapperClass = [
    "input-wrapper-group",
    "outline",
    "outline-transparent",
    "inline",
    "group",
    "border border-neutral-300",
    "focus-within:border-primary",
    "focus-within:outline-4",
    "focus-within:outline-primary-100",
    "[&:has(:disabled)]:bg-neutral-200",
    "hover:outline-primary-100",
    "rounded", 
    "w-full",
    "px-4 py-2",
  ].join(' ');

  const handleWrapperClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className={groupClassName} onClick={handleWrapperClick}>
      <label className={labelClassName}>{label ?? children ?? name ?? ''}</label>
      <div className={inputWrapperClass}>
        <input {...attr} ref={inputRef} disabled={disabled} type={type} className={inputClassName} name={name} />
      </div>
    </div>
  );
}
