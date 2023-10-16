import classNames from 'classnames';
import { TitleProps } from './types';

const defaultClassName = [
  'text-4xl',
  'py-4',
  'mb-4',
].join(' ');

export function Title({ className, children }: TitleProps): JSX.Element {
  const titleClassNames = [
    'border-b',
    'border-b-neutral-200',
    defaultClassName
  ].join(' ');

  return (
  <h1 className={classNames(className, titleClassNames)}>
    {children}
  </h1>);
}


export function TitleCenter({ className, children }: TitleProps): JSX.Element {
  const titleClassNames = [
    'text-center',
    'text-6xl',
    defaultClassName
  ].join(' ');

  return (
  <h1 className={classNames(className, titleClassNames)}>
    {children}
  </h1>);
}

Title.Center = TitleCenter;