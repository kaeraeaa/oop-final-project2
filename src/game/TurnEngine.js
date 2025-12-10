export default class TurnEngine {
    constructor(battle) {
        this.battle = battle;
    }

    executeTurn() {
        if (this.battle.isBattleOver()) return;

        this.battle.playerAttack();

        if (!this.battle.isBattleOver()) {
            this.battle.enemyAttack();
        }
    }
}
