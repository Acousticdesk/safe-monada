export const isFunc = f => typeof f === 'function';
export const isSettable = obj => (
  obj != null && ['object', 'function'].indexOf(typeof obj) >= 0
);

export const prop = value => (
  { value, writable: false, enumerable: false, configurable: false }
);

export const defProps = Object.defineProperties;
