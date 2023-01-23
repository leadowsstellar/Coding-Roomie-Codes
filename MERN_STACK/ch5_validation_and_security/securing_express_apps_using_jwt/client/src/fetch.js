// Write some Code here

const fetch = ({ url, method, data, jwt }) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        jwt && xhr.setRequestHeader("Authorization", "Bearer" + jwt);
        method.toLowerCase() === "post" && xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            const json = xhr.responseText;
            const data = JSON.parse(json);
            resolve(data);
        };
        xhr.onerror = () => {
            reject("Could not reach the server!");
        };
        method.toLowerCase() === "post" ? xhr.send(JSON.stringify(data)) : xhr.send();
    });
};

export default fetch;