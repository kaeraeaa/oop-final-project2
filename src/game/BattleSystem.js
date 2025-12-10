// Battle system for turn-based game
export default class BattleSystem {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.finished = false;
        this.turnCount = 0;
    }

    stepTurn() {
        if (this.finished) return;

        // Player attacks enemy
        const playerDamage = this.player.attack;
        this.enemy.hp -= playerDamage;
        console.log(`${this.player.name} hits ${this.enemy.name} for ${playerDamage} dmg`);

        // Enemy attacks player if still alive
        if (this.enemy.hp > 0) {
            const enemyDamage = this.enemy.attack;
            this.player.hp -= enemyDamage;
            console.log(`${this.enemy.name} hits ${this.player.name} for ${enemyDamage} dmg`);
        }

        this.turnCount++;

        // Check if battle finished
        if (this.player.hp <= 0 || this.enemy.hp <= 0) {
            this.finished = true;
        }
    }

    isBattleFinished() {
        return this.finished;
    }
}


