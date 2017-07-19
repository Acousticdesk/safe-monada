import { safe } from '../src/index';

const sEnsure = Symbol('ensure');

describe('safe(n: number).ensure(s: Symbol).unpack()', () => {
  test('should return 0 for safe(0) for safe(0)', () => {
    expect(safe(0).ensure(sEnsure).unpack()).toEqual(0);
  });

  test('should return -1 for safe(-1)', () => {
    expect(safe(-1).ensure(sEnsure).unpack()).toEqual(-1);
  });

  test('should return 100 for safe(100)', () => {
    expect(safe(100).ensure(sEnsure).unpack()).toEqual(100);
  });

  test('should return 0xFFFFFFFF for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).ensure(sEnsure).unpack()).toEqual(0xFFFFFFFF);
  });
});

describe('safe(b: boolean).ensure(s: Symbol).unpack()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).ensure(sEnsure).unpack()).toEqual(false);
  });

  test('should return true for safe(true)', () => {
    expect(safe(true).ensure(sEnsure).unpack()).toEqual(true);
  });
});

describe('safe(s: string).ensure(s: Symbol).unpack()', () => {
  test('should return empty string for safe("")', () => {
    expect(safe('').ensure(sEnsure).unpack()).toEqual('');
  });

  test('should return "abc" for safe("abc")', () => {
    expect(safe('abc').ensure(sEnsure).unpack()).toEqual('abc');
  });
});

describe('safe(d: date).ensure(s: Symbol).unpack()', () => {
  test('should return new Date for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).ensure(sEnsure).unpack()).toEqual(d);
  });
});

describe('safe(f: function).ensure(s: Symbol).unpack()', () => {
  test('should return () => {} for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).ensure(sEnsure).unpack()).toEqual(NOOP);
  });
});

describe('safe(obj: {}).ensure(s: Symbol).unpack()', () => {
  test('should return {} for safe({})', () => {
    const obj = {};
    expect(safe(obj).ensure(sEnsure).unpack()).toEqual(obj);
  });

  test('should return { x: 1, y: 2 } for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).ensure(sEnsure).unpack()).toEqual({ x: 1, y: 2 });
  });
});

describe('safe(arr: [any]).ensure(s: Symbol).unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).ensure(sEnsure).unpack()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    expect(safe([1, 2]).ensure(sEnsure).unpack()).toEqual([1, 2]);
  });
});

describe('safe(obj?).ensure(s: Symbol).unpack()', () => {
  test('should return Symbol for safe(null)', () => {
    expect(safe(null).ensure(sEnsure).unpack()).toBe(sEnsure);
  });

  test('should return Symbol for safe()', () => {
    expect(safe().ensure(sEnsure).unpack()).toBe(sEnsure);
  });
});
