// write code here
const multiplicationTable = function (number, callback) {
    for (let i = 1; i <= 10; ++i) {
        let result = number * i
        callback(number, i, result);
    }
};
multiplicationTable(5, function (number, i, result) {
    console.log(`${number} x ${i} = ${result}`);
});
multiplicationTable(6, function (number, i, result) {
    console.log(`${result} = ${number} * ${i}`);
});

setTimeout(function () {
    console.log(`Hello`);
}, 5000);