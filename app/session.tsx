import { makeGuess } from "./backend";
import { FlagRequest, FlagResponse } from "./models";

const SELECTIONS_KEY = "SELECTIONS";

export default {
    hasPreviousSelections,
    getSelections,
    clearSelections,
    saveSelections
};

function hasPreviousSelections(): boolean {
    var session = sessionStorage.getItem(SELECTIONS_KEY);
    if (session) {
        const rawJson = JSON.parse(session);
        return isValidFlagRequest(rawJson);
    }
    return false;
}

async function getSelections(): Promise<FlagResponse | undefined> {
    var session = sessionStorage.getItem(SELECTIONS_KEY);
    if (session) {
        const rawJson = JSON.parse(session);
        if (isValidFlagRequest(rawJson)) {
            try {
                return makeGuess(rawJson as FlagRequest)
            } catch { 
                // Eat any error here, we'll just start fresh.
            }
        }
    }
}

function clearSelections() {
    sessionStorage.removeItem(SELECTIONS_KEY);
}

function saveSelections(selections: FlagRequest) {
    sessionStorage.setItem(SELECTIONS_KEY, JSON.stringify(selections));
}

function isValidFlagRequest(obj: any): boolean {
    return 'guesses' in obj && 'date' in obj && 'hardCodedAnswer' in obj
}