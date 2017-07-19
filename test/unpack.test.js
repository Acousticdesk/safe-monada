import { safe } from '../src/index';

describe('safe(n: number).unpack()', () => {
  test('should return 0 for safe(0) for safe(0)', () => {
    expect(safe(0).unpack()).toEqual(0);
  });

  test('should return -1 for safe(-1)', () => {
    expect(safe(-1).unpack()).toEqual(-1);
  });

  test('should return 100 for safe(100)', () => {
    expect(safe(100).unpack()).toEqual(100);
  });

  test('should return 0xFFFFFFFF for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).unpack()).toEqual(0xFFFFFFFF);
  });
});

describe('safe(b: boolean).unpack()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).unpack()).toEqual(false);
  });

  test('should return true for safe(true)', () => {
    expect(safe(true).unpack()).toEqual(true);
  });
});

describe('safe(s: string).unpack()', () => {
  test('should return empty string for safe("")', () => {
    expect(safe('').unpack()).toEqual('');
  });

  test('should return "abc" for safe("abc")', () => {
    expect(safe('abc').unpack()).toEqual('abc');
  });
});

describe('safe(d: date).unpack()', () => {
  test('should return new Date for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).unpack()).toEqual(d);
  });
});

describe('safe(f: function).unpack()', () => {
  test('should return () => {} for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).unpack()).toEqual(NOOP);
  });
});

describe('safe(obj: {}).unpack()', () => {
  test('should return {} for safe({})', () => {
    const obj = {};
    expect(safe(obj).unpack()).toEqual(obj);
  });

  test('should return { x: 1, y: 2 } for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).unpack()).toEqual({ x: 1, y: 2 });
  });
});

describe('safe(arr: [any]).unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).unpack()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    expect(safe([1, 2]).unpack()).toEqual([1, 2]);
  });
});

describe('safe(obj?).unpack()', () => {
  test('should return null for safe(null)', () => {
    expect(safe(null).unpack()).toBeNull();
  });

  test('should return undefined for safe()', () => {
    expect(safe().unpack()).toBeUndefined();
  });
});
