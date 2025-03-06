"use client"; // This is a client component 👈🏽

import { useEffect, useRef, useState } from "react";
import { FlagDefinition } from "./models";
import Confetti from 'react-confetti'
import { ChargeHelpButton, ColorHelpButton, HelpButton, PatternHelpButton } from "./help-button";
import { getFlags } from "./backend";
import { Flagle } from "./guess";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [flags, setFlags] = useState<FlagDefinition[]>([]);
  const [chosenFlag, setChosenFlag] = useState("XX");
  const [showConfetti, setShowConfetti] = useState(false);

  const dateOfStart = useRef(new Date().toISOString().split("T")[0]);

  const generateFlag = function(source: FlagDefinition[]) {
    const randomIdx = Math.floor(Math.random() * source.length);
    setChosenFlag(source[randomIdx].code);
  }

  useEffect(() => {
    getFlags()
      .then(data => {
        setFlags(data);
        generateFlag(data);
      })
      .catch(() => {
        toast.error("Error loading flags! Try again later.", {})
      })
  }, []); //Run once and only once!

  const reset = function() {
    generateFlag(flags);
    setShowConfetti(false);
  }

  const onWin = function() {
    setShowConfetti(true);
  }

  return (
    <div id="main" className="font-[family-name:var(--font-geist-sans)] ml-4 mr-4">
      { showConfetti ? <Confetti /> : <></> }
      <Toaster position="bottom-left"/>
      <main className="grid grid-rows-auto items-center justify-items-center mb-6">
        <h1 className="text-[64px]">Vexle</h1>
        <span>Yet another Flag Guessing game</span>
        <div className="flex gap-2">
            <HelpButton />
            <ColorHelpButton />
            <PatternHelpButton />
            <ChargeHelpButton />
        </div>
      </main>
  
      <Flagle 
        flags={flags}
        today={dateOfStart.current}
        answer={chosenFlag}
        onReset={reset}
        onWin={onWin}
      />
    </div>
  );
}