import { UseMutateFunction } from '@tanstack/react-query'

type PromisifiedMutationFn<Vars = void, Data = any> = (vars: Vars) => Promise<Data>

export function promisifyMutation<Data = any, TError = Error, Vars = any>(
  fn: UseMutateFunction<Data, Error, Vars>
): PromisifiedMutationFn<Vars, Data> {
  return function(vars: Vars){
    return new Promise<Data>((resolve, reject) => {
      fn(vars, {
        onSuccess: (data) => resolve(data),
        onError: (e) => reject(e),
      });
    });
  }
}
