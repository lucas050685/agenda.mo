import z from 'zod';
import { EventNameValidator } from "@core/validators";

export type EventName = z.infer<typeof EventNameValidator>;
