import { FooterLinkGroupProps } from "./types";

export function FooterLinkGroup({ children }: FooterLinkGroupProps): JSX.Element {
  const groupClassName = [
    'flex',
    'justify-center',
    'divide-x',
    'p-2'
  ].join(' ');

  return <div className={groupClassName}>
    {children}
  </div>;
}
