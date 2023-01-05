// write code here
class Timeout {
    constructor() {
        this.data = 10;
    }
    start() {
        setTimeout(() => {
            console.log(this.data);
        });
    }
}

const t1 = new Timeout();
t1.start();