import { safe } from '../src/index';

describe('safe(n: number).isNotNothing()', () => {
  test('should return false for safe(0)', () => {
    expect(safe(0).isNotNothing()).toEqual(true);
  });

  test('should return false for safe(-1)', () => {
    expect(safe(-1).isNotNothing()).toEqual(true);
  });

  test('should return false for safe(100)', () => {
    expect(safe(100).isNotNothing()).toEqual(true);
  });

  test('should return false for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).isNotNothing()).toEqual(true);
  });
});

describe('safe(b: boolean).isNotNothing()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).isNotNothing()).toEqual(true);
  });

  test('should return false for safe(true)', () => {
    expect(safe(true).isNotNothing()).toEqual(true);
  });
});

describe('safe(s: string).isNotNothing()', () => {
  test('should return false for safe(empty string)', () => {
    expect(safe('').isNotNothing()).toEqual(true);
  });

  test('should return false for safe("abc")', () => {
    expect(safe('abc').isNotNothing()).toEqual(true);
  });
});

describe('safe(d: date).isNotNothing()', () => {
  test('should return false for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).isNotNothing()).toEqual(true);
  });
});

describe('safe(f: function).isNotNothing()', () => {
  test('should return false for safe(() => {})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).isNotNothing()).toEqual(true);
  });
});

describe('safe(obj: {}).isNotNothing()', () => {
  test('should return false for safe({})', () => {
    const obj = {};
    expect(safe(obj).isNotNothing()).toEqual(true);
  });

  test('should return false for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).isNotNothing()).toEqual(true);
  });
});

describe('safe(arr: [any]).isNotNothing()', () => {
  test('should return false for safe([])', () => {
    expect(safe([]).isNotNothing()).toEqual(true);
  });

  test('should return false for safe([1, 2])', () => {
    expect(safe([1, 2]).isNotNothing()).toEqual(true);
  });
});

describe('safe(obj?).isNotNothing()', () => {
  test('should return true for safe(null)', () => {
    expect(safe(null).isNotNothing()).toEqual(false);
  });

  test('should return true for safe()', () => {
    expect(safe().isNotNothing()).toEqual(false);
  });
});
