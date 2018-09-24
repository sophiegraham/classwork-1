/* eslint no-console: off */

// original:
// console.log('hello ' + process.argv[2]);

// break down into "jobs":

// #1 process arguments
// get the name to greet
const name = process.argv[2];

// #2 format greeting
const greeting = 'hello ' + name;

// #3 Display greeting on CLI
console.log(greeting);
