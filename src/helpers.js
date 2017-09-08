import { $$unpacked, $$private, $$safe } from './symbols';

export const isFunc = f => typeof f === 'function';
export const isSettable = obj => (
  obj != null && ['object', 'function'].indexOf(typeof obj) >= 0
);

export const prop = value => (
  { value, writable: false, enumerable: false, configurable: false }
);

export const safeProps = obj => ({
  [$$private]: prop(obj && obj[$$safe] ? obj.unpack() : obj),
  [$$safe]: prop(true),
  isSafe: prop(true)
});


const applyReducer = value => ({ newArgs, applied }, a) => {
  if (a === $$unpacked) {
    a = value;
    applied = true;
  }
  newArgs.push(a);
  return { newArgs, applied };
};

export const applyUnpacked = (args, value) => {
  const { newArgs, applied } = args.reduce(
    applyReducer(value),
    { newArgs: [], applied: false }
  );
  if (applied) return newArgs;
  args.unshift(value);
  return args;
};

export const copyObjectForAssign = obj => {
  if (!isSettable(obj)) {
    return {};
  }
  if (Array.isArray(obj)) {
    return obj.slice();
  }
  if (isFunc(obj)) {
    return (...args) => obj(...args);
  }
  return { ...obj };
};
