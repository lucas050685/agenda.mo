import { useRef, ChangeEvent, useState } from 'react';
import { InputBoxProps } from './types';
import { CheckBox } from './CheckBox';

export function InputBox({ label, children, name, type, disabled, validator, ...attr }: InputBoxProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (type === "checkbox") return <CheckBox children={children} label={label} name={name} type={type} disabled={disabled} {...attr} />

  const inputLabel = label ?? children ?? name ?? null;

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

  const errorClassName = [
    'bg-amber-200',
    'border',
    'border-amber-300',
    'rounded',
    'text-amber-800',
    'text-sm',
    'p-2',
    'relative',

    'after:absolute',
    'after:bottom-full',
    'after:left-4',
    'after:border-b-8',
    'after:border-l-8',
    'after:border-r-8',
    'after:border-b-amber-200',
    'after:border-l-transparent',
    'after:border-r-transparent',
  ].join(' ');

  const handleWrapperClick = () => {
    inputRef.current?.focus()
  }

  const handleSetErrorMessage = (message: string | null, element: HTMLInputElement) => {
    setErrorMessage(message);
    element.setCustomValidity(message ?? attr.error ?? '');
  }

  const hadleChanges = (event: ChangeEvent<HTMLInputElement>)=>{
    if (attr.onChange)  attr.onChange(event);
    const element = event.target;
    const value = event.target.value;
    if(!attr['validate-empty'] && value.trim() === ''){
      return handleSetErrorMessage(null, element);
    }

    if (validator){
      const validation = validator(value);
      if(typeof(validation) === 'string' && validation.trim() != '') {
        return handleSetErrorMessage(validation, element);
      }

      if(typeof(validation) === 'boolean'){
        if(validation) return handleSetErrorMessage(null, element);
        return handleSetErrorMessage('Ops, algo não parece certo aqui', element);
      }
    }
    
  }

  return (
    <div className={groupClassName} onClick={handleWrapperClick}>
      {inputLabel && <label className={labelClassName}>{inputLabel} {attr.required ? '*' : ''}</label>}
      <div className={inputWrapperClass}>
        <input {...attr} onChange={hadleChanges} ref={inputRef} disabled={disabled} type={type} className={inputClassName} name={name} />
      </div>
      {(errorMessage || attr.error) && <div className={errorClassName}>{errorMessage ?? attr.error}</div>}
    </div>
  );
}
