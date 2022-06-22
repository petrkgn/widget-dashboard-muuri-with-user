export function deepCopyObject<T extends object> (obj: T): T extends infer O? O: never {
  return JSON.parse(JSON.stringify(obj))
}