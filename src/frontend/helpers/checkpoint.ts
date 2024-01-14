function stringfyData(data: any): string {
  if (typeof data === 'string') return data;
  if (typeof data === 'number') return data.toString();
  if (typeof data === 'function') return 'Function()';
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return 'Error()';
  }
}

export function checkpoint(data: any){
  const dataString = stringfyData(data);
  console.log('Checkpoint', dataString);
}
