import { ColorDot, IconDot } from "./iconography";
import { FlagCharges, FlagColor, FlagPattern, GameStatus, IndividualGuessResult } from "./models"

export type FlagLineParams = {
    number: number,
    result: IndividualGuessResult,
    type?: GameStatus
};
export function FlagLine({ number, result, type }: FlagLineParams) {
    const colors = Object.entries(result.colors)
        .map(item => {
            return <ColorDot key={item[0]} color={item[0] as FlagColor} present={item[1] ? "PRESENT" : "ABSENT"} />
        });
    const patterns = Object.entries(result.patterns)
        .map(item => {
            const key = item[0];
            const value = item[1];
            return <IconDot key={key} type="pattern" value={key as FlagPattern} count={value} />;
        });
    const charges = Object.entries(result.charges)
        .flatMap(item => {
            const key = item[0];
            const value = item[1];
            return <IconDot key={key} type="charge" value={key as FlagCharges} count={value} />;
        });

    const className = `rounded-md px-4 py-2 text-sm font-semibold opacity-100 ${type ? 'fuchsia answer' : 'midground-pane guess'}`
    return <div className={className}>
        <span className="mr-2">{getVerbiage(type, number)}</span>
        { result.emoji } { result.name }
        <div className="flex flex-col gap-1">
            <div className = "flex flex-wrap gap-1">{ colors }</div>
            <div className = "flex flex-wrap gap-1">{ patterns }{ charges }</div>
        </div>
      </div>
}

function getVerbiage(status: GameStatus | undefined, guessNum: number) {
    if (status == "WON") {
        return "Good Job! The answer was";
    } else if (status == "LOST") {
        return "Bad Luck... The answer was";
    } else {
        return `Guess ${guessNum} >`;
    }
}