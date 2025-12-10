import fs from "fs";

// Game state with history and save/load
export default class GameState {
    constructor({ player, enemy, history, turn } = {}) {
        this.player = player || null;
        this.enemy = enemy || null;
        this.history = history || [];
        this.turn = turn || 0;
    }

    addAction(action) {
        this.history.push(action);
    }

    save(filename = "save.json") {
        fs.writeFileSync(filename, JSON.stringify(this, null, 2));
    }

    load(filename = "save.json") {
        const data = fs.readFileSync(filename);
        const obj = JSON.parse(data);
        this.player = obj.player;
        this.enemy = obj.enemy;
        this.history = obj.history;
        this.turn = obj.turn;
    }
}
