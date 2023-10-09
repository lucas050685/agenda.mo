import { EventBus } from "./interfaces";
import { EventName } from "./types";

export namespace emitEvent {
  export type Params = {
    eventName: EventName;
    body?: any;
  }

  export type Adapters = {
    eventBus: EventBus;
  }
}

type Params = emitEvent.Params;
type Adapters = emitEvent.Adapters;

export async function emitEvent({eventName, body}: Params, adapters: Adapters) {
  try {
    await adapters.eventBus.emit(eventName, body);
  } catch(e: any) {
    // TODO: Implement logger interface
  }
}
