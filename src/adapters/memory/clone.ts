export const clone = <T = any>(o: T): T => {
  try {
    const s = JSON.stringify(o);
    return JSON.parse(s) as T;
  }
  catch{
    throw new Error(`It is not possible to clone object ${typeof o}`);
  }
};
