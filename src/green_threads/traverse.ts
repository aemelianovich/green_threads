/* eslint-disable @typescript-eslint/no-explicit-any */
import { Priority, priorityMap } from './traverse_priorities.js';

async function* traverse<T>(
  iterable: Iterable<T>,
  priority: Priority = 'low',
  cb: (value: T, index: number, stop: () => void) => any,
): AsyncGenerator {
  // Init variables
  const options = priorityMap[priority];
  let i = 0;
  const iter = iterable[Symbol.iterator]();
  let res: IteratorResult<T> | { done: false } = { done: false };

  const stop = () => {
    res = { done: true, value: undefined };
  };

  // Start track execution time
  let start = Date.now();

  while (!res.done) {
    res = iter.next();
    cb(res.value, i, stop);
    i++;
    if (Date.now() - start > options.maxExecTime) {
      yield new Promise((resolve) => {
        setTimeout(() => resolve(0), options.minSleepTime);
      });

      start = Date.now();
    }
  }
}

export default traverse;
