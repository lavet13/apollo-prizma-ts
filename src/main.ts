import 'dotenv/config';

console.log('text');

const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = response.json();
console.log({ data });

type Something = {
  name: string;
};

let something: Something = {
  name: '123',
};

console.log({ something });
