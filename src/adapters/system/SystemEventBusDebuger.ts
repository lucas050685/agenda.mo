import { EventBus } from "@/core/interfaces";

export class SystemEventBusDebuger implements EventBus {
  emit(eventName: string, body?: any): boolean | void | Promise<void> {
    console.log(`Event: ${eventName}`, body);
  }
}
