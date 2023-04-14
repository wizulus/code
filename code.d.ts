declare class Code {
    /**
     * Constructs a code from an optional string or a number
     * @param {string | number | Code} [value]
     */
    constructor(value?: string | number | Code);

    /**
     * @private
     * Inverts the base30 representation of the code.
     * @returns {Code}
     */
    private inverse(): Code;

    /**
     * Reads the meta value of the code
     * @returns {number}
     */
    getMeta(): number;

    /**
     * Constructs a new code with the given meta value
     * @param {number} meta
     * @returns {Code}
     * @throws {Error} If the meta value is too large
     */
    withMeta(meta: number): Code;

    /**
     * Reads the value of the code
     * @returns {number}
     */
    getValue(): number;

    /**
     * Constructs a new code with the given value
     * @param {number} value
     * @returns {Code}
     * @throws {Error} if the value is too large
     */
    withValue(value: number): Code;

    /**
     * @returns {string}
     */
    toString(): string;

    [Symbol.toPrimitive](hint: 'string' | 'number'): string | number;

    [Symbol.for("nodejs.util.inspect.custom")](): string;

    [Symbol.toStringTag](): string;

    /**
     * @returns {string}
     */
    toJSON(): string;

    /**
     * @returns {number}
     */
    valueOf(): number;

    /**
     * @param {Code} other
     * @returns {boolean}
     */
    equals(other: Code): boolean;
}

/**
 * Determines if a given code is an NSO course
 * @param {string} code 
 * @returns {boolean}
 */
declare function isNSOCourseCode(code: string): boolean;

/**
 * Determines if a given code is an NSO maker
 * @param {string} code
 * @returns {boolean}
 */
declare function isNSOMakerCode(code: string): boolean;

/**
 * Determines if a given code is an OCW course
 * @param {string} code
 * @returns {boolean}
 */
declare function isOCWCourseCode(code: string): boolean;

/**
 * Determines if a given code is an OCW maker
 * @param {string} code 
 * @returns {boolean}
 */
declare function isOCWMakerCode(code: string): boolean;

/**
 * Returns the type of a given code, returning "NSO_COURSE", "NSO_MAKER", "OCW_COURSE", "OCW_MAKER", or "UNKNOWN".
 * @param {string} code 
 * @returns {"NSO_COURSE"|"NSO_MAKER"|"OCW_COURSE"|"OCW_MAKER"|"UNKNOWN"}
 */
declare function getCodeType(code: string): "NSO_COURSE" | "NSO_MAKER" | "OCW_COURSE" | "OCW_MAKER" | "UNKNOWN";

declare const OCW_COURSE_META: number;
declare const OCW_MAKER_META: number;
declare const NSO_COURSE_META: number;
declare const NSO_MAKER_META: number;

export {
    Code,
    isNSOCourseCode,
    isNSOMakerCode,
    isOCWCourseCode,
    isOCWMakerCode,
    getCodeType,
    OCW_COURSE_META,
    OCW_MAKER_META,
    NSO_COURSE_META,
    NSO_MAKER_META,
};
