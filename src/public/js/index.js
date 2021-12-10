import '../css/index.scss';
import iconSVG from '../assets/pic/icons8-share.svg';
console.log('index.js');

window.addEventListener('DOMContentLoaded', () => console.log('ready'));
window.addEventListener('load', (event) => console.log('load'));

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

promise1.then(
  (result) => console.log(`Fulfilled: ${result}`),
  (error) => console.log(`Rejected: ${error}`),
);

const o1 = { a: 1 };
const o2 = {};
const foo = Symbol('foo');
o2[foo] = Date.now();
Object.getOwnPropertySymbols(o2);
const obj = { ...o1, ...o2 };
// const obj = Object.assign({}, o1, o2);
console.log('obj[foo]', obj[foo]);

const iconEl = document.createElement('div');
iconEl.innerHTML = `<img src="${iconSVG}" alt="Share icon" />`;
document.body.appendChild(iconEl);
