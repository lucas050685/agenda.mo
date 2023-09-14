import { ZodError } from "zod";

export function stringifyZodError(error: ZodError): string {
  const errors = error.errors;
  const lines: string[] = [];

  errors.forEach(e => {
    const message = `${e.path.join(' | ')}: ${e.message}`;
    lines.push(message);
  })

  return lines.join('\n');
}