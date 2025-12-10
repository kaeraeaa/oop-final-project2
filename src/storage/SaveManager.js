// SaveManager.js (Node.js)
import fs from "fs";

export default class SaveManager {
    constructor() {
        this.file = "./save.json";
    }

    save(state) {
        fs.writeFileSync(this.file, JSON.stringify(state, null, 2));
    }

    load() {
        if (!fs.existsSync(this.file)) return null;
        return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    }
}


