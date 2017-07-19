const isFunc = f => typeof f === 'function';
const isSettable = obj => (
  obj != null && ['object', 'function'].indexOf(typeof obj) >= 0
);

let _safe = null;

const prop = value => (
  { value, writable: false, enumerable: false, configurable: false }
);

const defProps = Object.defineProperties;

const sPrivateObj = Symbol('privateObj');

class _Safe {
  constructor(obj) {
    defProps(this, { [sPrivateObj]: prop(obj), isSafe: prop(true) });
  }

  unpack() { return this[sPrivateObj]; }

  isNothing() {
    return _safe(this[sPrivateObj] == null);
  }

  ensure(def) {
    const obj = this[sPrivateObj];
    return obj != null ? this : _safe(def);
  }

  ensureFalse(def) {
    const obj = this[sPrivateObj];
    return obj ? this : _safe(def);
  }

  ensureFunc(def) {
    const obj = this[sPrivateObj];
    return isFunc(obj) ? this : _safe(def);
  }

  call(...args) {
    const obj = this[sPrivateObj];
    return isFunc(obj) ? _safe(obj(...args)) : _safe();
  }

  ensureArray(arr) {
    const obj = this[sPrivateObj];
    if (obj == null) return _safe(arr || []);
    return Array.isArray(obj) ? this : _safe(arr || [obj]);
  }

  method(name) {
    const obj = this[sPrivateObj];
    return this.get(name).map(m => m.bind(obj));
  }

  get(fld) {
    if (arguments.length === 0) return this;
    const obj = this[sPrivateObj];
    return obj != null && fld != null ? _safe(obj[fld]) : _safe();
  }

  set(fld, val) {
    const obj = this[sPrivateObj];
    let newObj;

    if (!isSettable(obj)) newObj = {};
    else if (Array.isArray(obj)) newObj = obj.slice();
    else if (isFunc(obj)) newObj = (...args) => obj(...args);
    else newObj = { ...obj };

    newObj[fld] = val;
    return _safe(newObj);
  }

  length() {
    const obj = this[sPrivateObj];
    return obj != null ? _safe(obj.length) : _safe();
  }

  map(mapper, ...args) {
    const obj = this[sPrivateObj];
    return obj != null ? _safe(mapper).call(obj, ...args) : _safe();
  }

  $(...args) {
    return args.length > 1 ? this.set(...args) : this.get(...args);
  }

  ifThenElse(pos, neg) {
    const res = this[sPrivateObj] ? pos : neg;
    return _safe(res).ensureFunc(() => res).call(this);
  }

  fork(...funcs) {
    return _safe(...funcs.map(
      f => (isFunc(f) ? f(this) : _safe(f))
    ));
  }
}

_Safe.prototype.end = _Safe.prototype.unpack;
_Safe.prototype.$m = _Safe.prototype.method;

export const safe = obj => new _Safe(obj);
_safe = safe;
