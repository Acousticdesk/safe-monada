import { safe } from '../src/index';


describe('safe(safe(n: number)', () => {
  test('should create a safe object for 0', () => {
    expect(safe(safe(0))).not.toBeNull();
  });

  test('should create a safe object for -1', () => {
    expect(safe(safe(-1))).not.toBeNull();
  });

  test('should create a safe object for 100', () => {
    expect(safe(safe(100))).not.toBeNull();
  });

  test('should create a safe object for 0xFFFFFFFF', () => {
    expect(safe(safe(0xFFFFFFFF))).not.toBeNull();
  });
});

describe('safe(safe(b: boolean)', () => {
  test('should create a safe object for false', () => {
    expect(safe(safe(false))).not.toBeNull();
  });

  test('should create a safe object for true', () => {
    expect(safe(safe(true))).not.toBeNull();
  });
});

describe('safe(safe(s: string)', () => {
  test('should create a safe object for empty string', () => {
    expect(safe(safe(''))).not.toBeNull();
  });

  test('should create a safe object for "abc"', () => {
    expect(safe(safe('abc'))).not.toBeNull();
  });
});

describe('safe(safe(d: date)', () => {
  test('should create a safe object for new Date', () => {
    expect(safe(safe(new Date()))).not.toBeNull();
  });
});

describe('safe(safe(f: function)', () => {
  test('should create a safe object for () => {}', () => {
    expect(safe(safe(() => {}))).not.toBeNull();
  });
});

describe('safe(safe(obj: {})', () => {
  test('should create a safe object for {}', () => {
    expect(safe(safe({}))).not.toBeNull();
  });

  test('should create a safe object for { x: 1, y: 2 }', () => {
    expect(safe(safe({ x: 1, y: 2 }))).not.toBeNull();
  });
});

describe('safe(safe(arr: [any])', () => {
  test('should create a safe object for []', () => {
    expect(safe(safe({}))).not.toBeNull();
  });

  test('should create a safe object for [1, 2]', () => {
    expect(safe(safe([1, 2]))).not.toBeNull();
  });
});

describe('safe(safe(obj?)', () => {
  test('should create a safe object for null', () => {
    expect(safe(safe(null))).not.toBeNull();
  });

  test('should create a safe object for undefined', () => {
    expect(safe(safe())).not.toBeNull();
  });
});
