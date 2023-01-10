// Write some Code here

const fetch = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => {
            const json = xhr.responseText;
            const data = JSON.parse(json);
            resolve(data);
        };
        xhr.onerror = () => {
            reject("Could not reach the server!");
        };
        xhr.send();
    });
};

export default fetch;