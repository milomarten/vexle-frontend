"use client"; // This is a client component 👈🏽

import { useEffect, useRef, useState } from "react";
import { DEFAULT_FLAG_RESPONSE, ERROR_FLAG_DEFINITION, FlagDefinition, FlagResponse, GameStatus, IndividualGuessResult } from "./models";
import Confetti from 'react-confetti'
import { ColorHelpButton, HelpButton } from "./help-button";
import { getFlags, makeGuess } from "./backend";
import { Button } from "@material-tailwind/react";
import { FlagLine } from "./guess";

function sortBy<T, U>(func: (arg0: T) => U): (arg0: T, arg1: T) => number {
  return (arg0: T, arg1: T) => {
    const a = func(arg0);
    const b = func(arg1);
    if (a < b) { return -1; }
    else if (a > b) { return 1; }
    else { return 0; }
  }
}

export default function Home() {
  const [flags, setFlags] = useState<FlagDefinition[]>([]);
  const [results, setResults] = useState<FlagResponse>(DEFAULT_FLAG_RESPONSE);
  const [pending, setPending] = useState(false);

  const chosenFlag = useRef("XX");
  const dateOfStart = useRef(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    setPending(true);
    getFlags()
      .then(data => {
        setFlags(data);

        const randomIdx = Math.floor(Math.random() * data.length);
        chosenFlag.current = data[randomIdx].code;
      })
      .catch(() => {
        setFlags([ERROR_FLAG_DEFINITION])
      })
      .finally(() => {
        setPending(false);
      })
  }, []); //Run once and only once!

  const guess = function(code: string) {
    setPending(true);
    makeGuess({
      hardCodedAnswer: chosenFlag.current,
      date: dateOfStart.current,
      guesses: [...results.individualFlagResults.map(i => i.code), code]
    })
    .then(results => {
      if (results.status == "WON") {
        results.individualFlagResults.pop()
      }
      setResults(results);
    })
    .finally(() => {
      setPending(false);
    })
  }

  const reset = function() {
    const randomIdx = Math.floor(Math.random() * flags.length);
    chosenFlag.current = flags[randomIdx].code;
    setResults(DEFAULT_FLAG_RESPONSE);
  }

  const flagLoading = flags.length ?
    <FlagPicker
      flags={flags}
      disabled={pending}
      gameStatus={results.status}
      guessedFlags={results.individualFlagResults}
      onGuess={guess}
      onReset={reset}
    /> :
    <div>Loading...</div>

  const confetti = results.status == "WON" ? <Confetti /> : <></>;
  const answerPane = results.answer ?
    <div className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 bg-fuchsia-800 guess">
        {results.status == "LOST" ? "Bad luck!" : "Good Job!"} The answer was {results.answer.emoji} {results.answer.name}
    </div> :
    <></>;

  return (
    <div id="main" className="font-[family-name:var(--font-geist-sans)] ml-4 mr-4">
      { confetti }
      <main className="grid grid-rows-auto items-center justify-items-center mb-6">
        <h1 className="text-[64px]">Vexle</h1>
        <span>Yet another Flag Guessing game</span>
        <div className="flex gap-2">
            <HelpButton />
            <ColorHelpButton />
        </div>
      </main>
  
      <div className="grid grid-cols-1 gap-4">
        { flagLoading }
        <FlagList guessedFlags={results.individualFlagResults}/>
        { answerPane }
      </div>
    </div>
  );
}

type FlagPickerProps = {
  flags: FlagDefinition[],
  disabled: boolean,
  guessedFlags: IndividualGuessResult[],
  gameStatus: GameStatus,
  onGuess: (arg0: string) => void
  onReset: () => void
}
function FlagPicker({ flags, disabled, guessedFlags, gameStatus, onGuess, onReset } : FlagPickerProps) {
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
        loading={flags.length == 0 || flags[0].code == "XX" || disabled || guessedFlags.some(guess => guess.code == choice)}>
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
        disabled={flags.length == 0 || flags[0].code == "XX" || disabled}
        value={choice}
        onChange={e => setChoice(e.target.value)}
        >
          { countriesList }
      </select>
      { flagButton }
    </div>
  )
}

type FlagListProps = {
  guessedFlags: IndividualGuessResult[]
}
function FlagList ( {guessedFlags} : FlagListProps) {
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