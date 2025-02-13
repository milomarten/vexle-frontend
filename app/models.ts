export interface FlagDefinition {
    code: string,
    name: string,
    emoji: string
}

export const ERROR_FLAG_DEFINITION: FlagDefinition = {
    code: "XX",
    name: "Unable to Load",
    emoji: ""
}

export const DEFAULT_FLAG_RESPONSE: FlagResponse = {
    individualFlagResults: [],
    status: "PLAYING",
    comparison: {
        colors: {},
        foundAllColors: false,
        patterns: {},
        foundAllPatterns: false,
        charges: {},
        foundAllCharges: false,
        foundAll: false
    }
}

export type GameStatus = "PLAYING" | "WON" | "LOST";

export interface FlagResponse {
    individualFlagResults: IndividualGuessResult[],
    comparison: FlagComparison,
    status: GameStatus
}

export interface IndividualGuessResult {
    code: string,
    name: string,
    emoji: string,
    distance: number | undefined
}

export interface FlagComparison {
    colors: Record<string, boolean>,
    foundAllColors: boolean,
    patterns: Record<string, FlagComparisonResult>,
    foundAllPatterns: boolean,
    charges: Record<string, FlagComparisonResult>,
    foundAllCharges: boolean,
    foundAll: boolean
}

export interface FlagComparisonResult {
    present: number,
    absent: number,
    foundAll: boolean
}