import IterateManager from './green_threads/index.js';

const forEach = IterateManager.forEach.bind(IterateManager);

export { forEach };
