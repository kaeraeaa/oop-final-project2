Design Document — Genshin Character Catalog & Text-Based Game
1. Project Overview

Project Name: Genshin Character Catalog & Text Game
Purpose:
Development of a console/web application that allows:
Fetching and storing information about Genshin Impact characters in JSON format from the API https://genshin.jmp.blue/.
Displaying a character catalog (name, title, vision, nation, rarity, description).
Running a text-based turn-based game with character interactions, logging the battle history, and saving the game state.
Technologies: Node.js, ES Modules, fetch API, local storage in save.json.

2. Architecture
2.1 Directory Structure
oop-final-project2/
│
├─ src/
│  ├─ api/
│  │   └─ CharacterService.js       # Fetch characters from API
│  │
│  ├─ catalog/
│  │   └─ CharacterCatalog.js       # Process raw API data
│  │
│  ├─ game/
│  │   ├─ Character.js              # Character class
│  │   ├─ BattleSystem.js           # Battle mechanics
│  │   └─ GameState.js              # Track game state & history
│  │
│  ├─ storage/
│  │   └─ SaveManager.js            # Save/load game state
│  │
│  └─ index.js                      # Entry point
│
├─ package.json
└─ README.md

3. Components
3.1 CharacterService

Responsible for fetching data from the API:
fetchAllCharacters() — returns a list of characters in JSON format.
Supports both API and local JSON files for testing.

3.2 CharacterCatalog

Processes the data from CharacterService.
Creates objects to be used in UI or game logic:

{
  "name": "Albedo",
  "title": "Kreideprinz",
  "vision": "Geo",
  "nation": "Mondstadt",
  "rarity": 5,
  "description": "A genius alchemist..."
}

3.3 GameState

Stores the current game state:
player — main character (Hero).
enemy — opponent (Slime or other NPC).
history — array of strings storing the battle turns.
turn — current turn number.
Methods:
save(filename) — saves the game state to a JSON file.
load(filename) — loads the game state from a JSON file.

3.4 Character

Character class:

class Character {
    constructor(name, hp, attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }
    isAlive() { return this.hp > 0; }
    takeDamage(amount) { this.hp = Math.max(this.hp - amount, 0); }
}

3.5 BattleSystem

Turn-based battle system:
Hero attacks enemy: enemy.takeDamage(player.attack)
If enemy is alive, it counterattacks: player.takeDamage(enemy.attack)
Each step is recorded in GameState.history.
Method isBattleFinished() checks if any character is dead.

Battle Mathematics:
Damage calculation: simple direct damage:

Enemy HP -= Player Attack
Player HP -= Enemy Attack

Turn logic: sequential turns, the player starts first.
Critical hits, defense, elements can be added as future improvements.

4. Game Flow

Fetch characters → CharacterCatalog is created.
Select characters for the game or use default hero/enemy.
Battle loop: while !battle.isBattleFinished():
Hero attacks
Enemy attacks
Battle history is recorded
End of battle: log results in GameState.history.
Save game: GameState.save("save.json").

5. Data Examples

API Response (raw):
["albedo", "amber", "kaeya", "diluc", ...]


Parsed Character Object:

{
  "name": "Albedo",
  "title": "Kreideprinz",
  "vision": "Geo",
  "nation": "Mondstadt",
  "rarity": 5,
  "description": "Chief alchemist of Mondstadt."
}


GameState Example:

{
  "player": { "name": "Hero", "hp": 40, "attack": 20 },
  "enemy": { "name": "Slime", "hp": 0, "attack": 10 },
  "turn": 3,
  "history": [
    "Hero HP: 90, Slime HP: 40",
    "Hero HP: 80, Slime HP: 20",
    "Hero HP: 80, Slime HP: 0"
  ]
}

6. Notes & Future Improvements
Full character details (vision, nation, rarity, description) can be displayed.
Different attacks, elemental effects, critical hits, and defense mechanics can be implemented.
Web-based UI using React can be added.
Multiple save states and character selections can be implemented for more advanced gameplay.