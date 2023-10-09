import { WhereStatement, WhereCondition } from "@core/types";

function regexLike(like: string): RegExp {
  const s = like.split('*').join('.*?');
  return new RegExp(`^${s}$`, "g");
}

function testLike(sampleProp: any, like: string | undefined): boolean {
  if (like === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  const regex = regexLike(like);
  return regex.test(sampleProp.toString());
}

function testGreaterThan(sampleProp: any, greaterThan: number | undefined) {
  if (greaterThan === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  return parseFloat(sampleProp.toString()) > greaterThan;
}

function testGreaterThanEqualTo(sampleProp: any, greaterThan: number | undefined) {
  if (greaterThan === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  return parseFloat(sampleProp.toString()) >= greaterThan;
}

function testLessThan(sampleProp: any, lessThan: number | undefined) {
  if (lessThan === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  return parseFloat(sampleProp.toString()) < lessThan;
}

function testLessThanEqualTo(sampleProp: any, lessThan: number | undefined) {
  if (lessThan === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  return parseFloat(sampleProp.toString()) <= lessThan;
}

function testIn(sampleProp: any, inArray: (string | number)[] | undefined): boolean {
  if (inArray === undefined) return true;
  if (typeof sampleProp !== 'string' && typeof sampleProp !== 'number') return false;
  return inArray.includes(sampleProp);
}

function testNot(sampleProp: any, condition: WhereCondition | undefined){
  if (condition === undefined) return true;
  return !testCondition(sampleProp, condition);
}

function testContains(sampleProp: any, element: number | string | (string | number)[] | undefined) {
  if (element === undefined) return true;
  if (!Array.isArray(sampleProp)) return false;
  
  const parsedSample = sampleProp.map(prop => {
    try {
      return prop.toString();
    } catch {
      return undefined;
    }
  });

  if (!Array.isArray(element)) return parsedSample.includes(element);
  if (element.length === 0) return false;
  element = element.map(e => e.toString());
  for (let prop of parsedSample){
    if (element.includes(prop)) element = element.filter(e => e !== prop);
    if (element.length == 0) return true;
  }
  return false;
}

function testAfter(sampleProp: any, date: string | undefined): boolean {
  if (!date) return true;
  if (typeof sampleProp != 'string' && !(sampleProp instanceof Date)) return false;
  try{
    const propDate = new Date(sampleProp);
    const dateDate = new Date(date);
    return propDate >= dateDate;
  } catch {
    return false
  }
}

function testBefore(sampleProp: any, date: string | undefined): boolean {
  if (!date) return true;
  if (typeof sampleProp != 'string' && !(sampleProp instanceof Date)) return false;
  try{
    const propDate = new Date(sampleProp);
    const dateDate = new Date(date);
    return propDate <= dateDate;
  } catch {
    return false
  }
}

function testCondition(sampleProp: any, condition: WhereCondition): boolean {
  if (typeof condition === 'string' || typeof condition === 'number') return sampleProp === condition;
  if (!testLike(sampleProp, condition.like)) return false;
  if (!testGreaterThan(sampleProp, condition.greaterThan)) return false;
  if (!testGreaterThanEqualTo(sampleProp, condition.greaterThanEqualTo)) return false;
  if (!testLessThan(sampleProp, condition.lessThan)) return false;
  if (!testLessThanEqualTo(sampleProp, condition.lessThanEqualTo)) return false;
  if (!testIn(sampleProp, condition.in)) return false;
  if (!testContains(sampleProp, condition.contains)) return false;
  if (!testAfter(sampleProp, condition.after)) return false;
  if (!testBefore(sampleProp, condition.before)) return false;
  if (!testNot(sampleProp, condition.not)) return false;
  return true;
}

function testWhere(sample: Record<string, any>, where: WhereStatement): boolean {
  const props = Object.keys(where);
  for(let prop of props) if(!testCondition(sample[prop], where[prop])) return false;
  return true;
}

export function match(sample: Record<string, any>, where: WhereStatement | WhereStatement[]): boolean {
  const wheres = Array.isArray(where) ? where : [where];
  for (let w of wheres) if (testWhere(sample, w)) return true;
  return false;
}
