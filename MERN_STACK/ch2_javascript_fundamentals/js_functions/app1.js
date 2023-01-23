// write code here

const f1 = function () {
    console.log('f1');
};

f1();

const sum = function (x, y) {
    return x + y;
};

const sumResult = sum(10.5, 20.2);

console.log(`${sumResult}`);

const sumAll = function () {
    let sum = 0;
    for (let item of arguments) {
        sum += item;
    }
    return sum;
};

const sumAllResult = sumAll(10, 20, 30, 40, 50);

console.log(`${sumAllResult}`);

console.log(`sumAll type check: ${sumAll.__proto__ === Function.prototype}`);