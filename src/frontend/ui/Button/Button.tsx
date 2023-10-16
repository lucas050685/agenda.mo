import { Spinner } from '../Spinner';
import { ButtonProps } from './types';



export function Button({ label, className, children, loading, type }: ButtonProps): JSX.Element {
  const showSpinner: boolean = type === "submit" || !!loading;
  const spinnerClass = [
    'invisible',
    type === "submit" ? 'group-[.is-submitting]/form:visible' : '',
    'group-[.is-loading]/button:visible',
  ].join(' ');

  const buttonClassName = [
    className ?? '',
    "group/button",
    !!loading ? "is-loading" : '',
    "outline",
    "outline-4",
    "focus:outline-primary-200",
    "hover:outline-primary-100",
    "flex",
    "justify-center",
    "gap-2",
    "rounded",
    "bg-primary",
    "disabled:bg-neutral-400",
    "text-white",
    "py-4 px-10",
    "text-base",
  ].join(' ').trim();

  return <button className={buttonClassName}>
    {label} {children}
    {showSpinner && <Spinner className={spinnerClass} />}
  </button>
}