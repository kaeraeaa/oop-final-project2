import CharacterService from "./api/CharacterService.js";
import CharacterCatalog from "./catalog/CharacterCatalog.js";
import GameState from "./game/GameState.js";
import Character from "./game/Character.js";
import BattleSystem from "./game/BattleSystem.js";

async function main() {
    console.log("Fetching character catalog...");

    // Use the Genshin API
    const api = new CharacterService("https://genshin.jmp.blue");
    const catalog = new CharacterCatalog(api);

    const list = await catalog.getCatalog();
    console.log("Loaded:", list.map(l => l.name));

    // --- GAME ---
    const hero = new Character("Hero", 100, 20);
    const monster = new Character("Slime", 60, 10);

    const game = new GameState({ player: hero, enemy: monster });
    const battle = new BattleSystem(hero, monster);

    while (!battle.isBattleFinished()) {
        battle.stepTurn();
        game.addAction(
            `${hero.name} HP: ${hero.hp}, ${monster.name} HP: ${monster.hp}`
        );
    }

    console.log("Battle ended.");
    console.log("History:", game.history);

    game.save();
    console.log("Game saved to save.json");
}

main();


