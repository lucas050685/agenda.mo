import z from 'zod';

export const WhereValueValidator = z.union([z.string(), z.number()]);

const WhereDefaultOperatorValidator = z.object({
  like: z.string().optional(),
  greaterThan: z.number().optional(),
  greaterThanEqualTo: z.number().optional(),
  lessThan: z.number().optional(),
  lessThanEqualTo: z.number().optional(),
  in: z.union([z.string(), z.number()]).array().optional(),
});

const WhereNotOperator = z.object({
  not: z.union([WhereDefaultOperatorValidator, WhereValueValidator]).optional(),
});

export const WhereOperationValidator = WhereDefaultOperatorValidator.merge(WhereNotOperator);
export const WhereConditionValidator = z.union([WhereValueValidator, WhereOperationValidator]);
export const WhereStatementValidator = z.record(WhereConditionValidator);
