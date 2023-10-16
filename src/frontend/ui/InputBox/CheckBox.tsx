import { useRef, useState } from 'react';
import { InputBoxProps } from "./types";

export function CheckBox({ children, label, name, disabled, checked, ...attr}: InputBoxProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedValue, setChecked] = useState(checked);

  const groupClassName = [
    'outline',
    'outline-offset-2',
    'rounded-sm',
    'outline-transparent',
    'focus-within:outline-primary-100',
    'group/checkbox',
    'flex',
    'flex-row',
    'gap-2',
    'mb-4',
  ].join(' ');

  const labelClassName = [
    'cursor-pointer'
  ].join(' ');

  const inputClassName = [
    'outline-none'
  ].join(' ');

  const handleWrapperClick = () => {
    setChecked(!checkedValue);
  }

  return (
    <div className={groupClassName} onClick={handleWrapperClick}>
      <input checked={checkedValue} className={inputClassName} type="checkbox" {...attr} ref={inputRef} disabled={disabled} name={name} />
      <label className={labelClassName}>{label ?? children ?? name ?? ''}</label>
    </div>
  );
}