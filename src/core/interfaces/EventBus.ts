import { EventName } from "@/core/types";
export interface EventBus {
  emit(eventName: EventName, body?: any): (Promise<void> | void | boolean);
}
