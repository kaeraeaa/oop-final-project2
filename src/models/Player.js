import Character from "../game/Character.js";

export default class Player extends Character {
    constructor(data) {
        super(data);
        this.inventory = [];
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }
}
