import { safe } from '../src/index';


describe('safe(obj?).method(name)', () => {
  test('should call object method for safe({ f }).method("f").call()', () => {
    const f = jest.fn();
    safe({ f }).method('f').call();
    expect(f.mock.calls).toEqual([[]]);
  });

  test('should return "1" for safe(1).method("toString").call().unpack()', () => {
    expect(
      safe(1).method('toString').call().unpack()
    ).toEqual('1');
  });

  test('should return current year for safe(new Date).method("getFullYear").call().unpack()', () => {
    const d = new Date();
    const year = d.getFullYear();
    expect(
      safe(d).method('getFullYear').call().unpack()
    ).toEqual(year);
  });

  test('should return undefined for safe(new Date).method("unexistingMethod").call().unpack()', () => {
    expect(
      safe(new Date()).method('unexistingMethod').call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(new Date).method().call().unpack()', () => {
    expect(
      safe(new Date()).method().call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe(null).method("toString").call().unpack()', () => {
    expect(
      safe(null).method('toString').call().unpack()
    ).toBeUndefined();
  });

  test('should return undefined for safe().method("toString").call().unpack()', () => {
    expect(
      safe(null).method('toString').call().unpack()
    ).toBeUndefined();
  });
});

