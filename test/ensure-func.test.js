import { safe } from '../src/index';

const NOOP = () => {};

describe('safe(n: number).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe(0) for safe(0)', () => {
    expect(safe(0).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe(-1)', () => {
    expect(safe(-1).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe(100)', () => {
    expect(safe(100).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(b: boolean).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe(false)', () => {
    expect(safe(false).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe(true)', () => {
    expect(safe(true).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(s: string).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP string for safe("")', () => {
    expect(safe('').ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP" for safe("abc")', () => {
    expect(safe('abc').ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(d: date).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(f: function).ensureFunc(f: function).unpack()', () => {
  test('should return x => x + x for safe(x => x + x)', () => {
    const double = x => x + x;
    expect(safe(double).ensureFunc(NOOP).unpack()).toBe(double);
  });
  test('should return another NOOP for safe(() => {})', () => {
    const anotherNOOP = () => {};
    expect(safe(anotherNOOP).ensureFunc(NOOP).unpack()).toBe(anotherNOOP);
  });
});

describe('safe(obj: {}).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe({})', () => {
    const obj = {};
    expect(safe(obj).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(arr: [any]).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe([])', () => {
    expect(safe([]).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe([1, 2])', () => {
    expect(safe([1, 2]).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});

describe('safe(obj?).ensureFunc(f: function).unpack()', () => {
  test('should return NOOP for safe(null)', () => {
    expect(safe(null).ensureFunc(NOOP).unpack()).toBe(NOOP);
  });

  test('should return NOOP for safe()', () => {
    expect(safe().ensureFunc(NOOP).unpack()).toBe(NOOP);
  });
});
