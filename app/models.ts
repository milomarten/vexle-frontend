export const ERROR_FLAG_DEFINITION: FlagDefinition = {
    code: "XX",
    name: "Unable to Load",
    emoji: ""
}

export const DEFAULT_FLAG_RESPONSE: FlagResponse = {
    individualFlagResults: [],
    status: "PLAYING",
    // comparison: {},
    answer: undefined
}

export interface FlagDefinition {
    code: string,
    name: string,
    emoji: string
}

export interface FlagRequest {
    hardCodedAnswer?: string,
    date: string,
    guesses: string[]
}

export interface FlagResponse {
    individualFlagResults: IndividualGuessResult[],
    // comparison: any,
    status: GameStatus,
    answer: FlagDefinition | null | undefined;
}

export interface IndividualGuessResult {
    code: string,
    name: string,
    emoji: string,
    distance: number | undefined
    colors: Partial<Record<FlagColor, boolean>>,
    patterns: Partial<Record<FlagPattern, FlagComparisonResult>>,
    charges: Partial<Record<FlagCharges, FlagComparisonResult>>
}

export type GameStatus = "PLAYING" | "WON" | "LOST";

export type PresentAbsent = "PRESENT" | "ABSENT";
export type MultiPresentAbsent = "PRESENT_ALL" | "PRESENT_MORE" | "ABSENT";

export const FlagColorOptions = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "LIGHT_BLUE", "PURPLE", "PINK", "BLACK", "GRAY", "WHITE"] as const;
type FlagColorTuple = typeof FlagColorOptions;
export type FlagColor = FlagColorTuple[number];

export const FlagPatternOptions = ["FIELD",
                            "HORIZONTAL_STRIPE",
                            "VERTICAL_STRIPE",
                            "DIAGONAL_STRIPE",
                            "CROSS",
                            "DIAGONAL_CROSS",
                            "GRID",
                            "DIAGONAL_GRID",
                            "CANTON",
                            "BORDER",
                            "TRIANGLE",
                            "ORNAMENT",
                            "CIRCLE",
                            "DIAMOND",
                            "CHEVRON"] as const;
type FlagPatternTuple = typeof FlagPatternOptions;
export type FlagPattern = FlagPatternTuple[number];

export const FlagChargesOptions = ["STAR",
                            "SUN",
                            "MOON",
                            "PLANT",
                            "ANIMAL",
                            "EMBLEM",
                            "CROSS",
                            "TERRITORY",
                            "WEAPON",
                            "ANOTHER_FLAG",
                            "TEXT",
                            "HUMAN",
                            "BUILDING",
                            "HEADGEAR"] as const;
type FlagChargesTuple = typeof FlagChargesOptions;
export type FlagCharges = FlagChargesTuple[number];

export interface FlagComparisonResult {
    present: number,
    absent: number,
    allFound: boolean
}