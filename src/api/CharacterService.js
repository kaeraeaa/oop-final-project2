// Service to fetch characters from API
export default class CharacterService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchAllCharacters() {
        if (!this.apiUrl) {
            throw new Error("API URL is not provided!");
        }

        const res = await fetch(`${this.apiUrl}/characters`);
        if (!res.ok) throw new Error("Failed to fetch characters");

        return await res.json(); // Returns array of names (strings)
    }
}
