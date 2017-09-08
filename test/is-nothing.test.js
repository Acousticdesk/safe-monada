import { safe, Nothing } from '../src/index';

describe('safe(n: number).isNothing()', () => {
  test('should return false for safe(0)', () => {
    expect(safe(0).isNothing()).toEqual(false);
  });

  test('should return false for safe(-1)', () => {
    expect(safe(-1).isNothing()).toEqual(false);
  });

  test('should return false for safe(100)', () => {
    expect(safe(100).isNothing()).toEqual(false);
  });

  test('should return false for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).isNothing()).toEqual(false);
  });
});

describe('safe(b: boolean).isNothing()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).isNothing()).toEqual(false);
  });

  test('should return false for safe(true)', () => {
    expect(safe(true).isNothing()).toEqual(false);
  });
});

describe('safe(s: string).isNothing()', () => {
  test('should return false for safe(empty string)', () => {
    expect(safe('').isNothing()).toEqual(false);
  });

  test('should return false for safe("abc")', () => {
    expect(safe('abc').isNothing()).toEqual(false);
  });
});

describe('safe(d: date).isNothing()', () => {
  test('should return false for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).isNothing()).toEqual(false);
  });
});

describe('safe(f: function).isNothing()', () => {
  test('should return false for safe(() => {})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).isNothing()).toEqual(false);
  });
});

describe('safe(obj: {}).isNothing()', () => {
  test('should return false for safe({})', () => {
    const obj = {};
    expect(safe(obj).isNothing()).toEqual(false);
  });

  test('should return false for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).isNothing()).toEqual(false);
  });
});

describe('safe(arr: [any]).isNothing()', () => {
  test('should return false for safe([])', () => {
    expect(safe([]).isNothing()).toEqual(false);
  });

  test('should return false for safe([1, 2])', () => {
    expect(safe([1, 2]).isNothing()).toEqual(false);
  });
});

describe('safe(obj?).isNothing()', () => {
  test('should return true for safe(null)', () => {
    expect(safe(null).isNothing()).toEqual(true);
  });

  test('should return true for safe()', () => {
    expect(safe().isNothing()).toEqual(true);
  });
});

describe('safe(n: number) === Nothing', () => {
  test('should return false for safe(0)', () => {
    expect(safe(0) === Nothing).toEqual(false);
  });

  test('should return false for safe(-1)', () => {
    expect(safe(-1) === Nothing).toEqual(false);
  });

  test('should return false for safe(100)', () => {
    expect(safe(100) === Nothing).toEqual(false);
  });

  test('should return false for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF) === Nothing).toEqual(false);
  });
});

describe('safe(b: boolean) === Nothing', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false) === Nothing).toEqual(false);
  });

  test('should return false for safe(true)', () => {
    expect(safe(true) === Nothing).toEqual(false);
  });
});

describe('safe(s: string) === Nothing', () => {
  test('should return false for safe(empty string)', () => {
    expect(safe('') === Nothing).toEqual(false);
  });

  test('should return false for safe("abc")', () => {
    expect(safe('abc') === Nothing).toEqual(false);
  });
});

describe('safe(d: date) === Nothing', () => {
  test('should return false for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d) === Nothing).toEqual(false);
  });
});

describe('safe(f: function) === Nothing', () => {
  test('should return false for safe(() => {})', () => {
    const NOOP = () => {};
    expect(safe(NOOP) === Nothing).toEqual(false);
  });
});

describe('safe(obj: {}) === Nothing', () => {
  test('should return false for safe({})', () => {
    const obj = {};
    expect(safe(obj) === Nothing).toEqual(false);
  });

  test('should return false for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }) === Nothing).toEqual(false);
  });
});

describe('safe(arr: [any]) === Nothing', () => {
  test('should return false for safe([])', () => {
    expect(safe([]) === Nothing).toEqual(false);
  });

  test('should return false for safe([1, 2])', () => {
    expect(safe([1, 2]) === Nothing).toEqual(false);
  });
});

describe('safe(obj?) === Nothing', () => {
  test('should return true for safe(null)', () => {
    expect(safe(null) === Nothing).toEqual(true);
  });

  test('should return true for safe()', () => {
    expect(safe() === Nothing).toEqual(true);
  });
});
