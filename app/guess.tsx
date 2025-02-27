import { ColorDot } from "./iconography";
import { FlagColor, IndividualGuessResult } from "./models"

export type FlagLineParams = {
    number: number,
    result: IndividualGuessResult
};
export function FlagLine({ number, result }: FlagLineParams) {
    const colors = Object.entries(result.colors)
        .map(item => {
            return <ColorDot key={item[0]} color={item[0] as FlagColor} present={item[1] ? "PRESENT" : "ABSENT"} />
        });

    return <div className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 midground-pane guess">
        <span className="mr-2">Guess {number} &gt;</span>
        { result.emoji } { result.name }
        <div className = "flex flex-wrap gap-1">{ colors }</div>
      </div>
}