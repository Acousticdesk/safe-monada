import { safe } from '../src/index';

describe('safe(n: number).isNothing().unpack()', () => {
  test('should return false for safe(0)', () => {
    expect(safe(0).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe(-1)', () => {
    expect(safe(-1).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe(100)', () => {
    expect(safe(100).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(b: boolean).isNothing().unpack()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe(true)', () => {
    expect(safe(true).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(s: string).isNothing().unpack()', () => {
  test('should return false for safe(empty string)', () => {
    expect(safe('').isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe("abc")', () => {
    expect(safe('abc').isNothing().unpack()).toEqual(false);
  });
});

describe('safe(d: date).isNothing().unpack()', () => {
  test('should return false for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(f: function).isNothing().unpack()', () => {
  test('should return false for safe(() => {})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(obj: {}).isNothing().unpack()', () => {
  test('should return false for safe({})', () => {
    const obj = {};
    expect(safe(obj).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(arr: [any]).isNothing().unpack()', () => {
  test('should return false for safe([])', () => {
    expect(safe([]).isNothing().unpack()).toEqual(false);
  });

  test('should return false for safe([1, 2])', () => {
    expect(safe([1, 2]).isNothing().unpack()).toEqual(false);
  });
});

describe('safe(obj?).isNothing().unpack()', () => {
  test('should return true for safe(null)', () => {
    expect(safe(null).isNothing().unpack()).toEqual(true);
  });

  test('should return true for safe()', () => {
    expect(safe().isNothing().unpack()).toEqual(true);
  });
});
