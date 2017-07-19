import { safe } from '../src/index';

describe("safe(n: number).get('x').unpack()", () => {
  test('should return undefined for safe(0)', () => {
    expect(
      safe(0).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(-1)', () => {
    expect(
      safe(-1).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(100)', () => {
    expect(
      safe(100).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(0xFFFFFFFF)', () => {
    expect(
      safe(0xFFFFFFFF).get('x').unpack()
    ).toBeUndefined();
  });
});

describe("safe(b: boolean).get('x').unpack()", () => {
  test('should return undefined for safe(false)', () => {
    expect(
      safe(false).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(true)', () => {
    expect(
      safe(true).get('x').unpack()
    ).toBeUndefined();
  });
});

describe("safe(s: string).get('x').unpack()", () => {
  test('should return undefined for safe(empty string)', () => {
    expect(
      safe('').get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe("abc")', () => {
    expect(
      safe('abc').get('x').unpack()
    ).toBeUndefined();
  });
});

describe("safe(d: date).get('getFullYear').unpack()", () => {
  test('should return current year for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).get('getFullYear').unpack()).toEqual(d.getFullYear);
  });
});

describe("safe(f: function).get('x').unpack()", () => {
  test('should return undefined for safe(() => {})', () => {
    const NOOP = () => {};
    expect(
      safe(NOOP).get('x').unpack()
    ).toBeUndefined();
  });
});

describe("safe(obj: {}).get('x').unpack()", () => {
  test('should return undefined for safe({})', () => {
    const obj = {};
    expect(
      safe(obj).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return 1 for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).get('x').unpack()
    ).toEqual(1);
  });
});

describe("safe(arr: [any]).get('x').unpack()", () => {
  test('should return undefined for safe([])', () => {
    expect(
      safe([]).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe([1, 2])', () => {
    expect(
      safe([1, 2]).get('x').unpack()
    ).toBeUndefined();
  });
});

describe("safe(obj?).get('x').unpack()", () => {
  test('should return undefined for safe(null)', () => {
    expect(
      safe(null).get('x').unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe()', () => {
    expect(
      safe().get('x').unpack()
    ).toBeUndefined();
  });
});


describe('safe(n: number).get(0).unpack()', () => {
  test('should return undefined for safe(0)', () => {
    expect(
      safe(0).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(-1)', () => {
    expect(
      safe(-1).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(100)', () => {
    expect(
      safe(100).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(0xFFFFFFFF)', () => {
    expect(
      safe(0xFFFFFFFF).get(0).unpack()
    ).toBeUndefined();
  });
});

describe('safe(b: boolean).get(0).unpack()', () => {
  test('should return undefined for safe(false)', () => {
    expect(
      safe(false).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(true)', () => {
    expect(
      safe(true).get(0).unpack()
    ).toBeUndefined();
  });
});

describe('safe(s: string).get(0).unpack()', () => {
  test('should return undefined for safe(empty string)', () => {
    expect(
      safe('').get(0).unpack()
    ).toBeUndefined();
  });

  test('should return "a" for safe("abc")', () => {
    expect(
      safe('abc').get(0).unpack()
    ).toEqual('a');
  });
});

describe('safe(d: date).get(0).unpack()', () => {
  test('should return null for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).get(0).unpack()).toBeUndefined();
  });
});

describe('safe(f: function).get(0).unpack()', () => {
  test('should return undefined for safe(() => {})', () => {
    const NOOP = () => {};
    expect(
      safe(NOOP).get(0).unpack()
    ).toBeUndefined();
  });
});

describe('safe(obj: {}).get(0).unpack()', () => {
  test('should return undefined for safe({})', () => {
    const obj = {};
    expect(
      safe(obj).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).get(0).unpack()
    ).toBeUndefined();
  });
});

describe('safe(arr: [any]).get(0).unpack()', () => {
  test('should return undefined for safe([])', () => {
    expect(
      safe([]).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return 1 for safe([1, 2])', () => {
    expect(
      safe([1, 2]).get(0).unpack()
    ).toEqual(1);
  });
});

describe('safe(obj?).get(0).unpack()', () => {
  test('should return undefined for safe(null)', () => {
    expect(
      safe(null).get(0).unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe()', () => {
    expect(
      safe().get(0).unpack()
    ).toBeUndefined();
  });
});
