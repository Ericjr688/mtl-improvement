/**
 * Converts a string to lowercase and hyphenates it.
 * @param {string} str - The input string.
 * @return {string} - The processed string.
 */
function hyphenateAndLowercase(str) {
  return str
    .toLowerCase()            // Convert the string to lowercase
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-');  // Replace multiple hyphens with a single hyphen
}

export { hyphenateAndLowercase };
