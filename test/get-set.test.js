import { safe } from '../src/index';


describe('safe().$', () => {
  test('safe(obj).$(fld) should call safe(obj).get', () => {
    const packed = safe();
    packed.get = jest.fn();
    packed.set = jest.fn();
    packed.$('x');
    expect(packed.get.mock.calls).toEqual([['x']]);
    expect(packed.set.mock.calls.length).toEqual(0);
  });

  test('safe(obj).$() should call safe(obj).get', () => {
    const packed = safe();
    packed.get = jest.fn();
    packed.set = jest.fn();
    packed.$();
    expect(packed.get.mock.calls).toEqual([[]]);
    expect(packed.set.mock.calls.length).toEqual(0);
  });

  test('safe(obj).$(fld, val) should call safe(obj).set', () => {
    const packed = safe();
    packed.get = jest.fn();
    packed.set = jest.fn();
    packed.$('x', 1);
    expect(packed.get.mock.calls.length).toEqual(0);
    expect(packed.set.mock.calls).toEqual([['x', 1]]);
  });

  test('safe(obj).$(fld, undfined) should call safe(obj).set', () => {
    const packed = safe();
    packed.get = jest.fn();
    packed.set = jest.fn();
    packed.$('x', undefined);
    expect(packed.get.mock.calls.length).toEqual(0);
    expect(packed.set.mock.calls).toEqual([['x', undefined]]);
  });
});
