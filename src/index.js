import { isFunc, safeProps, applyUnpacked, copyObjectForAssign } from './helpers';
import { $$unpacked, $$private } from './symbols';

export { $$unpacked };
export const __ = $$unpacked;

let _safe = null;
let _nothing = null;
const objDefProp = Object.defineProperties;

class _Safe {
  /**
   * Creates an instance of _Safe.
   * 
   * @param {any} obj 
   * @memberof _Safe
   */
  constructor(obj) {
    return obj != null ? objDefProp(this, safeProps(obj)) : _nothing;
  }

  /**
   * Returns unpacked value. 
   * 
   * Alias: ".$()"
   * 
   * @returns {any}
   * @memberof _Safe
   */
  unpack() { return this[$$private]; }

  /**
   * Returns true - if packed value is null or underfined, otherwise
   * returns false
   * 
   * @returns {Boolean}
   * @memberof _Safe
   */
  isNothing() {
    return this[$$private] == null;
  }


  /**
   * Returns true -- if packed value is not null and not undefined,
   * otherwise return false
   * 
   * @returns {Boolean}
   * @memberof _Safe
   */
  isNotNothing() {
    return this[$$private] != null;
  }

  /**
   * Returns packed value if it is not a Nothing, otherwise returns packed def
   * 
   * Alias: ".$e(def)"
   * 
   * @param {any} def 
   * @returns {_Safe}
   * @memberof _Safe
   */
  ensure(def) {
    const obj = this[$$private];
    return obj != null ? this : _safe(def);
  }

  /**
   * Returns packed value if it couldn't be converted to false, otherwise
   * returns packed def.
   * 
   * Alias: ".$ee(def)"
   * 
   * @param {any} def 
   * @returns {_Safe}
   * @memberof _Safe
   */
  ensureFalse(def) {
    const obj = this[$$private];
    return obj ? this : _safe(def);
  }

  /**
   * Returns packed value if it is a function, otherwise returns packed def.
   * The def is not ensured to be a function.
   * 
   * Alias: ".ef(def)"
   * 
   * @param {any} def 
   * @returns {_Safe}
   * @memberof _Safe
   */
  ensureFunc(def) {
    const obj = this[$$private];
    return isFunc(obj) ? this : _safe(def);
  }

  /**
   * Returns packed value if it is an array, otherwise returns packed def.
   * The def is not ensured to be an array.
   * 
   * Alias: ".ea(arr)"
   * 
   * @param {any} arr 
   * @returns {_Safe}
   * @memberof _Safe
   */
  ensureArray(arr) {
    const obj = this[$$private];
    if (obj == null) return _safe(arr || []);
    return Array.isArray(obj) ? this : _safe(arr || [obj]);
  }

  /**
   * Calls the packed value as a function with args as parameters.
   * if packed value is not a function 
   * 
   * @param {any[]} args 
   * @returns {_Safe}
   * @memberof _Safe
   */
  call(...args) {
    const obj = this[$$private];
    return isFunc(obj) ? _safe(obj(...args)) : _nothing;
  }

  /**
   * Returns packed method <name> binded to the packed value.
   * If packed value is Nothing or it doesn't have method <name> the
   * method returns packed undefined
   * 
   * Alias: ".$m(name)"
   * 
   * @param {String} name 
   * @returns {_Safe}
   * @memberof _Safe
   */
  method(name) {
    const obj = this[$$private];
    return this.get(name).ensureFunc().map(m => m.bind(obj));
  }

  callMethod(name, ...args) {
    return this.method(name).call(...args);
  }
  /**
   * Returns a packed value of field <fld> of the current packed value.
   * if current packed value is Nothing or doesn't have the field <fld>
   * the packed undefined is returned.
   * 
   * if get is called with any parameters it returns the unpacked value.
   * 
   * Alias: ".$(fld)"
   * 
   * @param {String|Number} [fld]
   * @returns {_Safe}
   * @memberof _Safe
   */
  get(fld) {
    if (arguments.length === 0) return this.unpack();
    const obj = this[$$private];
    return obj != null && fld != null ? _safe(obj[fld]) : _nothing;
  }

  /**
   * Creates new object and assigns its field <fld> with value <val>.
   * The new object is created as a copy of unpacked value if it is not null
   * and its typs is one of: object, array or function. In other cases 
   * the empty object will be created.
   * 
   * Fucntion returns the packed new object
   * 
   * Alias: ".$(fld, val)"
   * 
   * @param {String|Number} fld 
   * @param {any} val 
   * @returns {_Safe}
   * @memberof _Safe
   */
  set(fld, val) {
    const newObj = copyObjectForAssign(this[$$private]);
    newObj[fld] = val;
    return _safe(newObj);
  }

  /**
   * Returns new packed value created by the <mapper>-function using current
   * packed value.
   * 
   * Alias: ".$to(mapper)"
   * 
   * @param {Function} mapper - the mapper function: any => any
   * @returns {_Safe}
   * @memberof _Safe
   */
  map(mapper, ...args) {
    const obj = this[$$private];
    args = applyUnpacked(args, obj);
    return obj != null ? _safe(mapper).call(...args) : _nothing;
  }


  /**
   * Alias for unpack, get and set:
   * 
   * .$() -> .unpack()
   * .$(fld) -> .get(fld)
   * .$(fld, val) -> .set(fld, val)
   * 
   * @param {any[]} args 
   * @returns {_Safe|any}
   * @memberof _Safe
   */
  $(...args) {
    return args.length === 2 ? this.set(...args) : this.get(...args);
  }
}

// Aliases
_Safe.prototype.end = _Safe.prototype.unpack;
_Safe.prototype.$m = _Safe.prototype.method;
_Safe.prototype.$mc = _Safe.prototype.callMethod;
_Safe.prototype.$u = _Safe.prototype.unpack;
_Safe.prototype.$e = _Safe.prototype.ensure;
_Safe.prototype.$ee = _Safe.prototype.ensureEmpty;
_Safe.prototype.$ef = _Safe.prototype.ensureFunc;
_Safe.prototype.$ea = _Safe.prototype.ensureArray;
_Safe.prototype.$to = _Safe.prototype.map;

/**
 * Packs the <obj> to _Safe
 * 
 * @param {any} obj
 * @returns {_Safe}
 */
export const safe = obj => new _Safe(obj);
_safe = safe;

export const Nothing = Object.create(_Safe.prototype, safeProps());
_nothing = Nothing;
_safe.Nothing = Nothing;
_Safe.prototype.Nothing = Nothing;
