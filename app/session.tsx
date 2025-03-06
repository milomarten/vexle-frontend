import { makeGuess } from "./backend";
import { FlagRequest, FlagResponse } from "./models";

const SELECTIONS_KEY = "SELECTIONS";

const flagleSession = {
    hasPreviousSelections,
    getSelections,
    clearSelections,
    saveSelections
};

export default flagleSession;

function hasPreviousSelections(): boolean {
    const session = sessionStorage.getItem(SELECTIONS_KEY);
    if (session) {
        const rawJson = JSON.parse(session);
        return isValidFlagRequest(rawJson);
    }
    return false;
}

async function getSelections(): Promise<FlagResponse | undefined> {
    const session = sessionStorage.getItem(SELECTIONS_KEY);
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

function isValidFlagRequest(obj: unknown): boolean {
    const lookup = Object(obj);
    return 'guesses' in lookup && 'date' in lookup && 'hardCodedAnswer' in lookup
}