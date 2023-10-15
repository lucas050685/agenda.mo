import z from 'zod';
import { WhereStatementValidator, WhereConditionValidator } from '@/core/validators';

export type WhereCondition = z.infer<typeof WhereConditionValidator>;
export type WhereStatement = z.infer<typeof WhereStatementValidator>;
