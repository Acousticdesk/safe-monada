import { safe } from '../src/index';


describe('safe(n: number).get().unpack()', () => {
  test('should return 0 for safe(0) for safe(0)', () => {
    expect(safe(0).get().unpack()).toEqual(0);
  });

  test('should return -1 for safe(-1)', () => {
    expect(safe(-1).get().unpack()).toEqual(-1);
  });

  test('should return 100 for safe(100)', () => {
    expect(safe(100).get().unpack()).toEqual(100);
  });

  test('should return 0xFFFFFFFF for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).get().unpack()).toEqual(0xFFFFFFFF);
  });
});

describe('safe(b: boolean).get().unpack()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).get().unpack()).toEqual(false);
  });

  test('should return true for safe(true)', () => {
    expect(safe(true).get().unpack()).toEqual(true);
  });
});

describe('safe(s: string).get().unpack()', () => {
  test('should return empty string for safe("")', () => {
    expect(safe('').get().unpack()).toEqual('');
  });

  test('should return "abc" for safe("abc")', () => {
    expect(safe('abc').get().unpack()).toEqual('abc');
  });
});

describe('safe(d: date).get().unpack()', () => {
  test('should return new Date for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).get().unpack()).toEqual(d);
  });
});

describe('safe(f: function).get().unpack()', () => {
  test('should return () => {} for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).get().unpack()).toEqual(NOOP);
  });
});

describe('safe(obj: {}).get().unpack()', () => {
  test('should return {} for safe({})', () => {
    const obj = {};
    expect(safe(obj).get().unpack()).toEqual(obj);
  });

  test('should return { x: 1, y: 2 } for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).get().unpack()).toEqual({ x: 1, y: 2 });
  });
});

describe('safe(arr: [any]).get().unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).get().unpack()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    expect(safe([1, 2]).get().unpack()).toEqual([1, 2]);
  });
});

describe('safe(obj?).get().unpack()', () => {
  test('should return Symbol for safe(null)', () => {
    expect(safe(null).get().unpack()).toBeNull();
  });

  test('should return Symbol for safe()', () => {
    expect(safe().get().unpack()).toBeUndefined();
  });
});
