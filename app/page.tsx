"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";

interface FlagDefinition {
  code: string,
  name: string,
  emoji: string
}

const ERROR_FLAG_DEFINITION: FlagDefinition = {
  code: "XX",
  name: "Unable to Load",
  emoji: ""
}

interface IndividualGuessResult {
  code: string,
  distance: number
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

export default function Home() {
  const [flags, setFlags] = useState<FlagDefinition[]>([]);
  const [guessedFlags, setGuessedFlags] = useState<IndividualGuessResult[]>([]);
  const [chosenFlag, setChosenFlag] = useState<string>();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch("http://localhost:8080/vexle/flags")
      .then(res => res.json())
      .then(data => {
        setFlags(data);

        var randomIdx = Math.floor(Math.random() * data.length);
        setChosenFlag(data[randomIdx].code);
      })
      .catch(() => {
        setFlags([ERROR_FLAG_DEFINITION])
      })
      .finally(() => {
        setPending(false);
      })
  }, []); //Run once and only once!

  const guess = function(code: string) {
    // setPending(true);
    setGuessedFlags([...guessedFlags, {code, distance: 1000}])
  }
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-rows-auto items-center justify-items-center mb-6">
        <h1 className="text-[64px]">Vexle</h1>
        <span>Yet another Flag Guessing game</span>
      </main>
  
      <div className="grid grid-cols-2 gap-4">
        <div id="left_pane" className="grid grid-cols-1 gap-4">
          <FlagPicker flags={flags} disabled={pending} guessedFlags={guessedFlags} onGuess={guess}/>
          <FlagList flags={flags} guessedFlags={guessedFlags}/>
        </div>
        <div id="right_pane" className="bg-slate-800 rounded-md">
            
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 ml-4 mr-4">
        How to play: I will pick a random flag. Try to guess the flag I selected. Each time you guess, I will tell you which features
        of that flag are the same, or different, from the flag I selected.<br />Try to guess as quick as possible!
      </div>
    </div>
  );
}

type FlagPickerProps = {
  flags: FlagDefinition[],
  disabled: boolean,
  guessedFlags: IndividualGuessResult[],
  onGuess: (arg0: string) => void
}
function FlagPicker({ flags, disabled, guessedFlags, onGuess } : FlagPickerProps) {
  const [choice, setChoice] = useState<string>(flags.length == 0 ? "XX" : flags[0].code);

  const countriesList = flags
    .sort(sortBy(a => a.name))
    .map(country => <option key={country.code} value={country.code} disabled={guessedFlags.some(guess => guess.code == country.code)}>
      {country.emoji} {country.name}
      </option>
    );
  
  return (
    <div>
      <select 
        id="flags-to-guess" 
        className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 ml-6" 
        disabled={flags.length == 0 || flags[0].code == "XX" || disabled}
        value={choice}
        onChange={e => setChoice(e.target.value)}
        >
          { countriesList }
      </select>
      <button 
        className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold opacity-100 ml-6 disabled:bg-slate-500/80" 
        onClick={() => onGuess(choice)} 
        disabled={flags.length == 0 || flags[0].code == "XX" || disabled || guessedFlags.some(guess => guess.code == choice)}
        >
          Guess!
      </button>
    </div>
  )
}

type FlagListProps = {
  flags: FlagDefinition[]
  guessedFlags: IndividualGuessResult[]
}
function FlagList ( {flags, guessedFlags} : FlagListProps) {
  const guessedCountriesList = guessedFlags
    .map(guess => { 
      return {
        result: guess, 
        flag: flags.find(flag => guess.code == flag.code) 
      }
    })
    .filter(({flag}) => !!flag)
    .map(({result, flag}, index) => <div className="rounded-md px-4 py-2 text-sm font-semibold opacity-100 ml-6 bg-slate-800 guess" key={flag!.code}>
      <span className="mr-4">Guess {index + 1} &gt;</span>
      { flag!.emoji } { flag!.name }
      <span className="float-right">{ result.distance } miles</span>
    </div>);

  return (
    <div className="grid grid-cols-1 gap-2"> 
      { guessedCountriesList} 
    </div>
  )
}