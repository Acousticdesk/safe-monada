import { safe } from '../src/index';

const sEnsure = Symbol('ensure');

describe('safe(n: number).ensureFalse(s: Symbol).unpack()', () => {
  test('should return Symbol for safe(0) for safe(0)', () => {
    expect(safe(0).ensureFalse(sEnsure).unpack()).toEqual(sEnsure);
  });

  test('should return -1 for safe(-1)', () => {
    expect(safe(-1).ensureFalse(sEnsure).unpack()).toEqual(-1);
  });

  test('should return 100 for safe(100)', () => {
    expect(safe(100).ensureFalse(sEnsure).unpack()).toEqual(100);
  });

  test('should return 0xFFFFFFFF for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).ensureFalse(sEnsure).unpack()).toEqual(0xFFFFFFFF);
  });
});

describe('safe(b: boolean).ensureFalse(s: Symbol).unpack()', () => {
  test('should return Symbol for safe(false)', () => {
    expect(safe(false).ensureFalse(sEnsure).unpack()).toEqual(sEnsure);
  });

  test('should return true for safe(true)', () => {
    expect(safe(true).ensureFalse(sEnsure).unpack()).toEqual(true);
  });
});

describe('safe(s: string).ensureFalse(s: Symbol).unpack()', () => {
  test('should return Symbol for safe("")', () => {
    expect(safe('').ensureFalse(sEnsure).unpack()).toEqual(sEnsure);
  });

  test('should return "abc" for safe("abc")', () => {
    expect(safe('abc').ensureFalse(sEnsure).unpack()).toEqual('abc');
  });
});

describe('safe(d: date).ensureFalse(s: Symbol).unpack()', () => {
  test('should return new Date for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).ensureFalse(sEnsure).unpack()).toEqual(d);
  });
});

describe('safe(f: function).ensureFalse(s: Symbol).unpack()', () => {
  test('should return () => {} for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).ensureFalse(sEnsure).unpack()).toEqual(NOOP);
  });
});

describe('safe(obj: {}).ensureFalse(s: Symbol).unpack()', () => {
  test('should return {} for safe({})', () => {
    const obj = {};
    expect(safe(obj).ensureFalse(sEnsure).unpack()).toEqual(obj);
  });

  test('should return { x: 1, y: 2 } for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).ensureFalse(sEnsure).unpack()).toEqual({ x: 1, y: 2 });
  });
});

describe('safe(arr: [any]).ensureFalse(s: Symbol).unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).ensureFalse(sEnsure).unpack()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    expect(safe([1, 2]).ensureFalse(sEnsure).unpack()).toEqual([1, 2]);
  });
});

describe('safe(obj?).ensureFalse(s: Symbol).unpack()', () => {
  test('should return Symbol for safe(null)', () => {
    expect(safe(null).ensureFalse(sEnsure).unpack()).toBe(sEnsure);
  });

  test('should return Symbol for safe()', () => {
    expect(safe().ensureFalse(sEnsure).unpack()).toBe(sEnsure);
  });
});
