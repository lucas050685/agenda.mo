export function asNumber(value: string | number | undefined): number {
  if(typeof value === 'number') return value;
  if(typeof value === 'undefined') return NaN;
  return parseInt(value);
}
