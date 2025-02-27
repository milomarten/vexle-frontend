import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { FlagColorOptions } from "./models";
import { ColorDot } from "./iconography";

export function HelpButton() {
    const [isOpen, setOpen] = useState(false);

    return <div>
    <Button color="light-green" onClick={() => setOpen(true)}>How to Play</Button>
    <Dialog open={isOpen} handler={() => setOpen(false)} size="md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody>
            <p className="p-2">
                Hi! Welcome to Vexle. The object of the game is simple: I will pick a random world flag, and
                you will try to guess it. For every guess, I will tell you what parts of the flag you guessed are
                on my flag, and which aren&apos;t. I will give information on three categories: color, patterns, and charges.
            </p>
            <p className="p-2">
                I will give information on three categories: color, patterns, and charges. After each guess, I&apos;ll show you all the
                features of that flag, and mark if that feature is present, or not present, in the flag. You can then use that
                clue for your next guess!
            </p>
            <p className="p-2">
                If you&apos;re unfamiliar with some of the terms on this site, check out the Color List!
            </p>
        </DialogBody>
    </Dialog>
    </div>
}

export function ColorHelpButton() {
    const [isOpen, setOpen] = useState(false);

    const colorList = FlagColorOptions
        .map(color => <ColorDot key={color + "-normal"} color={color}/>);
    
    const colorListBad = FlagColorOptions
        .map(color => <ColorDot key={color + "-absent"} color={color} present="ABSENT"/>);

    return <>
        <Button color="light-green" onClick={() => setOpen(true)}>Color List</Button>
        <Dialog open={isOpen} handler={() => setOpen(false)} size="md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody>
            <div className="p-2">
                Flags have been divided into 11 colors. 
            </div>
            <div className="p-2">
                This is what the badges look like if the color is present:
                <div className="flex flex-wrap gap-2">{colorList}</div>
            </div>
            <div className="p-2">
                This is what the badges look like if the color is NOT present:
                <div className="flex flex-wrap gap-2">{colorListBad}</div>
            </div>
        </DialogBody>
    </Dialog>
    </>;
}