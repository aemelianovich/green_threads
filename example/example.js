import { forEach } from '../dist/index.js';

const list = document.getElementById('threads');

function createItem(id, list) {
  const item = document.createElement('li');
  item.setAttribute('id', id);
  const itemText = `0: unknown #${id} - not started`;
  item.innerText = itemText;
  list.appendChild(item);
  return item;
}

const item1 = createItem(1, list);
const item2 = createItem(2, list);
const item3 = createItem(3, list);
const item4 = createItem(4, list);
const item5 = createItem(5, list);
const item6 = createItem(6, list);
const item7 = createItem(7, list);
const item8 = createItem(8, list);

const length = 50000;
const itemRegExp = /^([\d]+?)(:.+)( #.+?- )(.+)$/g;

function run(item, priority) {
  item.classList.add(`${priority}`);
  forEach(new Array(length), priority, (value, index, stop) => {
    const text = item.innerText;
    const newText = text.replace(itemRegExp, (match, p1, p2, p3, p4) => {
      return [index, `: ${priority}`, p3, 'active'].join('');
    });

    item.innerText = newText;
  }).then(() => {
    item.classList.add(`finished`);
    const text = item.innerText;
    const newText = text.replace(itemRegExp, (match, p1, p2, p3, p4) => {
      return [p1, p2, p3, 'finished'].join('');
    });
    item.innerText = newText;
  });
}

run(item1, 'critical');
run(item2, 'low');
run(item4, 'high');
run(item5, 'high');
run(item6, 'low');
run(item7, 'low');
run(item8, 'critical');

forEach(new Array(length), 'low', (value, index, stop) => {
  item3.classList.add(`low`);
  const text = item3.innerText;
  const newText = text.replace(itemRegExp, (match, p1, p2, p3) => {
    return [index, `: low`, p3, 'active'].join('');
  });
  item3.innerText = newText;

  if (index > 5000) {
    stop();
  }
}).then(() => {
  item3.classList.add(`finished`);
  const text = item3.innerText;
  const newText = text.replace(itemRegExp, (match, p1, p2, p3) => {
    return [p1, p2, p3, 'finished'].join('');
  });
  item3.innerText = newText;
});
