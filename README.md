# safe-monada

The Implementation of the MayBy-monada that provides piping calculations for
any values.

## Installation
```shell
npm i --save safe-monada
```

## Usage

```javascript
import { safe } from 'safe-monada';

const error = () => console.error('No callback provided');

function run(props, btn) {
  const cbs = safe(props).$('callbacks');
  cbs
    .$(btn)
    .ensureFunc(cbs.$('default'))
    .ensureFunc(error)
    .call();
};

const props = {
  callbacks: {
    'default': () => console.log('Hello World'),
    'btnCancel': () => console.warn('Cancel Button clicked'),
    'btnOk': () => console.info('Ok Clicked -- everything is good');
  }
};

run(props, 'btnOk'); // prints: Ok Clicked -- everything is good
run(props, 'btnCancel'); // prints: Warning: Cancel Button clicked
run(props, 'btnOtherOne'); // prints: Hello World
run(props); // prints: Hello World
run({}, 'btnOk'); // prints: Error: No callback provided
run(); // prints: Error: No callback provided

/// In all cases no exception will be thrown.
```

## Methods of `safe`-objects:

#### 1. `.unpack()` or `.$()`

Returns value unpacked from the *safe*-object

#### 2. `.isNothing()`

Returns *safe*-`true` if packed value is null or undefined.
Otherwise returns *safe*-`false`.

#### 3. `.ensure(def)` or `.$e(def)`

Returns *safe*-object wrapped the `def` if current packed value is null
or undefined. Otherwise returns the same *safe*-object.

#### 4. `.ensureFalse(def)` or `.$ee(def)`

Returns *safe*-object wrapped the `def` if current packed value couldn't
be converted to `true`.
Otherwise returns the same *safe*-object.

#### 5. `.ensureFunc(def)` or `.$ef(def)`

Returns packed value if it is a function, otherwise returns packed def.
The `def` is not ensured to be a function.

#### 6. `.ensureArray(arr)` or `.$ea(arr)`

Returns packed value if it is an array, otherwise returns packed `arr`. 
The `arr` is not ensured to be an array.

#### 7. `call(...args)`

Calls the packed value as a function with `...args` as parameters and reurns
the result packed into the *safe*-object.

#### 8. `method(name)` or `.$m(name)`

Returns packed method `name` binded to the packed value.
If packed value is Nothing or it doesn't have method `name`
the method returns packed undefined

#### 9. `.get(fld)` or `.$(fld)`

Returns a packed value of field `fld` of the current packed value.
if current packed value is Nothing or doesn't have the field `fld`
the packed undefined is returned.

if get is called without any parameters it returns the unpacked value.


#### 10. `.set(fld, val)` or `.$(fld, val)`

Creates new object and assigns its field `fld` with value `val`.
The new object is created as a copy of unpacked value if it is not null
and its type is one of: object, array or function. In other cases 
the empty object will be created.

Fucntion returns the packed new object

#### 11. `.map(mapper)` or `.to(mapper)`

Call the `mapper`-function and passes the unpacked value as only one argument.
Returns the result packed in the *safe*-object.

if `mapper` is not a function or currently packed value is null or nothing
the function return pacjked-`undefined`.

#### 12. `.$()`, `.$(fld)`, `.$(fld, val)`

Aliases for unpack, get and set respectively.

```js
safeObj.$() -> safeObj.unpack();
safeObj.$(fld) -> safeObj.get(fld);
safeObj.$(fld, val) -> safeObj.set(fld, val);
```