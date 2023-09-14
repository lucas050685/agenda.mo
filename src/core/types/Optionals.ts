export type Optionals<Type> = {
  [Property in keyof Type]?: Type[Property];
};
