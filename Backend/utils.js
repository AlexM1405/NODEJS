import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => {
  // Check if the path is a string and is not empty
  if (typeof path !== 'string' || !path) {
    throw new TypeError('The "path" argument must be a non-empty string.');
  }
   
  // Proceed with requiring the JSON file
  return require(path);
};