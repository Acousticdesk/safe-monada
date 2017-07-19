import { safe } from '../src/index';

describe('safe(n: number)', () => {
  test('should create a safe object for 0', () => {
    expect(safe(0)).not.toBeNull();
  });

  test('should create a safe object for -1', () => {
    expect(safe(-1)).not.toBeNull();
  });

  test('should create a safe object for 100', () => {
    expect(safe(100)).not.toBeNull();
  });

  test('should create a safe object for 0xFFFFFFFF', () => {
    expect(safe(0xFFFFFFFF)).not.toBeNull();
  });
});

describe('safe(b: boolean)', () => {
  test('should create a safe object for false', () => {
    expect(safe(false)).not.toBeNull();
  });

  test('should create a safe object for true', () => {
    expect(safe(true)).not.toBeNull();
  });
});

describe('safe(s: string)', () => {
  test('should create a safe object for empty string', () => {
    expect(safe('')).not.toBeNull();
  });

  test('should create a safe object for "abc"', () => {
    expect(safe('abc')).not.toBeNull();
  });
});

describe('safe(d: date)', () => {
  test('should create a safe object for new Date', () => {
    expect(safe(new Date())).not.toBeNull();
  });
});

describe('safe(f: function)', () => {
  test('should create a safe object for () => {}', () => {
    expect(safe(() => {})).not.toBeNull();
  });
});

describe('safe(obj: {})', () => {
  test('should create a safe object for {}', () => {
    expect(safe({})).not.toBeNull();
  });

  test('should create a safe object for { x: 1, y: 2 }', () => {
    expect(safe({ x: 1, y: 2 })).not.toBeNull();
  });
});

describe('safe(arr: [any])', () => {
  test('should create a safe object for []', () => {
    expect(safe({})).not.toBeNull();
  });

  test('should create a safe object for [1, 2]', () => {
    expect(safe([1, 2])).not.toBeNull();
  });
});

describe('safe(obj?)', () => {
  test('should create a safe object for null', () => {
    expect(safe(null)).not.toBeNull();
  });

  test('should create a safe object for undefined', () => {
    expect(safe()).not.toBeNull();
  });
});