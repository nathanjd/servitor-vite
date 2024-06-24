/**
 * Returns true when all characters in text are numeric and represent a whole
 * positive integer.
 */
export const isTextInteger = (text: string): boolean =>
    /^(0|[1-9][0-9]*)$/.test(text);
