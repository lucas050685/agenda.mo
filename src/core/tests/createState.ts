export type State = Record<string, any>;
export type UpdateState = (newState: State) => State;

export function createState<T extends State>(initialState?: T): [T, UpdateState] {
  const state: any = {...initialState}
  const updateState = (newState: State) => {
    const keys = Object.keys(newState);
    keys.forEach((key) => state[key] = newState[key]);
    return state;
  };

  if(initialState) updateState(initialState);

  return [state as T, updateState];
}
