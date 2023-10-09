import { ZodError } from "zod";

export function stringifyZodError(error: ZodError): string {
  const errors = error.errors;
  const lines: string[] = [];

  errors.forEach(e => {
    const pathName = e.path.length > 0 ? 
      `${e.path.join(' | ')}:` : 
      `${(e as any).expected ?? 'object'} is`.toLowerCase();

    const message = `${pathName} ${e.message}`;
    lines.push(message);
  })

  return lines.join('\n');
}