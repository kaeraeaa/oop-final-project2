import CharacterService from "../api/CharacterService.js";

export default class CharacterCatalog {
    constructor(apiService) {
        this.characterService = apiService;
    }

    async getCatalog() {
        const raw = await this.characterService.fetchAllCharacters();

        console.log("RAW API RESPONSE:", raw[0]);
        console.log("RAW API LENGTH:", raw.length);

        // Convert strings into objects for GUI / game
        return raw.map(name => ({
            name: name,
            title: "",
            vision: "",
            nation: "",
            rarity: "",
            description: ""
        }));
    }
}
