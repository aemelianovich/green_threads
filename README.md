# Green Threads

Green threads demo based on generators

## forEach

forEach method allows to iterate through huge Iterable structures without freezing input/output.
Different timeouts can be used based on priority parameter:

- low
- high
- critical

Callback function can accept value, index and stop function that allowed to stop iteration process.

```js
async function forEach<T>(
  iterable: Iterable<T>,
  priority: Priority,
  cb: (value: T, index: number, stop: () => void) => void,
): Promise<undefined>
```

```js
import forEach from './src';

let total = 0;
const length = 10000000;

forEach(new Array(length), 'low', () => {
  total++;
}).then(() => console.log('low1:', 'finished'));

forEach(new Array(length), 'low', () => {
  total++;
}).then(() => console.log('low2:', 'finished'));

forEach(new Array(length), 'low', (value, index, stop) => {
  total++;
}).then(() => console.log('low3:', 'finished'));

forEach(new Array(length), 'low', (value, index, stop) => {
  total++;
}).then(() => console.log('low4:', 'finished'));

forEach(new Array(length), 'critical', (value, index, stop) => {
  total++;
}).then(() => console.log('critical1:', 'finished'));

forEach(new Array(length), 'low', (value, index, stop) => {
  total++;
}).then(() => console.log('low6:', 'finished'));

forEach(new Array(length), 'high', (value, index, stop) => {
  total++;
}).then(() => console.log('high1:', 'finished'));

forEach(new Array(length), 'low', (value, index, stop) => {
  total++;
}).then(() => console.log('low8:', 'finished'));

forEach(new Array(length), 'critical', (value, index, stop) => {
  total++;
}).then(() => console.log('ctitical2:', 'finished'));

console.log('total:', total);
```
