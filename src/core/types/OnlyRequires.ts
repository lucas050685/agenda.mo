export type OnlyRequires<Type, Keys extends keyof Type> = {
  [Property in Keys]-?: Type[Property]
} & {
  [Property in keyof Type]?: Type[Property];
  
};
