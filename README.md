# @wizulus/code

A JavaScript library for encoding and decoding Super Mario Maker 2 codes.

## Installation

You can install this library using npm:
    
```bash
npm install @wizulus/code
```

## ⚙️ Usage

```js
import Code, {
    OCW_COURSE, // 808
    OCW_MAKER,  // 1337
    NSO_COURSE, // 2117
    NSO_MAKER   // 2245
} from '@wizulus/code'

// Parse a code from a string
const code = new Code('NGD-SJG-21H')

// Get the code's type
const meta = code.getMeta()

// Compare the code's type to a constant
switch (meta) {
    case OCW_COURSE:
        console.log('This is an Open Course World course code.')
        break
    case OCW_MAKER:
        console.log('This is an Open Course World maker code.')
        break
    case NSO_COURSE:
        console.log('This is an Nintendo Switch Online course code.')
        break
    case NSO_MAKER:
        console.log('This is an Nintendo Switch Online maker code.')
        break
    default:
        console.log('This is an unknown code.')
        break
}
```

## 😳 What?!

Super Mario Maker 2 codes are 9 character, base-30 strings using the following characters:

```
0123456789BCDFGHJKLMNPQRSTVWXY
```

But it's not as simple as than. For starters, the base-30 encoding is in reverse. 
If you decode a code and convert it to base-2, you'll get a 45 bit number that looks like this:

`010001111100011101010101010000111000101101000`

The code is broken up into 5 sections:

```
0-1000-11111000111010101010100001-11000101-101000
|  |          |                    |       |
|  META_A     |                    META_B  |     
|             |                            |
VALUE_A       VALUE_B                      VALUE_C
```

`VALUE_A`, `VALUE_B`, and `VALUE_C` combined are the integer value of the code. 

`META_A` and `META_B` are used to determine the type of code.

In the above example, you can concatenate `META_A` (`1000`) and `META_B` (`11000101`) to get `1000-11000101` which is `2245` in decimal, the meta value for an NSO Maker.

You can also combine `VALUE_A` (`0`), `VALUE_B` (`11111000111010101010100001`), and `VALUE_C` (`101000`) to get `0-11111000111010101010100001-101000` which is `4176128104` in decimal, the numerical value for this record.

## 🤔 Why?

The combined 12 bits of `META_A` and `META_B` are used to determine the type of code. All course codes in SMM2 share the same meta value, as do all maker codes.

By changing the meta value, Open Course World can issue course and maker codes that are guaranteed to never collide with Nintendo Switch Online codes.

It also allows you to determine if a given code is from Nintendo or Open Course World.

## 🤓 How?

You can use the above usage example to parse the code and compare its meta value to known constants, or you can use a simple helper function:

```js
import { getCodeType } from '@wizulus/code'

const type = getCodeType('NGD-SJG-21H')

// type === 'NSO_MAKER'
```

### Possible Types:

- `'OCW_COURSE'`: Open Course World course code
- `'OCW_MAKER'`: Open Course World maker code
- `'NSO_COURSE'`: Nintendo Switch Online course code
- `'NSO_MAKER'`: Nintendo Switch Online maker code
- `'UNKNOWN'`: Unknown code type

# 📃 API Reference

This module provides functionality to work with Nintendo Switch Online Course Codes.

## `Code` Class

The `Code` class represents a Nintendo Switch Online Course Code.

### Methods

#### `constructor(value?: string | number | Code): Code`

Constructs a new code object.

##### Parameters

- `value` (`string | number | Code`, optional): The initial value of the code object.

#### `getMeta(): number`

Returns the meta value of the code.

#### `withMeta(meta: number): Code`

Constructs a new code object with the given meta value.

##### Parameters

- `meta` (`number`): The meta value to set.

##### Returns

- A new `Code` object with the specified meta value.

##### Throws

- `Error`: If the meta value is too large.

#### `getValue(): number`

Returns the value of the code.

#### `withValue(value: number): Code`

Constructs a new code object with the given value.

##### Parameters

- `value` (`number`): The value to set.

##### Returns

- A new `Code` object with the specified value.

##### Throws

- `Error`: If the value is too large.

#### `toString(): string`

Returns the formatted code string.

#### `valueOf(): number`

Returns the code value.

#### `equals(other: Code): boolean`

Returns whether this code is equal to another code.

### Static Methods

#### `isNSOCourseCode(code: string): boolean`

Determines if a given code is an NSO course.

##### Parameters

- `code` (`string`): The code to check.

##### Returns

- `true` if the code is an NSO course code, `false` otherwise.

#### `isNSOMakerCode(code: string): boolean`

Determines if a given code is an NSO maker.

##### Parameters

- `code` (`string`): The code to check.

##### Returns

- `true` if the code is an NSO maker code, `false` otherwise.

#### `isOCWCourseCode(code: string): boolean`

Determines if a given code is an OCW course.

##### Parameters

- `code` (`string`): The code to check.

##### Returns

- `true` if the code is an OCW course code, `false` otherwise.

#### `isOCWMakerCode(code: string): boolean`

Determines if a given code is an OCW maker.

##### Parameters

- `code` (`string`): The code to check.

##### Returns

- `true` if the code is an OCW maker code, `false` otherwise.

#### `getCodeType(code: string): "NSO_COURSE"|"NSO_MAKER"|"OCW_COURSE"|"OCW_MAKER"|"UNKNOWN"`

Returns the type of a given code.

##### Parameters

- `code` (`string`): The code to check.

##### Returns

- `"NSO_COURSE"`, `"NSO_MAKER"`, `"OCW_COURSE"`, `"OCW_MAKER"`, or `"UNKNOWN"`.

### Constants

#### `OCW_COURSE_META: number`

The meta value for an OCW course code.

#### `OCW_MAKER_META: number`

The meta value for an OCW maker code.

#### `NSO_COURSE_META: number`

The meta value for an NSO course code.

#### `NSO_MAKER_META: number`

The meta value for an NSO maker code

---

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)


