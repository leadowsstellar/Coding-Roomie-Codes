// write code here
const a = 10.5;
console.log(`Type of a: ${typeof a}`);
console.log(`a type check using proto: ${a.__proto__ === Number.prototype}`);
const b = true;
console.log(`Type of b: ${typeof b}`);
console.log(`b type check using proto:${b.__proto__ === Boolean.prototype}`);
const c = "hello";
console.log(`Type of c: ${typeof c}`);
console.log(`c type check using proto: ${c.__proto__ === String.prototype}`);
const d = {};
console.log(`Type of d: ${typeof d}`);
console.log(`d type check using proto: ${d.__proto__ === Object.prototype}`);
const e = [];
console.log(`Type of e: ${typeof e}`);
console.log(`Array.isArray(e): ${Array.isArray(e)}`);
console.log(`e type check using proto: ${e.__proto__ === Array.prototype}`);
const f = function () { };
console.log(`Type of f: ${typeof f}`);
console.log(`f type check using proto: ${f.__proto__ === Function.prototype}`); 