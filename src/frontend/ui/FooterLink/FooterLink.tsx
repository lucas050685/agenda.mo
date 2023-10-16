import { FooterLinkProps } from "./types";
import { Link } from "react-router-dom";

export function FooterLink({ children, to }: FooterLinkProps) : JSX.Element {
  const linkClassName = [
    'px-4',
    'text-neutral-500',
    'hover:text-neutral-700',
    'hover:underline',
  ].join(' ');

  return <Link className={linkClassName} to={to ?? '#'}>{children}</Link>
}
