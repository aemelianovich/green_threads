/* eslint-disable @typescript-eslint/no-explicit-any */
import { Priority, priorityMap } from './priorities.js';

type Resolve<T> = (value?: T) => void;

class IterableManager {
  static maxExecTime = 500;
  static #activeQueue: { [key in Priority]: number } = {
    low: 0,
    high: 0,
    critical: 0,
  };
  static #waitingQueue: [Resolve<unknown>, Priority][] = [];

  /**
   * forEach method can iterate through huge Iterables Structures without freezing the input/output
   * Different timeouts can be used based on priority parameter.
   *
   * Callback function can accept value, index and stop function that allowed to stop iteration process.
   *
   */
  static async forEach<T>(
    iterable: Iterable<T>,
    priority: Priority,
    cb: (value: T, index: number, stop: () => void) => void,
  ): Promise<undefined> {
    const asyncIter = this.#getAsyncIterator<T>(iterable, priority, cb);
    let res: IteratorResult<unknown> | { done: false } = { done: false };

    while (!res.done) {
      res = await asyncIter.next();
    }

    return;
  }

  static #getResources(priority: Priority): Promise<unknown> {
    const res = new Promise((resolve) => {
      this.#waitingQueue.push([resolve, priority]);
    });

    this.#processWaitingQueue();
    return res;
  }

  static #releaseResources(priority: Priority) {
    this.#activeQueue[priority]--;
    this.#processWaitingQueue();
  }

  static #processWaitingQueue() {
    let activeExecTime = 0;
    for (const key of Object.keys(priorityMap)) {
      activeExecTime +=
        priorityMap[<Priority>key].maxExecTime *
        (this.#activeQueue[<Priority>key] || 0);
    }

    if (activeExecTime < this.maxExecTime && this.#waitingQueue.length > 0) {
      const idx = Math.floor(Math.random() * this.#waitingQueue.length);
      const [[resolve, key]] = this.#waitingQueue.splice(idx, 1);

      this.#activeQueue[key]++;
      resolve();
    }
  }

  static async *#getAsyncIterator<T>(
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

    await this.#getResources(priority);
    // Start track execution time
    let start = Date.now();

    while (!res.done) {
      res = iter.next();
      cb(res.value, i, stop);
      i++;
      if (Date.now() - start > options.maxExecTime) {
        this.#releaseResources(priority);
        yield new Promise((resolve) => {
          setTimeout(() => resolve(0), options.minSleepTime);
        });

        await this.#getResources(priority);
        start = Date.now();
      }
    }
    this.#releaseResources(priority);
  }
}

export default IterableManager;
