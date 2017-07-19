import { safe } from '../src/index';

describe('safe(n: number).call().unpack()', () => {
  test('should return undefined for safe(0)', () => {
    expect(
      safe(0).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(-1)', () => {
    expect(
      safe(-1).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(100)', () => {
    expect(
      safe(100).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(0xFFFFFFFF)', () => {
    expect(
      safe(0xFFFFFFFF).call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(b: boolean).call().unpack()', () => {
  test('should return undefined for safe(false)', () => {
    expect(
      safe(false).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(true)', () => {
    expect(
      safe(true).call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(s: string).call().unpack()', () => {
  test('should return undefined for safe(empty string)', () => {
    expect(
      safe('').call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe("abc")', () => {
    expect(
      safe('abc').call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(d: date).call().unpack()', () => {
  test('should return undefined for safe(new Date)', () => {
    const d = new Date();
    expect(
      safe(d).call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(f: function).call().unpack()', () => {
  test('should return undefined for safe(() => {})', () => {
    const NOOP = () => {};
    expect(
      safe(NOOP).call().unpack()
    ).toBeUndefined();
  });

  test('should return x for safe(x => x)', () => {
    const s = Symbol('s');
    expect(
      safe(x => x).call(s).unpack()).toBe(s);
  });

  test('should return x * x for safe(x => x * x)', () => {
    expect(safe(x => x * x).call(0).unpack()).toEqual(0);
    expect(safe(x => x * x).call(1).unpack()).toEqual(1);
    expect(safe(x => x * x).call(2).unpack()).toEqual(4);
  });

  test('should return Symbol for safe(() => Symbol)', () => {
    const s = Symbol('s');
    expect(safe(() => s).call(0).unpack()).toEqual(s);
  });
});

describe('safe(obj: {}).call().unpack()', () => {
  test('should return undefined for safe({})', () => {
    const obj = {};
    expect(
      safe(obj).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(arr: [any]).call().unpack()', () => {
  test('should return undefined for safe([])', () => {
    expect(
      safe([]).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe([1, 2])', () => {
    expect(
      safe([1, 2]).call().unpack()
    ).toBeUndefined();
  });
});

describe('safe(obj?).call().unpack()', () => {
  test('should return undefined for safe(null)', () => {
    expect(
      safe(null).call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe()', () => {
    expect(
      safe().call().unpack()
    ).toBeUndefined();
  });
});
