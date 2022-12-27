import IterableManager from './green_threads/index.js';

const forEach = IterableManager.forEach.bind(IterableManager);

export { forEach };
