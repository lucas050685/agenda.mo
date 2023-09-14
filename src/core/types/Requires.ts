export type Requires<Type> = {
  [Property in keyof Type]-?: Type[Property]
};
