export function swithCase(
  obj: object,
  choice: string,
  defaultResponse: string | number = ''
): string | number {
  return obj[choice] ?? defaultResponse;
}

export function swithCaseMap(
  map: any,
  key: any,
  defaultResponse: string | number = 'Not has item'
) {
  return map.get(key) ?? console.log(defaultResponse);
}
