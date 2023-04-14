const OCW_COURSE_META = 808
const OCW_MAKER_META = 1337
const NSO_COURSE_META = 2117
const NSO_MAKER_META = 2245

// Nintendo Course Bit Map: 0000000000000000000_1000__________________________01000101______
// Nintendo Player Bit Map: 0000000000000000000_1000__________________________11000101______

// The layout is PADDING, VALUE_A, META_A, VALUE_B, META_B, VALUE_C

const VALUE_SIZE_A = 1n
const META_SIZE_A = 4n
const VALUE_SIZE_B = 26n
const META_SIZE_B = 8n
const VALUE_SIZE_C = 6n

// OR this with an uint64 to filter out the meta bits
const VALUE_MASK = 0b1111111100001111111111111111111111111100000000111111n

// OR this with an uint64 to filter out the value bits
const META_MASK = 0b0000000011110000000000000000000000000011111111000000n

const INT1_MASK = 0b1n
const INT4_MASK = 0b1111n
const INT6_MASK = 0b111111n
const INT8_MASK = 0b11111111n
const INT12_MASK = 0b111111111111n
const INT14_MASK = 0b11111111111111n
const INT26_MASK = 0b11111111111111111111111111n
const INT33_MASK = 0b111111111111111111111111111111111n

const nintendoBase30 = "0123456789BCDFGHJKLMNPQRSTVWXY"

const base30Map = createBase30Map(nintendoBase30)

/**
 * Removes dashes from a string
 * @param {string} input 
 * @returns string
 */
function removeDashes(input) {
    return input.replace(/-/g, "")
}

/**
 * Creates a map from a base30 character to its value
 * @param {string} base30
 * @returns {Map<string, number>}
 */
function createBase30Map(base30) {
    const map = new Map()
    for (let i = 0; i < base30.length; i++) {
        map.set(base30[i], BigInt(i))
    }
    return map
}

/**
 * Decodes a base30 string into a number
 * @param {string} encoded 
 * @returns {number}
 */
function base30Decode(encoded) {
    const base = 30n
    let decimal = 0n
    for (const char of encoded) {
        if (!base30Map.has(char)) continue
        const value = base30Map.get(char)
        decimal = decimal * base + value
    }
    return decimal
}

function base30Encode(decimal) {
    const base = 30n
    const encoded = []
    while (decimal > 0n) {
        const index = decimal % base
        encoded.push(nintendoBase30[index])
        decimal = divMod(decimal, base)
    }
    return encoded.reverse().join("")
}

/**
 * Performs integer division on a number
 * @param {number} numerator
 * @param {number} denominator
 * @returns {number}
 */
function divMod(numerator, denominator) {
    let quotient = 0n
    for (let i = 63n; i >= 0n; i--) {
        if ((numerator >> i) >= denominator) {
            quotient += 1n << i
            numerator -= denominator << i
        }
    }
    return quotient
}

/**
 * Formats a base30 string into a code with dashes, and a minimum of 3 segments.
 * @param {string} input 
 * @returns {string}
 */
function formatCode(input) {
    const padding = (3 - input.length % 3) % 3
    const paddedInput = input.padStart(input.length + padding, "0")
    const formattedString = []
    for (let i = 0; i < paddedInput.length; i += 3) {
        if (i > 0) formattedString.push("-")
        formattedString.push(paddedInput.slice(i, i + 3))
    }
    while (formattedString.reduce((a, b) => a + b.length, 0) < 11) {
        if (formattedString.length > 0) formattedString.unshift("-")
        formattedString.unshift("000")
    }
    return formattedString.join("")
}

const VALUE_OF = Symbol('valueOf')

class Code {
    /**
     * Constructs a code from an optional string or a number
     * @param {string | number | Code} [value]
     */
    constructor(value) {
        if (arguments.length === 0) {
            this[VALUE_OF] = 0
            return
        }
        if (arguments.length > 1) {
            throw new Error("Too many arguments")
        }
        if (typeof value === "string") {
            this[VALUE_OF] = base30Decode(removeDashes(value))
        } else if (typeof value === "bigint") {
            this[VALUE_OF] = value
        } else if (value instanceof Code) {
            this[VALUE_OF] = value[VALUE_OF]
        } else {
            throw new Error("Invalid argument")
        }
    }

    /**
     * @private
     * Inverts the base30 representation of the code.
     * @returns {Code}
     */
    inverse() {
        const s = base30Encode(this[VALUE_OF]).padStart(9, "0").split("").reverse().join("")
         return new Code(base30Decode(s))
    }

    /**
     * Reads the meta value of the code
     * @returns {number}
     */
    getMeta() {
        const i = this.inverse()[VALUE_OF]
        const a = i >> VALUE_SIZE_B >> META_SIZE_B >> VALUE_SIZE_C & INT4_MASK
        const b = i >> VALUE_SIZE_C & INT8_MASK
        const ret = (a << META_SIZE_B) | b
        return Number(ret)
    }

    /**
     * Constructs a new code with the given meta value
     * @param {number} meta
     * @returns {Code}
     * @throws {Error} If the meta value is too large
     */
    withMeta(meta) {
        meta = BigInt(meta)
        if (meta > INT14_MASK) {
            throw new Error("Meta value too large")
        }
        let i = this.inverse()[VALUE_OF]
        const a = (meta & INT14_MASK) >> META_SIZE_B
        const b = meta & INT8_MASK
        i = i & VALUE_MASK
        i = i | (a << VALUE_SIZE_B << META_SIZE_B << VALUE_SIZE_C) | (b << VALUE_SIZE_C)
        return new Code(i).inverse()
    }

    /**
     * Reads the value of the code
     * @returns {number}
     */
    getValue() {
        const i = this.inverse()[VALUE_OF]
        const a = i >> META_SIZE_A >> VALUE_SIZE_B >> META_SIZE_B >> VALUE_SIZE_C & INT1_MASK
        const b = i >> META_SIZE_B >> VALUE_SIZE_C & INT26_MASK
        const c  = i & INT6_MASK
        const value = (a << VALUE_SIZE_B << VALUE_SIZE_C) | (b << VALUE_SIZE_C) | c
        return Number(value)
    }

    /**
     * Constructs a new code with the given value
     * @param {number} value
     * @returns {Code}
     * @throws {Error} if the value is too large
     */
    withValue(value) {
        value = BigInt(value)
        if (value > INT33_MASK) {
            throw new Error("Value too large")
        }
        let i = this.inverse()[VALUE_OF]
        const a = (value >> VALUE_SIZE_B >> VALUE_SIZE_C) & INT1_MASK
        const b = (value >> VALUE_SIZE_C) & INT26_MASK
        const c = value & INT6_MASK
        i = i & META_MASK
        i = i | (a << META_SIZE_A << VALUE_SIZE_B << META_SIZE_B << VALUE_SIZE_C) | (b << META_SIZE_B << VALUE_SIZE_C) | c
        return new Code(i).inverse()
    }

    /**
     * @returns {string}
     */
    toString() {
        return formatCode(base30Encode(this[VALUE_OF]))
    }

    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return this[VALUE_OF]
        }
        return this.toString()
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.toString()
    }

    [Symbol.toStringTag]() {
        return "Code"
    }

    /**
     * @returns {string}
     */
    toJSON() {
        return this.toString()
    }

    /**
     * @returns {number}
     */
    valueOf() {
        return this[VALUE_OF]
    }

    /**
     * @param {Code} other
     * @returns {boolean}
     */
    equals(other) {
        return this[VALUE_OF] === other[VALUE_OF]
    }
}

/**
 * Determines if a given code is an NSO course
 * @param {string} code 
 * @returns {boolean}
 */
function isNSOCourseCode(code) {
    return new Code(code).getMeta() === NSO_COURSE_META
}

/**
 * Determines if a given code is an NSO maker
 * @param {string} code
 * @returns {boolean}
 */
function isNSOMakerCode(code) {
    return new Code(code).getMeta() === NSO_MAKER_META
}

/**
 * Determines if a given code is an OCW course
 * @param {string} code
 * @returns {boolean}
 */
function isOCWCourseCode(code) {
    return new Code(code).getMeta() === OCW_COURSE_META
}

/**
 * Determines if a given code is an OCW maker
 * @param {string} code 
 * @returns {boolean}
 */
function isOCWMakerCode(code) {
    return new Code(code).getMeta() === OCW_MAKER_META
}

/**
 * Returns the type of a given code, returning "NSO_COURSE", "NSO_MAKER", "OCW_COURSE", "OCW_MAKER", or "UNKNOWN".
 * @param {string} code 
 * @returns {"NSO_COURSE"|"NSO_MAKER"|"OCW_COURSE"|"OCW_MAKER"|"UNKNOWN"}
 */
function getCodeType(code) {
    switch (new Code(code).getMeta()) {
        case NSO_COURSE_META:
            return "NSO_COURSE"
        case NSO_MAKER_META:
            return "NSO_MAKER"
        case OCW_COURSE_META:
            return "OCW_COURSE"
        case OCW_MAKER_META:
            return "OCW_MAKER"
        default:
            return "UNKNOWN"
    }
}

exports.Code = Code
exports.OCW_COURSE_META = OCW_COURSE_META
exports.OCW_MAKER_META = OCW_MAKER_META
exports.NSO_COURSE_META = NSO_COURSE_META
exports.NSO_MAKER_META = NSO_MAKER_META
exports.isNSOCourseCode = isNSOCourseCode
exports.isNSOMakerCode = isNSOMakerCode
exports.isOCWCourseCode = isOCWCourseCode
exports.isOCWMakerCode = isOCWMakerCode
exports.getCodeType = getCodeType
