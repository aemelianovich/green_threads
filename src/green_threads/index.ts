/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Priority } from './traverse_priorities.js';
import traverse from './traverse.js';

/**
 * forEach method can iterate through huge Iterables Structures without freezing the input/output
 * Different timeouts can be used based on priority parameter.
 *
 * Callback function can accept value, index and stop function that allowed to stop iteration process.
 *
 */
async function forEach<T>(
  iterable: Iterable<T>,
  priority: Priority,
  cb: (value: T, index: number, stop: () => void) => void,
): Promise<undefined> {
  for await (const _ of traverse(iterable, priority, cb)) {
    null;
  }
  return;
}

export default forEach;
