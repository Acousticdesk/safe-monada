import { safe } from '../src/index';


describe('safe(n: number).ensureArray([]).unpack()', () => {
  test('should return [] for safe(0)] for safe(0)', () => {
    expect(safe(0).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe(-1)', () => {
    expect(safe(-1).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe(100)', () => {
    expect(safe(100).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).ensureArray([]).unpack()).toEqual([]);
  });
});

describe('safe(b: boolean).ensureArray([]).unpack()', () => {
  test('should return [] for safe(false)', () => {
    expect(safe(false).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe(true)', () => {
    expect(safe(true).ensureArray([]).unpack()).toEqual([]);
  });
});

describe('safe(s: string).ensureArray([]).unpack()', () => {
  test('should return [] for safe("")', () => {
    expect(safe('').ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe("abc")', () => {
    expect(safe('abc').ensureArray([]).unpack()).toEqual([]);
  });
});

describe('safe(d: date).ensureArray([]).unpack()', () => {
  test('should return [] for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).ensureArray([]).unpack()).toEqual([]);
  });
});

describe('safe(f: function).ensureArray([]).unpack()', () => {
  test('should return [] for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).ensureArray([]).unpack()).toEqual([]);
  });
});

describe('safe(obj: {}).ensureArray([]).unpack()', () => {
  test('should return [] for safe({})', () => {
    const obj = {};
    expect(safe(obj).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).ensureArray([]).unpack()
    ).toEqual([]);
  });
});

describe('safe(arr: [any]).ensureArray([]).unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe([1, 2])', () => {
    const safeArr = safe([1, 2]);
    const ensuredArr = safeArr.ensureArray();
    expect(ensuredArr.unpack()).toEqual([1, 2]);
    expect(ensuredArr).toBe(safeArr);
  });
});

describe('safe(obj?).ensureArray([]).unpack()', () => {
  test('should return [] for safe(null)', () => {
    expect(safe(null).ensureArray([]).unpack()).toEqual([]);
  });

  test('should return [] for safe([])', () => {
    expect(safe().ensureArray([]).unpack()).toEqual([]);
  });
});


describe('safe(n: number).ensureArray().unpack()', () => {
  test('should return [0] for safe(0)] for safe(0)', () => {
    expect(safe(0).ensureArray().unpack()).toEqual([0]);
  });

  test('should return [-1] for safe(-1)', () => {
    expect(safe(-1).ensureArray().unpack()).toEqual([-1]);
  });

  test('should return [100] for safe(100)', () => {
    expect(safe(100).ensureArray().unpack()).toEqual([100]);
  });

  test('should return [0xFFFFFFFF] for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).ensureArray().unpack()).toEqual([0xFFFFFFFF]);
  });
});

describe('safe(b: boolean).ensureArray().unpack()', () => {
  test('should return [false] for safe(false)', () => {
    expect(safe(false).ensureArray().unpack()).toEqual([false]);
  });

  test('should return [true] for safe(true)', () => {
    expect(safe(true).ensureArray().unpack()).toEqual([true]);
  });
});

describe('safe(s: string).ensureArray().unpack()', () => {
  test('should return [""] for safe("")', () => {
    expect(safe('').ensureArray().unpack()).toEqual(['']);
  });

  test('should return ["abc"] for safe("abc")', () => {
    expect(safe('abc').ensureArray().unpack()).toEqual(['abc']);
  });
});

describe('safe(d: date).ensureArray().unpack()', () => {
  test('should return [new Date()] for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).ensureArray().unpack()).toEqual([d]);
  });
});

describe('safe(f: function).ensureArray().unpack()', () => {
  test('should return [() => {}] for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).ensureArray().unpack()).toEqual([NOOP]);
  });
});

describe('safe(obj: {}).ensureArray().unpack()', () => {
  test('should return [{}] for safe({})', () => {
    const obj = {};
    expect(safe(obj).ensureArray().unpack()).toEqual([obj]);
  });

  test('should return [{ x: 1, y: 2 }] for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).ensureArray().unpack()
    ).toEqual([{ x: 1, y: 2 }]);
  });
});

describe('safe(arr: [any]).ensureArray().unpack()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).ensureArray().unpack()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    const safeArr = safe([1, 2]);
    const ensuredArr = safeArr.ensureArray();
    expect(ensuredArr.unpack()).toEqual([1, 2]);
    expect(ensuredArr).toBe(safeArr);
  });
});

describe('safe(obj?).ensureArray().unpack()', () => {
  test('should return [] for safe(null)', () => {
    expect(safe(null).ensureArray().unpack()).toEqual([]);
  });

  test('should return [] for safe()', () => {
    expect(safe().ensureArray().unpack()).toEqual([]);
  });
});
