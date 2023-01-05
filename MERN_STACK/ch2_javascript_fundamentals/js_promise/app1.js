// write code here

const timeoutAsync = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(`Hello`);
        }, 5000);
    });
};

const caller = async function () {
    const data = await timeoutAsync();
    console.log(data);
};

caller();