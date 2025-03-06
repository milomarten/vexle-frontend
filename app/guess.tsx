import { useState } from "react";
import { ColorDot, IconDot } from "./iconography";
import { DEFAULT_FLAG_RESPONSE, FlagCharges, FlagColor, FlagDefinition, FlagPattern, FlagRequest, FlagResponse, GameStatus, IndividualGuessResult } from "./models"
import { Button } from "@material-tailwind/react";
import { makeGuess } from "./backend";
import toast from "react-hot-toast";
import flagleSession from "./session";

export type FlagLineParams = {
    number: number,
    result: IndividualGuessResult
};
export function FlagLine({ number, result }: FlagLineParams) {
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

    return <div className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 midground-pane guess">
        <span className="mr-2">{`Guess ${number} >`}</span>
        { result.emoji } { result.name }
        <div className="flex flex-col gap-1">
            <div className = "flex flex-wrap gap-1">{ colors }</div>
            <div className = "flex flex-wrap gap-1">{ patterns }{ charges }</div>
        </div>
      </div>
}

type FlagListProps = {
    guessedFlags: IndividualGuessResult[]
}
export function FlagList ( {guessedFlags} : FlagListProps) {
    const guessedCountriesList = guessedFlags
        .map((guess, index) => {
        return <FlagLine number={index + 1} result={guess} key={guess.code}/>
        });

    return (
        <div className="grid grid-cols-1 gap-2"> 
        { guessedCountriesList} 
        </div>
    )
}

type FlagAnswerProps = {
    result: FlagDefinition | undefined | null,
    status: GameStatus
}
export function FlagAnswerLine({result, status} : FlagAnswerProps) {
    if (!result || status == "PLAYING") {
        return <></>
    } else {
        return <div className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 fuchsia answer">
            <span className="mr-2">{status == "WON" ? "Good Job!" : "Bad Luck..."} The answer was</span>
            { result.emoji } { result.name }
        </div>
    }
}

function sortBy<T, U>(func: (arg0: T) => U): (arg0: T, arg1: T) => number {
    return (arg0: T, arg1: T) => {
        const a = func(arg0);
        const b = func(arg1);
        if (a < b) { return -1; }
        else if (a > b) { return 1; }
        else { return 0; }
    }
}

type FlagPickerProps = {
  flags: FlagDefinition[],
  pending: boolean,
  guessedFlags: IndividualGuessResult[],
  gameStatus: GameStatus,
  onGuess: (arg0: string) => void
  onReset: () => void
}
export function FlagPicker({ flags, pending, guessedFlags, gameStatus, onGuess, onReset } : FlagPickerProps) {
  const [choice, setChoice] = useState<string>(flags.length == 0 ? "XX" : flags[0].code);

  const countriesList = flags
    .sort(sortBy(a => a.name))
    .map(country => <option key={country.code} value={country.code} disabled={gameStatus != "PLAYING" || guessedFlags.some(guess => guess.code == country.code)}>
      {country.emoji} {country.name}
      </option>
    );
  
  const flagButton = gameStatus == "PLAYING" ? 
  <Button 
        color="light-green"  
        onClick={() => onGuess(choice)} 
        loading={pending || flags.length == 0}
        disabled={flags.length == 0 || flags[0].code == "XX" || guessedFlags.some(guess => guess.code == choice) || pending}>
      Guess
  </Button>
  :
  <Button 
    color="light-green" 
    onClick={() => onReset()}>
      Play Again!
  </Button>

  return (
    <div className="flex gap-2">
      <select 
        id="flags-to-guess" 
        className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 flex-auto" 
        disabled={flags.length == 0 || flags[0].code == "XX" || pending}
        value={choice}
        onChange={e => setChoice(e.target.value)}
        >
          { countriesList }
      </select>
      { flagButton }
    </div>
  )
}

export type FlagleParams = {
    flags: FlagDefinition[],
    today: string,
    answer?: string,
    onReset: () => void
    onWin?: () => void
};
export function Flagle({flags, today, answer, onReset, onWin}: FlagleParams) {
    const [results, setResults] = useState<FlagResponse>(DEFAULT_FLAG_RESPONSE);
    const [pending, setPending] = useState(false);

    // useEffect(() => {
    //     if (flagleSession.hasPreviousSelections()) {
    //         setPending(true);
    //         flagleSession.getSelections()
    //             .then(r =>{
    //                 if (r) { setResults(r); }
    //             })
    //             .finally(() => setPending(false));
    //     }
    // }, []) // Run just once at startup

    const guess = function(code: string) {
        setPending(true);
        const guess: FlagRequest = {
            hardCodedAnswer: answer,
            date: today,
            guesses: [...results.individualFlagResults.map(i => i.code), code]
          };

          flagleSession.saveSelections(guess);

        makeGuess(guess)
        .then(results => {
          if (results.status == "WON") {
            results.individualFlagResults.pop();
            if (onWin) { onWin(); }
          }
          setResults(results);
        })
        .catch(() => {
            toast.error("Unable to submit guess. Try again in a few moments.");
        })
        .finally(() => {
          setPending(false);
        })
    }

    const reset = function() {
        setResults(DEFAULT_FLAG_RESPONSE);
        flagleSession.clearSelections();
        onReset();
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <FlagPicker
                flags={flags}
                pending={pending}
                gameStatus={results.status}
                guessedFlags={results.individualFlagResults}
                onGuess={guess}
                onReset={reset}
            />
            <FlagList guessedFlags={results.individualFlagResults}/>
            <FlagAnswerLine result={results.answer} status={results.status}/>
        </div>
    );
}