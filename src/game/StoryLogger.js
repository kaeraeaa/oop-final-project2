export default class StoryLogger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        this.logs.push(message);
        console.log(message);
    }

    getHistory() {
        return this.logs;
    }
}
