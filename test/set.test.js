import deepFreeze from 'deep-freeze';
import { safe } from '../src/index';

describe("safe(n: number).set('x', 1).unpack()", () => {
  test('should return { x: 1 } for safe(0)', () => {
    expect(
      safe(0).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return undefined for safe(-1)', () => {
    expect(
      safe(-1).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return undefined for safe(100)', () => {
    expect(
      safe(100).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return undefined for safe(0xFFFFFFFF)', () => {
    expect(
      safe(0xFFFFFFFF).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });
});

describe("safe(b: boolean).set('x', 1).unpack()", () => {
  test('should return undefined for safe(false)', () => {
    expect(
      safe(false).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return undefined for safe(true)', () => {
    expect(
      safe(true).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });
});

describe("safe(s: string).set('x', 1).unpack()", () => {
  test('should return undefined for safe(empty string)', () => {
    expect(
      safe('').set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return undefined for safe("abc")', () => {
    expect(
      safe('abc').set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });
});

describe("safe(d: date).set('x', 1).unpack()", () => {
  test('should return  { ...date, x: 1 } for safe(new Date)', () => {
    const d = deepFreeze(new Date());
    const unpacked = safe(d).set('x', 1).unpack();
    expect(unpacked).toEqual({ ...d, x: 1 });
    expect(unpacked).not.toBe(d);
  });
});

describe("safe(f: function).set('x', 1)", () => {
  test('should return a afunction with x:1 for safe(() => {})', () => {
    const NOOP = deepFreeze(() => {});
    const unpacked = safe(NOOP).set('x', 1).unpack();
    expect(unpacked).toBeInstanceOf(Function);
    expect(unpacked.x).toBe(1);
  });

  test('should return a afunction with x:1 for safe(() => {})', () => {
    const func = jest.fn();
    const unpacked = safe(func).set('x', 1).unpack();
    expect(unpacked).toBeInstanceOf(Function);
    expect(unpacked.x).toBe(1);
    unpacked(1);
    expect(func.mock.calls).toEqual([[1]]);
    unpacked(1, 2);
    expect(func.mock.calls).toEqual([[1], [1, 2]]);
  });
});

describe("safe(obj: {}).set('x', 1).unpack()", () => {
  test('should return { x: 1 } for safe({})', () => {
    const obj = deepFreeze({});
    expect(
      safe(obj).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return { a: 1, b: 2, x: 1 } for safe({ a: 1, b: 2 })', () => {
    const obj = deepFreeze({ a: 1, b: 2 });
    const unpacked = safe(obj).set('x', 1).unpack();
    expect(unpacked).toEqual({ a: 1, b: 2, x: 1 });
    expect(unpacked).not.toBe(obj);
  });
});

describe("safe(arr: [any]).set('x', 1).unpack()", () => {
  test('should return ["x": 1] for safe([])', () => {
    const arr = deepFreeze([]);
    const unpacked = safe(arr).set('x', 1).unpack();
    expect(Object.keys(unpacked)).toEqual(['x']);
    expect(unpacked.x).toBe(1);
    expect(unpacked).not.toBe(arr);
  });

  test('should return [1, 2, "x": 1] for safe([1, 2])', () => {
    const arr = deepFreeze([1, 2]);
    const unpacked = safe(arr).set('x', 1).unpack();
    expect(Object.keys(unpacked)).toEqual(['0', '1', 'x']);
    expect(unpacked.x).toBe(1);
    expect(unpacked).not.toBe(arr);
  });
});

describe("safe(obj?).set('x', 1).unpack()", () => {
  test('should return { x: 1 } for safe(null)', () => {
    expect(
      safe(null).set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });

  test('should return { x: 1 } for safe()', () => {
    expect(
      safe().set('x', 1).unpack()
    ).toEqual({ x: 1 });
  });
});


describe('safe(n: number).set(0, 1).unpack()', () => {
  test('should return undefined for safe(0)', () => {
    expect(
      safe(0).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe(-1)', () => {
    expect(
      safe(-1).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe(100)', () => {
    expect(
      safe(100).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe(0xFFFFFFFF)', () => {
    expect(
      safe(0xFFFFFFFF).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });
});

describe('safe(b: boolean).set(0, 1).unpack()', () => {
  test('should return undefined for safe(false)', () => {
    expect(
      safe(false).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe(true)', () => {
    expect(
      safe(true).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });
});

describe('safe(s: string).set(0, 1).unpack()', () => {
  test('should return undefined for safe(empty string)', () => {
    expect(
      safe('').set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return "a" for safe("abc")', () => {
    expect(
      safe('abc').set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });
});

describe('safe(d: date).set(0, 1).unpack()', () => {
  test('should return { ...d, 0: 1 } for safe(new Date)', () => {
    const d = new Date();
    expect(safe(d).set(0, 1).unpack()).toEqual({ ...d, 0: 1 });
  });
});

describe('safe(f: function).set(0, 1)', () => {
  test('should return a afunction with 0:1 for safe(() => {})', () => {
    const NOOP = deepFreeze(() => {});
    const unpacked = safe(NOOP).set(0, 1).unpack();
    expect(unpacked).toBeInstanceOf(Function);
    expect(unpacked[0]).toBe(1);
  });

  test('should return a afunction with x:1 for safe(() => {})', () => {
    const func = jest.fn();
    const unpacked = safe(func).set(0, 1).unpack();
    expect(unpacked).toBeInstanceOf(Function);
    expect(unpacked[0]).toBe(1);
    unpacked(1);
    expect(func.mock.calls).toEqual([[1]]);
    unpacked(1, 2);
    expect(func.mock.calls).toEqual([[1], [1, 2]]);
  });
});

describe('safe(obj: {}).set(0, 1).unpack()', () => {
  test('should return undefined for safe({})', () => {
    const obj = {};
    expect(
      safe(obj).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe({ x: 1, y: 2 })', () => {
    expect(
      safe({ x: 1, y: 2 }).set(0, 1).unpack()
    ).toEqual({ x: 1, y: 2, 0: 1 });
  });
});

describe('safe(arr: [any]).set(0, 1).unpack()', () => {
  test('should return [1] for safe([])', () => {
    expect(
      safe([]).set(0, 1).unpack()
    ).toEqual([1]);
  });

  test('should return [1, 1] for safe([2, 1])', () => {
    expect(
      safe([2, 1]).set(0, 1).unpack()
    ).toEqual([1, 1]);
  });
});

describe('safe(obj?).set(0, 1).unpack()', () => {
  test('should return undefined for safe(null)', () => {
    expect(
      safe(null).set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });

  test('should return undefined for safe()', () => {
    expect(
      safe().set(0, 1).unpack()
    ).toEqual({ 0: 1 });
  });
});
