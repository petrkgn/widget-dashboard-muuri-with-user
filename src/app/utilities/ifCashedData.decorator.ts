export function ifCashedData() {
  return function (target: any, key: string, descriptor: any) {
    let cashedRequestArgs = {};
    console.log('load', cashedRequestArgs);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      if (JSON.stringify(cashedRequestArgs) === JSON.stringify(args)) {
        console.log('Returning from cache', cashedRequestArgs);
        return;
      } else {
        console.log('Calling Api', cashedRequestArgs);
        cashedRequestArgs = args;
        return originalMethod.apply(this, args);
      }
    };
    console.log(descriptor);
    return descriptor;
  };
}
